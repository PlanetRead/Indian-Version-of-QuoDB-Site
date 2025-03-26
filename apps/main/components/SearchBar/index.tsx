"use client";

import React from "react";
import { Input } from "@ui/components/ui/input";

export default function SearchBar({ query, setQuery, onSubmit }: any) {
  return (
    <form onSubmit={onSubmit} className="bg-white mx-auto w-4/5 flex rounded-full shadow-lg p-2 mb-5">
      <Input
        className="font-bold rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
        <svg
          className="w-6 h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </form>

  );
}
