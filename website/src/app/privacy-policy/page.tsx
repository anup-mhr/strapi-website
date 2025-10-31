import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchPrivacyPage } from "@/lib/strapiApiCall";

async function page() {
  const data = await fetchPrivacyPage();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="padding py-8 sm:py-10 md:py-12">
        <Heading title="PRIVACY" subtitle="Our privacy policy" />

        <div
          className="w-full mx-auto max-w-5xl leading-relaxed **:font-inherit!"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>

      <Footer />
    </div>
  );
}

export default page;
