import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchShippingPage } from "@/lib/strapiApiCall";

export const metadata = {
  title: "Heirloom Naga - Shipping Policy",
  description:
    "Learn about Heirloom Naga's shipping process, delivery timelines, and policies for handcrafted Naga products. Get your orders delivered safely and on time.",
  keywords:
    "Heirloom Naga, shipping policy, delivery, Naga crafts, handmade products, shipping information, order delivery",
};

async function page() {
  const data = await fetchShippingPage();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="padding py-8 sm:py-10 md:py-12">
        <Heading title="SHIPPING" subtitle="Our shipping policy" />

        <div
          className="mx-auto w-full max-w-5xl
              [&_ul]:list-disc 
              [&_ol]:list-decimal 
              [&_li]:mb-2 [&_li]:text-gray-700

              [&_p]:text-gray-700

              [&_strong]:font-semibold
              [&_em]:italic

              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4

              **:font-inherit!
              **:text-gray-700!
            "
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default page;
