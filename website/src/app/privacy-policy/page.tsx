import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

function page() {

    return (
        <div className="min-h-screen">
            <Header />
            <div className="padding py-8 sm:py-10 md:py-12">
                <Heading title="" subtitle="Our Privacy policy" />
                <div className="w-full mx-auto max-w-5xl">

                    <p className="mb-4">
                        When accessing our website, Heirloomnaga.com will collect standard information during your visit.
                        Data collected depends on the following information:
                    </p>

                    <ul className="list-disc list-inside mb-6 space-y-1">
                        <li>The name of the domain from which you access the Internet.</li>
                        <li>The date and time you access our site.</li>
                        <li>The Internet address of the website you used to link directly to our site.</li>
                    </ul>

                    <p className="mb-4">
                        Heirloomnaga.com <strong>DOES NOT</strong> trade or sell personal information in any manner except as specified herein,
                        or if consented by you. Any personal information submitted through the website and information collected
                        will be solely used:
                    </p>

                    <ul className="list-disc list-inside mb-6 space-y-1">
                        <li>to facilitate user experience of the website</li>
                        <li>to respond to enquiries or fulfill your requests</li>
                        <li>to provide information about the products on Heirloomnaga.com</li>
                        <li>for proper administering of the website</li>
                        <li>to improve services, content and advertising on the website</li>
                        <li>to protect integrity of the brand and the website</li>
                        <li>
                            to respond to judicial process and provide information to law enforcement agencies,
                            or in connection with investigations on matters related to public safety as permitted by the law.
                        </li>
                    </ul>

                    <h2 className="text-lg font-semibold mb-2">Disclaimer</h2>

                    <p>
                        All content included on this site is the property of Heirloom Naga, or its content suppliers.
                        All physical artworks are owned solely by Heirloom Naga or its artisans and craftsperson and are
                        subject to the applicable copyright laws. The compilation of all content on this website is the
                        exclusive property of Heirloom Naga. Any infringement of the copyright/trademark included on the
                        site will be subjected to penal provision under the extant provision of law.
                    </p>
                </div>

            </div>

            <Footer />
        </div>

    )
}

export default page;