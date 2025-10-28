import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

function page() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="padding py-8 sm:py-10 md:py-12">
        <Heading title="" subtitle="Our Return & Refund Policy" />
        <div className="mx-auto w-full max-w-5xl">
          <section className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-heirloom-charcoal">
              Returns / Exchange Policy
            </h2>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed text-gray-700">
              To be eligible for a return, please note that:
            </p>
            <ul className="list-disc list-outside space-y-2 text-sm sm:text-base text-gray-700 ml-2 sm:ml-4">
              <li className="leading-relaxed">
                All products must be unused and in the same condition as
                received.
              </li>
              <li className="leading-relaxed">
                The item/s must be in the original packaging.
              </li>
              <li className="leading-relaxed">
                Receipt for proof of purchase on the item must be available.
              </li>
              <li className="leading-relaxed">
                Once we receive your item and ensure that you have followed all
                return policies, you will be notified through the same purchase
                mode of communication.
              </li>
              <li className="leading-relaxed">
                If your return is approved, we will take the exchange and
                replace the product.
              </li>
              <li className="leading-relaxed">
                Buyers will be responsible for bearing the shipping fees of
                returned items for exchange. All shipping costs are{" "}
                <strong className="font-semibold">non-refundable.</strong>
              </li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-heirloom-charcoal">
              Refund / Cancellation Policy:
            </h2>
            <ul className="list-disc list-outside space-y-2 text-sm sm:text-base text-gray-700 ml-2 sm:ml-4">
              <li className="leading-relaxed">
                No refunds after the goods have been dispatched.
              </li>
              <li className="leading-relaxed">
                100% refund within 48hrs of order cancellation.
              </li>
            </ul>
          </section>

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            For any information and queries regarding returns, contact{" "}
            <a
              href="tel:+917005227722"
              className="font-semibold text-heirloom-gold hover:underline whitespace-nowrap"
            >
              +91 7005227722
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default page;
