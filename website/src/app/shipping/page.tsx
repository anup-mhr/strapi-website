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
          className="mx-auto w-full max-w-5xl"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default page;
