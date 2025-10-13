import Heading from "@/components/Heading";
import LinkButton from "@/components/LinkButton";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { journal } from "@/constants/constants";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";

function JournalPage() {
    return (
        <div className="min-h-screen">
            <Header />

            <main className="py-12 padding">
                <Heading title="JOURNAL" subtitle="Stories of Craft, Culture and Change" />



                <div className="flex justify-between items-center mb-10">
                    <p className="text-xs text-gray-600">SHOWING 1-9 OF 16 RESULTS</p>
                    <select className="border border-black/20 text-primary rounded-md text-sm font-bold tracking-normal pl-6 px-2 py-2">
                        <option>FILTER BY</option>
                    </select>
                </div>


                <section className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-24 text-gray-700">
                    {
                        Array(6).fill(journal[0]).map((journal, index) => (
                            <div key={index}>
                                <Image src={journal.image} alt={journal.title}
                                    width={200} height={600} className="aspect-[3/3.7] w-full mb-6"
                                />

                                <h1 className="text-lg font-semibold text-black">{journal.title}</h1>
                                <h2 className="text-primary-pink">{journal.subtitle}</h2>
                                <p className="mt-4 mb-8 line-clamp-2">
                                    {journal.description}
                                </p>

                                <LinkButton href={"/"} className="bg-black hover:bg-gray-900 text-base tracking-normal">
                                    READ STORY
                                </LinkButton>

                            </div>
                        ))
                    }
                </section>

                <div className="flex space-x-2 justify-center mt-26">
                    <button className="w-10 h-10 bg-primary-pink text-white rounded-full">1</button>
                    <button className="w-10 h-10 border border-black/20 rounded-full text-gray-600">2</button>
                    <button className="w-10 h-10 border border-black/20 rounded-full text-gray-600">3</button>
                    <button className="w-10 h-10 border border-black/20 rounded-full text-gray-600">4</button>
                    <button className="text-gray-600">
                        <ChevronsRight />
                    </button>
                </div>

            </main>

            <Footer />
        </div>
    )
}

export default JournalPage;