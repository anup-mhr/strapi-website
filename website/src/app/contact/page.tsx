import Heading from "@/components/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="py-12 padding">
                <Heading title="CONTACT" subtitle="Get in touch with us!" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-flow-col gap-8 gap-y-16 text-gray-700 mt-18 mb-12">
                    <div>
                        <h4 className="font-bold mb-4 text-black">FIND US</h4>
                        <div className="space-y-2">
                            <p>HEIRLOOM NAGA, HUSSAIN BUILDING</p>
                            <p>CIRCULAR ROAD, DIMAPUR</p>
                            <p>NAGALAND 797112</p>

                        </div>
                        <h4 className="font-bold mt-10 mb-4 text-black">TIMINGS</h4>
                        <div className="space-y-2">
                            <p>MON - FRI: 9:30 AM - 6:30 PM</p>
                            <p>SUNDAY CLOSED</p>

                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-black">EMAIL</h4>
                        <div className="space-y-2">
                            <p>HEIRLOOMNAGA@GMAIL.COM</p>
                            <p>INFO.HEIRLOOMNAGA@GMAIL.COM</p>
                            <p>JESMINAZELIANG@GMAIL.COM</p>
                        </div>
                        <h4 className="font-bold mt-10 mb-4 text-black">CALL</h4>
                        <div className="space-y-2">
                            <p>+91 94360-03336</p>
                            <p>+91 70027-27722</p>

                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-2 text-black">LINKS</h4>
                        <div className="space-y-2">
                            <p>Hardgoods: </p>

                            <a href="https://caneconcept.com" target="_blank">CANECONCEPT.COM</a><br /><br />
                            <p>
                                Workshops & Guesthouse:
                            </p>

                            <a href="https://heirloomnagacentre.com" target="_blank">HEIRLOOMNAGACENTRE.COM</a>
                        </div>
                    </div>
                </div>


                <div className="w-full h-[40rem] mb-18">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.383521568638!2d93.716267!3d25.9122088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3745e19210c9f617%3A0x2c874906fadc41dc!2sHussain%20Building!5e0!3m2!1sen!2sin!4v1696432875550!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        className="border-0 w-full h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Contact Form */}
                <div className="max-w-3xl mx-auto space-y-4 text-center">
                    <span>
                        <p>YOUR NAME*</p>
                        <input
                            type="text"
                            className="mt-2 mb-6 w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </span>

                    <span>
                        <p>YOUR EMAIL*</p>
                        <input
                            type="email"
                            className="mt-2 mb-6 w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </span>

                    <span>
                        <p>YOUR MESSAGE*</p>
                        <textarea
                            rows={5}
                            className="mt-2 mb-6 w-full border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                        ></textarea>
                    </span>
                    <button className="bg-black rounded-md text-white px-16 py-3 font-bold tracking-wide hover:bg-gray-900 transition">
                        SEND
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default ContactPage;
