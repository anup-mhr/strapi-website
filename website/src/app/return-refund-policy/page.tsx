import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchReturnRefundPage } from "@/lib/strapiApiCall";

export const metadata = {
  title: "Heirloom Naga - Return & Refund Policy",
  description:
    "Read Heirloom Naga's return and refund policy for handcrafted Naga products. Learn how to return items, request refunds, and ensure a smooth and hassle-free process.",
  keywords:
    "Heirloom Naga, return policy, refund policy, Naga crafts, handmade products, returns, refunds, customer support",
};

async function page() {
  const data = await fetchReturnRefundPage();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="padding py-8 sm:py-10 md:py-12">
        <Heading
          title="RETURNS & REFUNDS"
          subtitle="Our return and refund policy"
        />

        <div
          className="w-full mx-auto max-w-5xl **:font-inherit!
              [&_ul]:list-disc 
              [&_ol]:list-decimal 
              [&_li]:mb-2 [&_li]:text-gray-700

              [&_p]:text-gray-700

              [&_strong]:font-semibold
              [&_em]:italic

              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4

              **:font-inherit!
            "
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>

      <Footer />
    </div>
  );
}

export default page;
