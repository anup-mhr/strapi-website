import Heading from "@/components/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Image from "next/image";

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col text-gray-600">
      <Header />

      <main className=" bg-white padding py-12">
        <Heading title="ABOUT" subtitle="Our Journey" />

        {/* Top Image Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 mb-14">
          <Image
            src="/images/hero.jpeg"
            alt={""}
            width={600}
            height={600}
            className="w-full col-span-2 object-center object-cover h-full"
          />
          <Image
            src="/images/hero.jpeg"
            alt={""}
            width={600}
            height={600}
            className="w-full object-center object-cover h-[20rem] md:h-full"
          />
          <div className="grid grid-rows-2 col-span-3">
            <Image
              src="/images/hero.jpeg"
              alt={""}
              width={600}
              height={600}
              className="w-full object-cover object-center h-[10rem] md:h-96"
            />
            <Image
              src="/images/hero.jpeg"
              alt={""}
              width={600}
              height={600}
              className="w-full object-cover object-center h-[10rem] md:h-96"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-7xl mx-auto">
          <div className="leading-relaxed space-y-6 md:pr-10">
            <p>
              What began as a single weaver&apos;s attempt to reimagine Naga
              textiles in 1993 quickly found resonance far beyond Nagaland.
              Contemporary in style yet deeply rooted in tradition, those first
              handwoven samples leapt from a backyard loom to the window
              displays of a leading lifestyle store. From just 3 weavers, the
              movement grew to 50 within a year — marking the first time
              loin-loom textiles, woven on one of the most ancient looms in the
              world, entered the mainstream of design boutiques and chic stores
              outside Nagaland.
            </p>
            <p>
              For the women behind the loom, weaving was more than craft. It was
              a lifeline woven between farming and household chores — a chance
              at dignity, independence, and a steady income. What began as
              part-time work soon became a profession, passed proudly from
              mothers to daughters, ensuring the survival of both skill and
              story.
            </p>
            <p>
              Over the past two and a half decades, Heirloom Naga has placed
              “Made in Nagaland” textiles on the global stage. By innovating
              with braided tassels, reintroducing cotton and eri silk, and
              staying committed to natural fibres, we sparked new trends while
              restoring authenticity to the region’s weaving traditions.
            </p>
            <p className="font-semibold">
              Today, we are more than a weaving collective — we are a movement
              of cultural custodians. Over 450 women across tribes such as
            </p>
          </div>

          <h3 className="uppercase mt-6 font-bold text-gray-500 tracking-wide">
            Meet Jesmina Zeliang
          </h3>

          {/* Meet Jesmina Section */}
          <section className="grid mt-6 lg:grid-cols-[1fr_24rem] gap-12 items-start">
            <div className="space-y-6 leading-relaxed md:pr-10">
              <p>
                Founder Jesmina Zeliang has been reshaping the Naga textile
                industry since launching her first collection in the early
                nineties. By combining traditional motifs with a contemporary
                context, she is a pioneer in reviving ancestral skills and
                defining a new approach for indigenous craft.
              </p>
              <p>
                When not designing her own products and working with local
                artisans, Zeliang runs numerous projects. She is the
                founder/proprietor of Cane Concepts, and the founding partner of
                Konyak, a North-East specialty store in Guwahati and Dibrugarh
                (Assam).
              </p>
              <p>
                She is also the founding partner of Razhu Pru, a heritage hotel
                in Kohima, Nagaland. And as one of the members of Committee of
                Administration of Export Promotion Council for Handicrafts
                (EPCH), she was elected as the first woman president to preside
                over the Indian Handicrafts and Gift Fair in 2018.
              </p>
              <p>
                Over the years, Zeliang has led delegations representing the
                North-East Region and India to a global audience.
              </p>
              <p>
                She was selected by the US Government to represent India under
                the
              </p>
            </div>

            <Image
              src="/images/about/jesmina.jpeg"
              alt="Jesmina Zeliang"
              width={400}
              height={500}
              className="w-[24rem] mx-auto lg:w-full  object-cover shadow-md"
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
