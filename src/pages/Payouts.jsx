// src/pages/Payouts.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PayoutTable from "../components/PayoutTable.jsx";

const Payouts = () => {
  const location = useLocation();
  const articles = location.state?.articles || [];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        💸 Article Payouts
      </Typography>
      {articles.length > 0 ? (
        <PayoutTable articles={articles} />
      ) : (
        <Typography variant="body1" color="textSecondary">
          No articles available. Please go back and apply filters.
        </Typography>
      )}
    </Container>
  );
};

export default Payouts;
