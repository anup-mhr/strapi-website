import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { loadLinks } from "@/lib/helper";
import { fetchPaymentModes } from "@/lib/strapiApiCall";

export const metadata = {
  title: "Aku Zeliang - Payment Modes",
  description: "Accepted Payment Modes for Aku Zeliang",
};

async function page() {
  const links = await loadLinks();
  const paymentModes = await fetchPaymentModes();
  return (
    <div className="bg-white text-black font-dosis tracking-wider">
      <Navigation links={links} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 custom-md:px-16 custom-lg:px-32 xl:px-44 py-20 md:py-40 ">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Accepted Payment Modes
        </h1>

        <div
          className="mt-6 sm:mt-8 md:mt-10 tracking-wider **:font-inherit px-4 sm:px-0"
          dangerouslySetInnerHTML={{ __html: paymentModes }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default page;
