"use client";
import { testFunc } from "@/lib/shopify";
import { useEffect } from "react";

const Page = () => {
  useEffect((): any => {
    const fetchData = async () => {
      const data = await testFunc();
      console.log("DATA", data);
      return <div>aaaaaaaa</div>;
    };
    fetchData();
  }, []);
  return <div>page</div>;
};

export default Page;
