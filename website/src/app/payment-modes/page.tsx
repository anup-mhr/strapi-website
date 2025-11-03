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
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Payment Modes
        </h1>

        <div
          className="mt-6 sm:mt-8 md:mt-10 tracking-wider **:font-inherit px-4 sm:px-0
           ck-content
                    [&_p]:mb-4
                    [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-5
                    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4
                    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3

                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                    [&_li]:mb-1

                    [&_strong]:font-semibold
                    [&_em]:italic

                    [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4

                    [&_section]:mt-6 [&_section]:mb-6 "
          dangerouslySetInnerHTML={{ __html: paymentModes }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default page;
