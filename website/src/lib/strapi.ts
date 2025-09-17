import { IOptions, IQueryOptions } from "@/types/strapi.dt";
import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchStrapi(
  endpoint: string,
  queryOptions: IQueryOptions = {},
  options: IOptions = {
    revalidate: 60 * 5,
  }
) {
  const query = qs.stringify(queryOptions, { encodeValuesOnly: true });
  console.log("hitting", `${STRAPI_URL}${endpoint}?${query}`);

  const res = await fetch(`${STRAPI_URL}${endpoint}?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: options.cache,
    next: {
      revalidate: options.revalidate,
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.errors) {
    throw new Error(`Strapi errors: ${JSON.stringify(data.errors)}`);
  }

  console.log("fetched data", data);
  return data;
}
