import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchReturnRefundPage } from "@/lib/strapiApiCall";

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
          className="w-full mx-auto max-w-5xl **:font-inherit!"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>

      <Footer />
    </div>
  );
}

export default page;
