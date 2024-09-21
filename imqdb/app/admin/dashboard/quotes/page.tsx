"use client";
import React, { useState, useEffect } from "react";
import PageContainer from "@/components/Layout";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { QuotesTable } from "@/components/Tables/QuotesTable";
import { columns } from "@/components/Tables/columns";
import { QuoteTable } from "@/components/Tables/Table";

export default function Dashboard() {
    const { data, error, isLoading } = useSWR('/api/quote', fetcher);


    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(20);

    const startIndex = (page - 1) * pageLimit;
    const currentData = data ? data.quotes.slice(startIndex, startIndex + pageLimit) : [];
    const totalQuotes = data ? data.totalQuotes : 0;
    const pageCount = Math.ceil(totalQuotes / pageLimit);


    const handlePageChange = (newPage: any) => {
        setPage(newPage);
    };

    const handlePageLimitChange = (newLimit: any) => {
        setPageLimit(newLimit);
        setPage(1); 
    };

    return (
        <PageContainer scrollable={true}>
            <div className="flex flex-col gap-5 h-screen">
                <Label className="text-4xl font-bold">All Quotes</Label>
                {!isLoading && data ? (
                    <QuoteTable rowData={data.quotes}/>
                ) : <>Loading...</>}
            </div>
        </PageContainer>
    );
}
