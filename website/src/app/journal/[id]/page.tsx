import {
  calculateReadingTime,
  formatDate,
  getImageUrl,
  getMonthYear,
} from "@/lib/helper";
import htmlToPlainText from "@/lib/htmlToPlainText";
import { fetchJournalBySlug, fetchJournals } from "@/lib/strapiApiCall";
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface JournalPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({
  params,
}: JournalPostPageProps) {
  const { slug } = await params;
  const post = await fetchJournalBySlug(slug);
  const relatedPosts = await fetchJournals(3);

  // const handleShare = async () => {
  //   if (navigator.share && post) {
  //     try {
  //       await navigator.share({
  //         title: post.title,
  //         text: post.slug,
  //         url: window.location.href,
  //       });
  //     } catch (error) {
  //       console.error("Error sharing:", error);
  //     }
  //   } else {
  //     // Fallback: copy to clipboard
  //     navigator.clipboard.writeText(window.location.href);
  //     alert("Link copied to clipboard!");
  //   }
  // };

  if (!post) {
    return null;
  }
  console.log("Journal Post:", post?.content);

  return (
    <div className="min-h-screen bg-heirloom-ivory pt-20">
      <div className="section-padding ">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/journal"
            className="flex items-center space-x-2 text-heirloom-charcoal hover:text-heirloom-gold transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Journal</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            {/* Meta */}
            <div className="flex items-center flex-wrap gap-4 text-sm text-heirloom-charcoal/60 mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{calculateReadingTime(post.content)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Heirloom</span>
              </div>
              <button
                // onClick={handleShare}
                className="flex items-center space-x-1 hover:text-heirloom-gold transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-heirloom-charcoal mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-heirloom-charcoal/80 leading-relaxed mb-6">
              {post.sub_title}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/journal?tag=${tag.name}`}
                  className="inline-flex items-center capitalize space-x-1 px-3 py-1 bg-heirloom-gold/10 text-heirloom-gold text-sm rounded-full hover:bg-heirloom-gold hover:text-heirloom-ivory transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag.name}</span>
                </Link>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
            <Image
              src={getImageUrl(post.profile_image)}
              alt={post.title}
              fill
              className="object-cover object-centers"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Article Content */}
          <article className="prose max-w-none mb-16">
            <div
              className="text-heirloom-charcoal leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold uppercase tracking-wider mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* <div className="relative h-40 w-full overflow-hidden"> */}
                    <Image
                      src={getImageUrl(relatedPost.profile_image)}
                      alt={relatedPost.title}
                      width={600}
                      height={600}
                      className="object-cover object-center transition-transform w-full h-92 duration-500 group-hover:scale-110"
                    // sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* </div> */}
                    <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 h-[80%] w-[80%] backdrop-blur-sm rounded-lg opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 ease-in-out  p-6">
                      <h3 className="text-base font-semibold leading-5 text-heirloom-charcoal mb-2 group-hover:text-heirloom-gold transition-colors">
                        <Link href={`/journal/${relatedPost.id}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-heirloom-charcoal/70 mb-3">
                        {htmlToPlainText(relatedPost.content).slice(0, 150)}...
                      </p>
                      <div className="flex items-center justify-between mt-auto text-heirloom-charcoal/60 capitalize">
                        <span className="text-primary-pink">
                          {relatedPost.tags.map((tag) => tag.name).join(" ")}
                        </span>
                        <span className="text-sm font-medium uppercase">
                          {getMonthYear(relatedPost.published_date)}
                        </span>
                      </div>
                    </div>
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
