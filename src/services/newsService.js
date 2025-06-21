// src/services/newsService.js
const API_KEY = "7725a738e9dc41a39b700015071c8f07";
const BASE_URL = "https://newsapi.org/v2/everything";

export const fetchTopHeadlines = async ({
  query = "top",
  from,
  to,
  sortBy,
}) => {
  const params = new URLSearchParams({
    q: query,
    sortBy,
    apiKey: API_KEY,
    language: "en",
    ...(from && { from }),
    ...(to && { to }),
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  const data = await res.json();
  return data.articles || [];
};
