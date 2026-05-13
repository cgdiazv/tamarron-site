const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  return json.data;
}

export async function getAllPosts() {
  const data = await fetchAPI(`
    query AllPosts {
      posts {
        nodes {
          title
          slug
          excerpt
        }
      }
    }
  `);
  return data?.posts?.nodes;
}