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
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Shipping Policy</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>We ship anywhere in India and internationally.</li>
              <li>All orders are dispatched within 3 business days.</li>
              <li>
                International orders may require 3-5 business days or more of
                additional processing time prior to shipment.
              </li>
              <li>
                You will be notified once the items are dispatched from our
                warehouse.
              </li>
              <li>
                International orders will be shipped by Air Freight and domestic
                orders will be shipped by a carrier of our choice. Typical
                transit time is usually 3-5 business days.
              </li>
              <li>
                We reserve the right to hold orders for security reasons. If
                your order is affected, you will be notified within two business
                days.
              </li>
            </ul>
          </section>

          <p>
            For further information regarding international shipping, kindly
            contact <strong>+91 7005227722</strong>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
