import ContactForm from "@/components/sections/contactForm/ContactForm";
import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { links } from "@/constants/constants";
import Image from "next/image";

export const metadata = {
  title: "Aku Zeliang - Contact",
  description:
    "Contact us for collaborations, projects, or just to say hi! We'd love to hear from you.",
};

function Contact() {
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

            <div className="pl-1 font-dosis text-xs sm:text-sm leading-relaxed">
              <div className="mb-10">
                <p className="mb-5">
                  I founded URRA in 2014 as a Nagaland-based design studio,
                  working with a small team to bring traditional skills and
                  materials into contemporary furniture, lighting, interiors,
                  and artworks. As Creative Director of Cane Concept, I continue
                  to champion sustainable craftsmanship in cane, bamboo, and
                  wood, while collaborating with local communities to keep
                  heritage alive in modern design.
                </p>

                <p>
                  If you’d like to collaborate on a project or have an enquiry,
                  please complete the form below—I’d love to hear from you.
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col space-y-8">
                <div>
                  <p className="font-medium">Email</p>
                  <p>hello@akuzeliang.com</p>
                </div>

                <div>
                  <p className="font-medium">Call</p>
                  <p>+919436003336, +918787401050</p>
                </div>

                <div>
                  <p className="font-medium">Visit</p>
                  <p>
                    Heirloom Naga Centre, Razha Khel,
                    <br />
                    Near Seluphe Junction, Sovima - 797115,
                    <br />
                    Chümoukedima, Nagaland, India
                  </p>
                </div>
              </div>
            </div>
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
