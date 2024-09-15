import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Status, Language } from "@prisma/client";
import { getSession } from "@/lib/auth";
import axios from "axios";

const QUOTE_API_URL = process.env.QUOTE_API_URL || "http://localhost:8000/v1/quote/add-quotes-bulk";

interface QuoteRequest {
    movie: string;
    quote: string;
    year: string;
    timestamp: string;
    language: Language;
}
export const POST = async (req: NextRequest) => {
    try {
        const session = await getSession();
        const data = await req.json() as QuoteRequest[];
        const reqData: any = [];
        if (data.length === 0) {
            return new NextResponse(JSON.stringify({ success: false, error: "Missing required fields" }), {
                status: 400,
            });
        }
        await prisma.$transaction(async (tx) => {
            for (const quote of data) {
                const createdQuote = await tx.quotes.create({
                    data: {
                        movie: quote.movie,
                        quote: quote.quote,
                        year: quote.year,
                        language: quote.language,
                        timestamps: quote.timestamp,
                        status: Status.APPROVED,
                        userId: session?.user?.id,
                    },
                });
                reqData.push({
                    quote_id: createdQuote.id,
                    quote: quote.quote
                });
            }
        });
        await axios.post(QUOTE_API_URL, reqData);
        return new NextResponse(JSON.stringify({ success: true }), { status: 201 });
    } catch (error: any) {
        console.error("Failed to post quote", error.message);
        return new NextResponse(JSON.stringify({ success: false, error: "Internal Server Error" }), {
            status: 500,
        });
    }
};