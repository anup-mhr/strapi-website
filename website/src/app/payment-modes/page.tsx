import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { loadLinks } from "@/lib/helper";
import { fetchPaymentModes } from "@/lib/strapiApiCall";
import Image from "next/image";

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

        {/* <div
          className="**:font-inherit!"
          dangerouslySetInnerHTML={{ __html: paymentModes }}
        /> */}

        <div className="mt-6 sm:mt-8 md:mt-10 tracking-wider **:font-inherit px-4 sm:px-0">
          <p className="text-sm sm:text-base font-semibold uppercase mb-4 sm:mb-5">
            Payment Modes:
          </p>

          <p className="max-w-xl font-semibold text-xs sm:text-sm md:text-base mb-4 sm:mb-5 leading-relaxed">
            Kindly send transaction details to our team members or reach us for
            assistance at{" "}
            <a
              href="tel:+918787401050"
              className="text-primary-pink hover:underline whitespace-nowrap"
            >
              +91 8787401050
            </a>
          </p>

          <p className="uppercase mb-3 sm:mb-4 md:mb-5 font-semibold text-sm sm:text-base">
            1. UPI QR
          </p>
          <ul className="uppercase mb-4 sm:mb-5 space-y-2 text-xs sm:text-sm md:text-base">
            <li className="flex items-center gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 font-medium">UPI ID</p>
              <span className="inline">: </span>
              <span className="break-all">
                CANECONCEPT<span className="text-base sm:text-lg">@</span>SBI
              </span>
            </li>
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 font-medium">MERCHANT NAME</p>
              <span className="inline">: </span>
              <span className="wrap-break-word">
                CANE CONCEPTS PROP MARINA KHU
              </span>
            </li>
          </ul>

          <div className="mb-6 sm:mb-8">
            <Image
              src={"/akuzeliang-upi-qr.webp"}
              alt="UPI QR Code for payment"
              width={500}
              height={500}
              className="w-64 sm:w-80 md:w-96 h-auto rounded-lg shadow-md"
            />
          </div>

          <p className="mb-3 sm:mb-4 md:mb-5 font-semibold text-sm sm:text-base">
            2. Bank Account Deposit
          </p>
          <ul className="mb-5 space-y-2 sm:space-y-2.5 text-xs sm:text-sm md:text-base">
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 capitalize font-medium">
                Account Name
              </p>
              <span className="inline">: </span>
              <span>Cane Concept</span>
            </li>
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 capitalize font-medium">
                Account No
              </p>
              <span className="inline">: </span>
              <span className="break-all">10284328192</span>
            </li>
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 capitalize font-medium">
                Bank Name
              </p>
              <span className="inline">: </span>
              <span>STATE BANK OF INDIA, DIMAPUR EVENING BRANCH</span>
            </li>
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 capitalize font-medium">
                Bank Address
              </p>
              <span className="inline">: </span>
              <span>CHURCH ROAD, DIMAPUR 797112 NAGALAND, INDIA</span>
            </li>
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 capitalize font-medium">
                IFSC
              </p>
              <span className="inline">: </span>
              <span className="break-all">SBIN0008068</span>
            </li>
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 capitalize font-medium">
                Swift Code
              </p>
              <span className="inline">: </span>
              <span className="break-all">SBI NIN BB482</span>
            </li>
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 capitalize font-medium">
                UPI ID
              </p>
              <span className="inline">: </span>
              <span className="break-all">caneconcept@sbi</span>
            </li>
            <li className="flex items-start gap-1 sm:gap-0">
              <p className="min-w-24 sm:min-w-32 capitalize font-medium">
                GSTIN
              </p>
              <span className="inline">: </span>
              <span className="break-all">13APMPK9223L</span>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
