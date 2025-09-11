import Footer from "@/components/common/Footer";
import Navigation from "@/components/common/Navigation";
import React from "react";
import { contactPageLinks } from "@/constants/constants";
import Image from "next/image";
import ContactForm from "@/components/sections/contactForm/ContactForm";

export const metadata = {
  title: "Aku Zeliang - Contact",
  description:
    "Creative portfolio showcasing design work across multiple disciplines",
};

function Contact() {
  return (
    <div className="font-dosis">
      <Navigation links={contactPageLinks} theme="dark" />
      <div>
        <div className="w-full lg:h-screen">
          <Image src="/furniture.jpg" fill alt={"Aku Zeliang contact"} />
        </div>

        <div className="grid grid-cols-2 gap-12 px-[12rem] py-24 bg-white ">
          {/* Left Section */}
          <div className=" text-gray-900 tracking-widest">
            <h2 className="font-semibold text-black mb-8">ABOUT ME</h2>

            <div className="pl-1 font-dosis ">
              <div className="space-y-8 mb-16">
                <p>
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

              <div className="flex flex-col ">
                <div className="mb-16">
                  <p>Email</p>
                  <p>info@akuzeliang.com</p>
                </div>

                <div className="mb-16">
                  <p>Call</p>
                  <p>+919436003336, +918787401050</p>
                </div>

                <div className="mb-16">
                  <p>Visit</p>
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

          {/* Right Section - Contact Form */}
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
