import ContactForm from "@/components/sections/contactForm/ContactForm";
import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { getImageUrl, loadLinks } from "@/lib/helper";
import { fetchContactContent } from "@/lib/strapiApiCall";
import Image from "next/image";

export const metadata = {
  title: "Aku Zeliang - Contact",
  description:
    "Contact us for collaborations, projects, or just to say hi! We'd love to hear from you.",
};

async function Contact() {
  const contactData = await fetchContactContent();
  if (!contactData) {
    return <div className="">Something went wrong</div>;
  }
  const links = await loadLinks();
  return (
    <div className="font-dosis">
      <Navigation links={links} theme="dark" />

      <div>
        <div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[80vh]">
          <Image
            src={getImageUrl(contactData.heroSection.image)}
            alt="Aku Zeliang"
            fill
            className="object-cover "
            priority
          />

          {(contactData.heroSection?.subTitle ||
            contactData.heroSection?.title) && (
            <div className="absolute top-1/2 left-5/7 transform -translate-x-1/2 -translate-y-1/2 min-w-40 lg:min-w-sm text-left ">
              {contactData.heroSection?.title && (
                <h1 className="text-xs sm:text-lg lg:text-2xl font-semibold tracking-widest text-white ">
                  {contactData.heroSection.title}
                </h1>
              )}
              {contactData.heroSection?.subTitle && (
                <p className="text-[8px] sm:text-2xs lg:text-sm tracking-wider text-white/90">
                  {contactData.heroSection.subTitle}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-48 py-16 lg:py-24 bg-white">
          {/* About Section */}
          <div className="text-gray-900 tracking-widest">
            <div
              className="pl-1 font-dosis text-xs sm:text-sm leading-relaxed **:font-inherit!
                    ck-content
                    [&_p]:mb-4
                    [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mb-5
                    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4
                    [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3

                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                    [&_li]:mb-1

                    [&_strong]:font-semibold
                    [&_em]:italic

                    [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4

                    [&_img]:rounded-lg [&_img]:w-full [&_img]:my-6
                    [&_figure]:my-6 [&_figure_img]:rounded-lg [&_figure_img]:w-full

                    [&_section]:mt-6 [&_section]:mb-6 
                  "
              dangerouslySetInnerHTML={{ __html: contactData.content }}
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
