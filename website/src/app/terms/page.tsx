import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { loadLinks } from "@/lib/helper";
import { fetchPaymentModes } from "@/lib/strapiApiCall";

export const metadata = {
  title: "Aku Zeliang - Terms & Conditions",
  description:
    "Terms and Conditions for Aku Zeliang. By using our services, you agree to these terms and conditions.",
};

async function page() {
  const links = await loadLinks();
  const termsData = await fetchPaymentModes();
  return (
    <div className="bg-white text-black font-dosis tracking-wider">
      <Navigation links={links} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 custom-md:px-16 custom-lg:px-32 xl:px-44 py-20 md:py-40 ">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Terms of Service
        </h1>

        <div
          className="**:font-inherit!"
          dangerouslySetInnerHTML={{ __html: termsData }}
        />
      </div>

      <Footer />
    </div>
  );
}

export default page;
