import React from "react";

export async function generateStaticParams() {
  // TODO: FUTURE
  //* RETURN ALL PROJECTS FROM THIS FUNCTION FOR SSG *//
  //   const blogSlugs = await getAllBlogSlugs();
  //   return blogSlugs.map((slug) => ({
  //     id: slug,
  //   }));
}

async function page({ params }: { params: Promise<{ project: string }> }) {
  const slug = (await params).project;

  return <div>page</div>;
}

export default page;
