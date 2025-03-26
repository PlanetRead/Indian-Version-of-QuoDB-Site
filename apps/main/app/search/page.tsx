import React from "react";
import Header from "../../components/Header";
import QuoteCard from "../../components/QuoteCard";

const SearchPage = () => {
    return (
        <div className="relative flex w-full items-center min-h-screen flex-col pt-[80px] overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <Header />
            <QuoteCard />
        </div>
    );
};

export default SearchPage;
