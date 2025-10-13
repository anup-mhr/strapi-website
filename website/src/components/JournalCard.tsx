"use client";

import Image from "next/image";
import Link from "next/link";
import { JournalPost } from "@/types/shopify-v2";
import { Calendar, Clock, User, Tag } from "lucide-react";

interface JournalCardProps {
  post: JournalPost;
  featured?: boolean;
}

export default function JournalCard({
  post,
  featured = false,
}: JournalCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article
      className={`group ${
        featured
          ? ""
          : "bg-heirloom-ivory rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      }`}
    >
      <div
        className={`${
          featured ? "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" : ""
        }`}
      >
        {/* Image */}
        <div
          className={`relative ${
            featured ? "aspect-video" : "aspect-video"
          } overflow-hidden`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-110`}
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className={`${featured ? "py-8" : "p-6"}`}>
          {/* Meta */}
          <div className="flex items-center flex-wrap gap-4 text-sm text-heirloom-charcoal/60 mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h2
            className={`${
              featured ? "text-4xl" : "text-xl"
            } font-serif font-bold text-heirloom-charcoal mb-3 group-hover:text-heirloom-gold transition-colors`}
          >
            <Link href={`/journal/${post.id}`}>{post.title}</Link>
          </h2>

          {/* Excerpt */}
          <p
            className={`text-heirloom-charcoal/70 ${
              featured ? "text-lg" : "text-sm"
            } leading-relaxed mb-4`}
          >
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, featured ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-heirloom-gold/10 text-heirloom-gold text-xs rounded-full"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Read More */}
          <Link
            href={`/journal/${post.id}`}
            className="inline-flex items-center space-x-2 text-heirloom-charcoal font-medium hover:text-heirloom-gold transition-colors"
          >
            <span>Read More</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
