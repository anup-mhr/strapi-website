import qs from "qs"

export async function fetchStrapi(endpoint: string, options: any = {}) {
    const query = qs.stringify(options, { encodeValuesOnly: true });
    console.log("hitting",`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}?${query}`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}?${query}`);
    return res.json();
}

export async function getProjectTitle(category:string) {
  const response = await fetchStrapi("/api/projects", {
    fields: ["slug", "title"],
    filters: {
      category: {
        $eq: category, 
      },
    },
  });

  return response.data;
}
