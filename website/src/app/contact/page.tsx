import Footer from "@/components/sections/Footer";
import Navigation from "@/components/sections/Navigation";
import React from "react";
import { contactPageLinks } from "@/constants/constants";
import Image from "next/image";

export const metadata = {
  title: "Aku Zeliang - Contact",
  description:
    "Creative portfolio showcasing design work across multiple disciplines",
};

function page() {
  return (
    <div>
      <Navigation links={contactPageLinks} background="bg-transparent" />
      <div>
        <div className="w-full lg:h-screen">
          <Image src="/furniture.jpg" fill alt={"Aku Zeliang contact"} />
        </div>

        <div className="grid grid-cols-2 gap-12 px-[12rem] py-24 bg-white ">
          {/* Left Section */}
          <div className=" text-gray-900 tracking-widest">
            <h2 className="font-semibold text-black mb-8">ABOUT ME</h2>

            <div className="space-y-14 pl-1 font-dosis">
              <div className="space-y-8">
                <p>
                  I founded URRA in 2014 as a Nagaland-based design studio, working with a small team to bring traditional skills and materials into contemporary furniture, lighting, interiors, and artworks. As Creative Director of Cane Concept, I continue to champion sustainable craftsmanship in cane, bamboo, and wood, while collaborating with local communities to keep heritage alive in modern design.
                </p>

                <p>
                  If you’d like to collaborate on a project or have an enquiry, please complete the form below—I’d love to hear from you.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p>Email</p>
                  <p>info@akuzeliang.com</p>
                </div>

                <div>
                  <p>Call</p>
                  <p>+919436003336, +918787401050</p>
                </div>

                <div>
                  <p>Visit</p>
                  <p>
                    Heirloom Naga Centre, Razha Khel,<br />
                    Near Seluphe Junction, Sovima - 797115,<br />
                    Chümoukedima, Nagaland, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <form className="flex flex-col gap-7 text-lg font-semibold">
            <input
              type="text"
              placeholder="First name*"
              className="border border-gray-300 px-5 placeholder-gray-400 p-3"
              required
            />
            <input
              type="text"
              placeholder="Last name*"
              className="border border-gray-300 px-5 placeholder-gray-400 p-3"
              required
            />
            <input
              type="text"
              placeholder="Company name"
              className="border border-gray-300 px-5 placeholder-gray-400 p-3"
            />
            <input
              type="tel"
              placeholder="Phone number*"
              className="border border-gray-300 px-5 placeholder-gray-400 p-3"
              required
            />
            <input
              type="email"
              placeholder="Email*"
              className="border border-gray-300 px-5 placeholder-gray-400 p-3"
              required
            />
            <textarea
              placeholder="Message"
              className="border border-gray-300 px-5 placeholder-gray-400 p-3 h-48"
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white py-5 px-10 mt-2 w-max uppercase font-light tracking-widest text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
