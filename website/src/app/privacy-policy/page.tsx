import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchPrivacyPage } from "@/lib/strapiApiCall";

export const metadata = {
  title: "Heirloom Naga - Privacy Policy",
  description:
    "Read about how Heirloom Naga collects, uses, and protects your personal information.",
  keywords:
    "heirloom, naga, privacy, policy, information, collection, use, protection",
};

async function page() {
  const data = await fetchPrivacyPage();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="padding py-8 sm:py-10 md:py-12">
        <Heading title="PRIVACY" subtitle="Our privacy policy" />

        <div
          className="w-full mx-auto max-w-5xl leading-relaxed 
              [&_ul]:list-disc 
              [&_ol]:list-decimal 
              [&_li]:mb-2 [&_li]:text-gray-700

              [&_p]:text-gray-700

              [&_strong]:font-semibold
              [&_em]:italic

              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4

              **:font-inherit!
            "
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>

      <Footer />
    </div>
  );
}

export default page;
