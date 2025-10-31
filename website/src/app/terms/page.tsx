import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchTermsPage } from "@/lib/strapiApiCall";

export const metadata = {
  title: "Heirloom Naga - Terms & Conditions",
  description:
    "Terms and Conditions for Heirloom Naga. Read our terms and conditions carefully before using our website.",
};

async function TermsPage() {
  const data = await fetchTermsPage();
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-8 sm:py-10 md:py-12 padding">
        <Heading title="TERMS" subtitle="Our terms & conditions" />

        <div
          className="w-full mx-auto min-h-[20vh] max-w-5xl"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default TermsPage;
