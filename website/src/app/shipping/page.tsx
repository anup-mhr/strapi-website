import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

function page() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="padding py-8 sm:py-10 md:py-12">
        <Heading title="" subtitle="Our Shipping Policy" />
        <div className="mx-auto w-full max-w-5xl">
          <section className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-heirloom-charcoal">
              Shipping Policy
            </h2>
            <ul className="list-disc list-outside space-y-2 text-sm sm:text-base text-gray-700 ml-2 sm:ml-4">
              <li className="leading-relaxed">
                We ship anywhere in India and internationally.
              </li>
              <li className="leading-relaxed">
                All orders are dispatched within 3 business days.
              </li>
              <li className="leading-relaxed">
                International orders may require 3-5 business days or more of
                additional processing time prior to shipment.
              </li>
              <li className="leading-relaxed">
                You will be notified once the items are dispatched from our
                warehouse.
              </li>
              <li className="leading-relaxed">
                International orders will be shipped by Air Freight and domestic
                orders will be shipped by a carrier of our choice. Typical
                transit time is usually 3-5 business days.
              </li>
              <li className="leading-relaxed">
                We reserve the right to hold orders for security reasons. If
                your order is affected, you will be notified within two business
                days.
              </li>
            </ul>
          </section>

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            For further information regarding international shipping, kindly
            contact{" "}
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
