export default function htmlToPlainText(html: string) {
  // SSR-safe guard — don't use document on the server
  if (typeof window === "undefined" || typeof document === "undefined") {
    // fallback: remove HTML tags using regex
    return html.replace(/<[^>]+>/g, "").trim();
  }

  const temp = document.createElement("div");
  temp.innerHTML = html;

  temp.querySelectorAll("img").forEach((img) => {
    const altText = img.alt ? img.alt : "image";
    img.replaceWith(`[Image: ${altText}]`);
  });

  return temp.textContent?.trim() || "";
}
