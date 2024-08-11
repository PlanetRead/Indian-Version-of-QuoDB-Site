import React from "react";
import TranslateClient from "./translateClient";
import Header from "../../components/Header";
import { GridPattern } from "@ui/components/grid"
const page = () => {
  return (
    <div className="relative flex w-full items-center min-h-screen flex-col justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Header />
      <TranslateClient />
    </div>
  );
};

export default page;
