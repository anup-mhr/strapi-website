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
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Returns / Exchange Policy</h2>
                        <p>To be eligible for a return, please note that:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>All products must be unused and in the same condition as received.</li>
                            <li>The item/s must be in the original packaging.</li>
                            <li>Receipt for proof of purchase on the item must be available.</li>
                            <li>
                                Once we receive your item and ensure that you have followed all return policies,
                                you will be notified through the same purchase mode of communication.
                            </li>
                            <li>
                                If your return is approved, we will take the exchange and replace the product.
                            </li>
                            <li>
                                Buyers will be responsible for bearing the shipping fees of returned items for
                                exchange. All shipping costs are <strong>non-refundable.</strong>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Refund / Cancellation Policy:</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>No refunds after the goods have been dispatched.</li>
                            <li>100% refund within 48hrs of order cancellation.</li>
                        </ul>
                    </section>

                    <p>
                        For any information and queries regarding returns, contact{" "}
                        <strong>+91 7005227722</strong>
                    </p>
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default page;