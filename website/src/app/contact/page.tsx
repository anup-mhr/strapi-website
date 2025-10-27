import Heading from "@/components/common/Heading";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Link from "next/link";

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="py-8 sm:py-10 md:py-12 padding">
        <Heading title="CONTACT" subtitle="Get in touch with us!" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 gap-y-10 sm:gap-y-12 md:gap-y-16 text-gray-600 mt-12 sm:mt-14 md:mt-16 lg:mt-18 mb-8 sm:mb-10 md:mb-12">
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-black uppercase text-sm sm:text-base">
              FIND US
            </h4>
            <div className="space-y-1.5 sm:space-y-2 uppercase text-xs sm:text-sm">
              <p>HEIRLOOM NAGA, HUSSAIN BUILDING</p>
              <p>CIRCULAR ROAD, DIMAPUR</p>
              <p>NAGALAND 797112</p>
            </div>
            <h4 className="font-bold mt-8 sm:mt-9 md:mt-10 mb-3 sm:mb-4 text-black uppercase text-sm sm:text-base">
              TIMINGS
            </h4>
            <div className="space-y-1.5 sm:space-y-2 uppercase text-xs sm:text-sm">
              <p>MON - FRI: 9:30 AM - 6:30 PM</p>
              <p>SUNDAY CLOSED</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-black uppercase text-sm sm:text-base">
              EMAIL
            </h4>
            <div className="space-y-1.5 sm:space-y-2 uppercase text-xs sm:text-sm break-words flex flex-col">
              <a href="mailto:heirloomnaga@gmail.com">HEIRLOOMNAGA@GMAIL.COM</a>
              <a href="mailto:info.heirloomnaga@gmail.com">INFO.HEIRLOOMNAGA@GMAIL.COM</a>
              <a href="mailto:jesminazeliang@gmail.com">JESMINAZELIANG@GMAIL.COM</a>
            </div>
            <h4 className="font-bold mt-8 sm:mt-9 md:mt-10 mb-3 sm:mb-4 text-black uppercase text-sm sm:text-base">
              CALL
            </h4>
            <div className="space-y-1.5 sm:space-y-2 uppercase text-xs sm:text-sm">
              <p>+91 94360-03336</p>
              <p>+91 70027-27722</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 sm:mb-3 text-black uppercase text-sm sm:text-base">
              LINKS
            </h4>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <p className="italic">Hardgoods:</p>
              <Link
                href="https://caneconcept.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-black transition-colors uppercase"
              >
                CANECONCEPT.COM
              </Link>
              <br />
              <p className="italic">Workshops & Guesthouse:</p>
              <Link
                href="https://heirloomnagacentre.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-black transition-colors uppercase"
              >
                HEIRLOOMNAGACENTRE.COM
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] xl:h-[40rem] mb-12 sm:mb-14 md:mb-16 lg:mb-18">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.383521568638!2d93.716267!3d25.9122088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3745e19210c9f617%3A0x2c874906fadc41dc!2sHussain%20Building!5e0!3m2!1sen!2sin!4v1696432875550!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="border-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Heirloom Naga Location"
            aria-label="Heirloom Naga Location"
          ></iframe>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export default ContactPage;
