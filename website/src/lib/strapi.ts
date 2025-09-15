import qs from "qs"

export async function fetchStrapi(endpoint: string, options: any = {}) {
    const query = qs.stringify(options, { encodeValuesOnly: true });
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}?${query}`);
    return res.json();
}

