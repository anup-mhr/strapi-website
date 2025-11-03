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
          className="w-full mx-auto min-h-[20vh] max-w-5xl
              [&_ul]:list-disc 
              [&_ol]:list-decimal 
              [&_li]:mb-2 [&_li]:text-gray-700

              [&_p]:text-gray-700

              [&_strong]:font-semibold
              [&_em]:italic

              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4

              **:font-inherit!"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default TermsPage;
