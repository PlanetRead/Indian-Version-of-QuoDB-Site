"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function QuoteCard() {
  const params = useSearchParams()
  const quote = params.get("query")
  const [quotes, setQuotes] = useState<any>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchQuotes();
  }, [params, quote]);

  const fetchQuotes = async () => {
    setLoading(true);
    const req = await axios.post("http://localhost:3000/api/search", { quote: quote });
    setQuotes(req.data.data);
    setLoading(false);
  };

  if (quote?.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 lg:p-4 p-2 rounded-lg m-2 w-3/5">
      <div className="lg:text-2xl md:text-xl text-lg lg:p-3 p-1 font-black text-gray-700">
        Top Results for {quote}
      </div>
      {loading && <div>Loading...</div>}
      {quotes.map((quote: any) => (
        <div
          key={quote.id}
          className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg"
        >
          <div className="lg:flex md:flex items-center">
            <div className="h-12 w-12 mb-2 lg:mb-0 border md:mb-0 rounded-full mr-3"></div>
            <div className="flex flex-col">
              <div className="text-sm leading-3 text-gray-700 font-bold w-full">
                {quote.movie}
              </div>
              <div className="text-xs text-gray-600 w-full">{quote.quote}</div>
            </div>
          </div>
          <svg
            className="h-6 w-6 mr-1 invisible md:visible lg:visible xl:visible"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
