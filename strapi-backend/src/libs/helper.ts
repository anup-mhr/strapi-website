// Keep basic HTML tags but remove all styling
export function cleanHtml(html: string): string {
  if (!html) return html;

  // Allowed tags
  const allowedTags = [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "ul",
    "ol",
    "li",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "a",
  ];

  // Remove all attributes except href for links
  let cleaned = html.replace(/<(\w+)([^>]*)>/gi, (match, tag, attributes) => {
    tag = tag.toLowerCase();

    // If tag is not allowed, remove it
    if (!allowedTags.includes(tag)) {
      return "";
    }

    // For anchor tags, keep only href
    if (tag === "a" && attributes.includes("href")) {
      const hrefMatch = attributes.match(/href\s*=\s*["']([^"']*)["']/i);
      if (hrefMatch) {
        return `<${tag} href="${hrefMatch[1]}">`;
      }
    }

    // For all other allowed tags, remove all attributes
    return `<${tag}>`;
  });

  // Remove style tags
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Remove closing tags for non-allowed tags
  cleaned = cleaned.replace(/<\/(\w+)>/gi, (match, tag) => {
    tag = tag.toLowerCase();
    return allowedTags.includes(tag) ? match : "";
  });

  return cleaned;
}