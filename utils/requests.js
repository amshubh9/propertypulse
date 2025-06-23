const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || '';

async function fetchProperties() {
  try {
    const endpoint = apiDomain ? `${apiDomain}/properties` : '/api/properties';
    const res = await fetch(endpoint, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch properties: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}


async function fetchProperty(id) {
  try {
    if (!id) return null;
    const url = apiDomain
      ? `${apiDomain}/properties/${id}`
      : `/api/properties/${id}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
