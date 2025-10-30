import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchShippingPage } from "@/lib/strapiApiCall";

async function page() {
  const data = await fetchShippingPage();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="padding py-8 sm:py-10 md:py-12">
        <Heading title="SHIPPING" subtitle="Our shipping policy" />
        <div className="mx-auto w-full max-w-5xl">
          {
            data && (
              <div
                dangerouslySetInnerHTML={{ __html: data }}
              />
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
