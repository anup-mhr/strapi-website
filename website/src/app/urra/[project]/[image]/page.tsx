import React from "react";

async function page({ params }: { params: Promise<{ image: string }> }) {
  const slug = (await params).image;

  return <div>page</div>;
}

export default page;
