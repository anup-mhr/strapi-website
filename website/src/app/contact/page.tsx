import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import React from "react";
import { contactPageLinks } from "@/constants/constants";

export const metadata = {
  title: "Aku Zeliang - Contact",
  description:
    "Creative portfolio showcasing design work across multiple disciplines",
};

function page() {
  return (
    <div>
      <Navigation links={contactPageLinks} />
      <div>page</div>
      <Footer />
    </div>
  );
}

export default page;
