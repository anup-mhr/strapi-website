import ShareButton from "@/components/ShareButton";
import {
  calculateReadingTime,
  formatDate,
  getImageUrl,
  getMonthYear,
} from "@/lib/helper";
import htmlToPlainText from "@/lib/htmlToPlainText";
import { generateJournalMetadata } from "@/lib/metadataHelper";
import { fetchJournalBySlug, fetchRelatedJournals } from "@/lib/strapiApiCall";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  return await generateJournalMetadata(slug);
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params;

  const post = await fetchJournalBySlug(slug);

  if (!post) {
    return notFound();
  }
  const relatedPosts = await fetchRelatedJournals(
    slug,
    post.tags.map((tag: any) => tag.name)
  );

  return (
    <div className="min-h-screen bg-heirloom-ivory pt-12 sm:pt-16 lg:pt-20">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/journal"
            className="inline-flex items-center space-x-2 text-heirloom-charcoal hover:text-heirloom-gold transition-colors mb-6 sm:mb-8 cursor-pointer text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Journal</span>
          </Link>

          {/* Article Header */}
          <header className="mb-8 sm:mb-10 lg:mb-12">
            {/* Meta */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-heirloom-charcoal/60 mb-4 sm:mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{formatDate(post.published_date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{calculateReadingTime(post.content)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Heirloom</span>
              </div>
              <ShareButton post={post} />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-heirloom-charcoal mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.sub_title && (
              <p className="text-base sm:text-lg lg:text-xl text-heirloom-charcoal/80 leading-relaxed mb-4 sm:mb-6">
                {post.sub_title}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/journal?tag=${tag.name}`}
                    className="inline-flex items-center capitalize space-x-1 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-heirloom-gold/10 text-heirloom-gold text-xs sm:text-sm rounded-full hover:bg-heirloom-gold hover:text-heirloom-ivory transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          <Image
            src={getImageUrl(post.profile_image)}
            alt={post.title}
            width={600}
            height={600}
            className="object-cover object-center w-full mb-8 sm:mb-10 lg:mb-12 rounded-md sm:rounded-lg"
            priority
          />

          {/* Article Content */}
          <article className="prose prose-sm sm:prose-base max-w-none mb-12 sm:mb-14 lg:mb-16">
            <div
              className="text-heirloom-charcoal leading-relaxed [&_p]:mb-4 sm:[&_p]:mb-6 [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:lg:text-2xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:my-4 [&_ul]:ml-4 [&_ol]:my-4 [&_ol]:ml-4 [&_li]:mb-2 **:text-heirloom-charcoal! **:font-inherit!"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 sm:mt-16 lg:mt-20">
              <h2 className="text-lg sm:text-xl font-semibold uppercase tracking-wider mb-6 sm:mb-8 text-heirloom-charcoal">
                Related Articles
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="group relative rounded-md md:rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-4/5 sm:aspect-square overflow-hidden">
                      <Image
                        src={getImageUrl(relatedPost.profile_image)}
                        alt={relatedPost.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Overlay Content */}
                    <Link href={`/journal/${relatedPost.slug}`}>
                      <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 sm:bg-white/20 sm:backdrop-blur-sm h-[85%] sm:h-[80%] w-[90%] sm:w-[85%] rounded-lg opacity-0 scale-100 sm:scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 sm:duration-400 ease-in-out p-4 sm:p-5 lg:p-6">
                        <h3 className="text-sm sm:text-base font-semibold leading-tight text-heirloom-charcoal mb-2 group-hover:text-heirloom-gold transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-heirloom-charcoal/70 mb-3 line-clamp-3 sm:line-clamp-4">
                          {htmlToPlainText(relatedPost.content).slice(0, 120)}
                          ...
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-auto text-heirloom-charcoal/60 capitalize text-xs">
                          <span className="text-primary-pink font-medium">
                            {relatedPost.tags.map((tag) => tag.name).join(", ")}
                          </span>
                          <span className="text-xs font-medium uppercase whitespace-nowrap">
                            {getMonthYear(relatedPost.published_date)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
