import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { fetchAboutPage } from "@/lib/strapiApiCall";

async function AboutPage() {
  const data = await fetchAboutPage();
  return (
    <div className="min-h-screen flex flex-col text-gray-600">
      <Header />

      <main className="bg-white padding py-8 sm:py-10 md:py-12s">
        <Heading title="ABOUT" subtitle="Our Journey" />
        {data && <div dangerouslySetInnerHTML={{ __html: data }} />}
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
