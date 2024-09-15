import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Status, Language } from "@prisma/client";
import { getSession } from "@/lib/auth";
import axios from "axios";
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const QUOTE_TRIGGER_URL = process.env.QUOTE_TRIGGER_URL || "http://localhost:8000/v1/quote/trigger-quotes-bulk";
const QUOTE_API_URL = process.env.QUOTE_API_URL || "http://localhost:8000/v1/quote/add-quotes-bulk";

interface QuoteRequest {
    movie: string;
    quote: string;
    year: string;
    timestamps: string;
    language: Language;
}

const BATCH_SIZE = 100;

export const POST = async (req: NextRequest) => {
    const session = await getSession();
    const data = await req.json() as QuoteRequest[];
    if (data.length === 0) {
        return new NextResponse(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400 });
    }

    const batches = Math.ceil(data.length / BATCH_SIZE);

    const quoteData: any = [];
    try {
        for (let i = 0; i < batches; i++) {
            const batchData = data.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);

            console.log("Batch", i + 1, "of", batches, "started");

            await prisma.$transaction(async (tx) => {
                for (const quote of batchData) {
                    const createdQuote = await tx.quotes.create({
                        data: {
                            movie: quote.movie,
                            quote: quote.quote,
                            year: quote.year,
                            timestamps: quote.timestamps,
                            language: quote.language,
                            status: Status.APPROVED,
                            userId: session?.user?.id,
                        },
                    });
                    quoteData.push({
                        quote_id: createdQuote.id,
                        quote: createdQuote.quote,
                    });
                }
            });

            console.log("Batch", i + 1, "posted successfully");
        }
        await axios.post(QUOTE_API_URL, quoteData);

        return new NextResponse(JSON.stringify({ success: true, data: null }), { status: 201 });
    } catch (error) {
        console.error("Error in POST transaction", error);
        return new NextResponse(JSON.stringify({ success: false, error: "Internal Server Error" }), { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {

    const totalQuotes = await prisma.quotes.count();
    const quotes = await prisma.quotes.findMany();

    return NextResponse.json({ quotes, totalQuotes }, { status: 200 });
}