import ContactForm from "@/components/sections/contactForm/ContactForm";
import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { loadLinks } from "@/lib/helper";
import { fetchContactContent } from "@/lib/strapiApiCall";
import Image from "next/image";

export const metadata = {
  title: "Aku Zeliang - Contact",
  description:
    "Contact us for collaborations, projects, or just to say hi! We'd love to hear from you.",
};

async function Contact() {
  const links = await loadLinks();
  const contactData = await fetchContactContent();
  return (
    <div className="font-dosis">
      <Navigation links={links} theme="dark" />

      <div>
        <div className="relative w-full h-[40vh] md:h-[60vh] lg:h-screen">
          <Image
            src="/contact.jpg"
            alt="Aku Zeliang contact"
            fill
            className="object-cover "
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-48 py-16 lg:py-24 bg-white">
          {/* About Section */}
          <div className="text-gray-900 tracking-widest">
            <h2 className="font-semibold text-black mb-5 text-lg">ABOUT ME</h2>

            <div
              className="pl-1 font-dosis text-xs sm:text-sm leading-relaxed **:font-inherit!"
              dangerouslySetInnerHTML={{ __html: contactData }}
            />
          </div>

          {/* Contact Form */}
          <ContactForm className="w-full" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
