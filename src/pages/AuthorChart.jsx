import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewsChart from "../components/NewsChart";
import { Container, Typography, Button } from "@mui/material";

const AuthorChart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Try to get articles from location state
    if (location.state?.articles && location.state.articles.length > 0) {
      setArticles(location.state.articles);
      localStorage.setItem(
        "authorArticles",
        JSON.stringify(location.state.articles)
      );
    } else {
      // Fallback to localStorage if state is missing (e.g., on refresh)
      const storedArticles = localStorage.getItem("authorArticles");
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      }
    }
  }, [location.state]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🧠 Author-wise Article Chart
      </Typography>

      <NewsChart articles={articles} />

      <Button variant="contained" sx={{ mt: 4 }} onClick={() => navigate(-1)}>
        ⬅ Back to Home
      </Button>
    </Container>
  );
};

export default AuthorChart;
