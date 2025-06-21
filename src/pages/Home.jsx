// import React, { useEffect, useState } from "react";
// import NewsChart from "../components/NewsChart.jsx";
// import { useNavigate } from "react-router-dom";
// // import getTheme from "./theme";
// import { useAuth } from "../context/AuthContext";

// import { exportToCSV } from "../components/exportUtils.jsx";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   MenuItem,
//   Stack,
//   Paper,
//   Divider,
//   useTheme,
//   Box,
// } from "@mui/material";
// import { fetchTopHeadlines } from "../services/newsService";

// const sortOptions = [
//   { value: "publishedAt", label: "Newest" },
//   { value: "relevancy", label: "Relevancy" },
//   { value: "popularity", label: "Popularity" },
// ];

// const Home = ({ mode, setMode }) => {
//   const [articles, setArticles] = useState([]);
//   const [allArticles, setAllArticles] = useState([]);
//   const [query, setQuery] = useState("");
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [sortBy, setSortBy] = useState("publishedAt");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { user, logout } = useAuth();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadTopNews = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchTopHeadlines({});
//         setArticles(data);
//         setAllArticles(data);
//         setError("");
//       } catch (err) {
//         setError("Failed to fetch articles.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadTopNews();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       let filtered = [...allArticles];

//       if (query) {
//         filtered = filtered.filter((article) =>
//           article.title.toLowerCase().includes(query.toLowerCase())
//         );
//       }

//       if (from) {
//         const fromDate = new Date(from);
//         filtered = filtered.filter(
//           (article) => new Date(article.publishedAt) >= fromDate
//         );
//       }
//       if (from && to && new Date(to) <= new Date(from)) {
//         setError("❗ 'To' date must be after 'From' date.");
//         setLoading(false);
//         return;
//       }

//       if (to) {
//         const toDate = new Date(to);
//         toDate.setHours(23, 59, 59, 999);
//         filtered = filtered.filter(
//           (article) => new Date(article.publishedAt) <= toDate
//         );
//       }

//       filtered.sort((a, b) => {
//         const dateA = new Date(a.publishedAt).getTime();
//         const dateB = new Date(b.publishedAt).getTime();
//         return dateB - dateA;
//       });

//       setArticles(filtered);
//       if (filtered.length === 0) setError("No matching articles found.");
//     } catch {
//       setError("An error occurred while filtering.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handlePayoutClick = () => {
//     if (user?.isAdmin) {
//       navigate("/payouts", { state: { articles } });
//     } else {
//       alert("⚠️ Access Denied: Please login as an admin to view payouts.");
//     }
//   };

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         mt: 5,
//         backgroundColor: (theme) =>
//           theme.palette.mode === "dark" ? "#1e1e1e" : "#edf2fb",

//         borderRadius: 3,
//         py: 4,
//         px: 3,
//       }}
//     >
//       <Typography
//         variant="h3"
//         align="center"
//         gutterBottom
//         fontWeight="bold"
//         sx={{ color: theme.palette.text.primary }}
//       >
//         🗞️ News Dashboard
//       </Typography>

//       {/* Buttons */}
//       <Stack
//         direction="row"
//         spacing={2}
//         justifyContent="center"
//         alignItems="center"
//         sx={{ mb: 3, flexWrap: "wrap" }}
//       >
//         <Button
//           variant="outlined"
//           sx={{ backgroundColor: "#ccdbfd", color: theme.palette.text.primary }}
//           onClick={() => exportToCSV(articles, "news_data.csv")}
//         >
//           📤 Export to CSV
//         </Button>

//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#abc4ff", color: "#fff" }}
//           onClick={handlePayoutClick}
//         >
//           💸 View Payouts
//         </Button>

//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#c1d3fe", color: "#3b4d61" }}
//           onClick={() => navigate("/author-chart", { state: { articles } })}
//         >
//           📊 Author Chart
//         </Button>

//         {user ? (
//           <>
//             <Typography variant="body1" sx={{ mt: 1, color: "#3b4d61" }}>
//               👤 Logged in as: <strong>{user.email}</strong>
//             </Typography>
//             <Button variant="outlined" color="error" onClick={logout}>
//               🚪 Logout
//             </Button>
//           </>
//         ) : (
//           <Button
//             variant="outlined"
//             sx={{ borderColor: "#3b4d61", color: "#3b4d61" }}
//             onClick={() => navigate("/login")}
//           >
//             🔐 Login
//           </Button>
//         )}
//         <Button
//           variant="outlined"
//           onClick={() => setMode(mode === "light" ? "dark" : "light")}
//           sx={{
//             borderColor: "#3b4d61",
//             color: "#3b4d61",
//           }}
//         >
//           {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//         </Button>
//       </Stack>

//       {/* Stats */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 2, backgroundColor: "#d7e3fc" }}>
//             <Typography variant="subtitle2" color="textSecondary">
//               Total Articles
//             </Typography>
//             <Typography variant="h5" sx={{ color: "#3b4d61" }}>
//               {articles.length}
//             </Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 2, backgroundColor: "#ccdbfd" }}>
//             <Typography variant="subtitle2" color="textSecondary">
//               Current Filter
//             </Typography>
//             <Typography variant="body1" sx={{ color: "#3b4d61" }}>
//               {query || from || to || sortBy
//                 ? `${query ? `Keyword: ${query}` : ""}${
//                     from || to ? ` | Date: ${from} - ${to}` : ""
//                   } | Sort: ${sortBy}`
//                 : "None"}
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Filter Form */}
//       <Paper
//         elevation={3}
//         sx={{
//           p: 3,
//           mb: 4,
//           backgroundColor: "#edf2fb",
//           border: "1px solid #abc4ff",
//         }}
//       >
//         <Typography variant="h6" gutterBottom sx={{ color: "#3b4d61" }}>
//           🔍 Filter Articles
//         </Typography>
//         <form onSubmit={handleSearch}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={3}>
//               <TextField
//                 label="Keyword"
//                 fullWidth
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={6} sm={3} md={2.5}>
//               <TextField
//                 type="date"
//                 label="From"
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//                 value={from}
//                 onChange={(e) => setFrom(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={6} sm={3} md={2.5}>
//               <TextField
//                 type="date"
//                 label="To"
//                 fullWidth
//                 InputLabelProps={{ shrink: true }}
//                 inputProps={{
//                   min: from || "1900-01-01", // must be after "From"
//                   max: new Date().toISOString().split("T")[0], // must not be in future
//                 }}
//                 value={to}
//                 onChange={(e) => setTo(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={2}>
//               <TextField
//                 select
//                 label="Sort By"
//                 fullWidth
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 {sortOptions.map((opt) => (
//                   <MenuItem key={opt.value} value={opt.value}>
//                     {opt.label}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <Stack spacing={1}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{ backgroundColor: "#abc4ff", color: "#fff" }}
//                 >
//                   Apply Filters
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={() => {
//                     setQuery("");
//                     setFrom("");
//                     setTo("");
//                     setSortBy("publishedAt");
//                     setArticles(allArticles);
//                     setError("");
//                   }}
//                 >
//                   🔄 Reset
//                 </Button>
//               </Stack>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>

//       {/* Articles */}
//       <Grid container spacing={3}>
//         {loading ? (
//           <Grid item xs={12}>
//             <Typography align="center">⏳ Loading articles...</Typography>
//           </Grid>
//         ) : error ? (
//           <Grid item xs={12}>
//             <Typography align="center" color="error">
//               ❗ {error}
//             </Typography>
//           </Grid>
//         ) : articles.length === 0 ? (
//           <Grid item xs={12}>
//             <Typography align="center">No articles available.</Typography>
//           </Grid>
//         ) : (
//           articles.map((article, idx) => (
//             <Grid item xs={12} sm={6} md={4} key={idx}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   backgroundColor: "#f0f4ff",
//                   border: "1px solid #c1d3fe",
//                   borderRadius: 2,
//                   boxShadow: 3,
//                   transition: "0.3s",
//                   "&:hover": {
//                     boxShadow: 6,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography
//                     variant="h6"
//                     gutterBottom
//                     noWrap
//                     sx={{ color: "#3b4d61" }}
//                   >
//                     {article.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Author:</strong> {article.author || "Unknown"}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Date:</strong>{" "}
//                     {new Date(article.publishedAt).toLocaleDateString()}
//                   </Typography>
//                 </CardContent>
//                 <Divider />
//                 <CardActions>
//                   <Button
//                     size="small"
//                     sx={{ color: "#3b4d61" }}
//                     href={article.url}
//                     target="_blank"
//                   >
//                     Read More
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import NewsChart from "../components/NewsChart.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { exportToCSV } from "../components/exportUtils.jsx";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Stack,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import { fetchTopHeadlines } from "../services/newsService";

const sortOptions = [
  { value: "publishedAt", label: "Newest" },
  { value: "relevancy", label: "Relevancy" },
  { value: "popularity", label: "Popularity" },
];

const Home = ({ mode, setMode }) => {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();

  const theme = useTheme();
  const primaryButtonStyle = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 2,
    textTransform: "none",
  };

  const secondaryButtonStyle = {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    borderRadius: 2,
    textTransform: "none",
  };

  const outlinedButtonStyle = {
    borderColor: theme.palette.text.primary,
    color: theme.palette.text.primary,
    borderRadius: 2,
    textTransform: "none",
  };

  const navigate = useNavigate();

  useEffect(() => {
    const loadTopNews = async () => {
      try {
        setLoading(true);
        const data = await fetchTopHeadlines({});
        setArticles(data);
        setAllArticles(data);
        setError("");
      } catch (err) {
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
      }
    };
    loadTopNews();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let filtered = [...allArticles];

      if (query) {
        filtered = filtered.filter((article) =>
          article.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (from) {
        const fromDate = new Date(from);
        filtered = filtered.filter(
          (article) => new Date(article.publishedAt) >= fromDate
        );
      }
      if (from && to && new Date(to) <= new Date(from)) {
        setError("❗ 'To' date must be after 'From' date.");
        setLoading(false);
        return;
      }

      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        filtered = filtered.filter(
          (article) => new Date(article.publishedAt) <= toDate
        );
      }

      filtered.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA;
      });

      setArticles(filtered);
      if (filtered.length === 0) setError("No matching articles found.");
    } catch {
      setError("An error occurred while filtering.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayoutClick = () => {
    if (user?.isAdmin) {
      navigate("/payouts", { state: { articles } });
    } else {
      alert("⚠️ Access Denied: Please login as an admin to view payouts.");
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        backgroundColor: theme.palette.background.default,
        borderRadius: 3,
        py: 4,
        px: 3,
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{ color: theme.palette.text.primary }}
      >
        🗞️ News Dashboard
      </Typography>

      {/* Buttons */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, flexWrap: "wrap" }}
      >
        <Button
          sx={primaryButtonStyle}
          onClick={() => exportToCSV(articles, "news_data.csv")}
        >
          📤 Export to CSV
        </Button>

        <Button sx={primaryButtonStyle} onClick={handlePayoutClick}>
          💸 View Payouts
        </Button>

        <Button
          sx={primaryButtonStyle}
          onClick={() => navigate("/author-chart", { state: { articles } })}
        >
          📊 Author Chart
        </Button>

        {user ? (
          <>
            <Typography
              variant="body1"
              sx={{ mt: 1, color: theme.palette.text.primary }}
            >
              👤 Logged in as: <strong>{user.email}</strong>
            </Typography>
            <Button
              variant="outlined"
              color="error"
              sx={{
                ...outlinedButtonStyle,
                borderColor: theme.palette.error.main,
                color: theme.palette.error.main,
              }}
              onClick={logout}
            >
              🚪 Logout
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            sx={outlinedButtonStyle}
            onClick={() => navigate("/login")}
          >
            🔐 Login
          </Button>
        )}

        <Button
          variant="outlined"
          sx={outlinedButtonStyle}
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </Button>
      </Stack>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 2, backgroundColor: theme.palette.background.paper }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Total Articles
            </Typography>
            <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
              {articles.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 2, backgroundColor: theme.palette.background.paper }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Current Filter
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary }}
            >
              {query || from || to || sortBy
                ? `${query ? `Keyword: ${query}` : ""}${
                    from || to ? ` | Date: ${from} - ${to}` : ""
                  } | Sort: ${sortBy}`
                : "None"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filter Form */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          🔍 Filter Articles
        </Typography>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Keyword"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2.5}>
              <TextField
                type="date"
                label="From"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3} md={2.5}>
              <TextField
                type="date"
                label="To"
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: from || "1900-01-01",
                  max: new Date().toISOString().split("T")[0],
                }}
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                select
                label="Sort By"
                fullWidth
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Stack spacing={1}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setQuery("");
                    setFrom("");
                    setTo("");
                    setSortBy("publishedAt");
                    setArticles(allArticles);
                    setError("");
                  }}
                >
                  🔄 Reset
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Articles */}
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12}>
            <Typography align="center">⏳ Loading articles...</Typography>
          </Grid>
        ) : error ? (
          <Grid item xs={12}>
            <Typography align="center" color="error">
              ❗ {error}
            </Typography>
          </Grid>
        ) : articles.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center">No articles available.</Typography>
          </Grid>
        ) : (
          articles.map((article, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    noWrap
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Author:</strong> {article.author || "Unknown"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong>{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    size="small"
                    sx={{ color: theme.palette.primary.main }}
                    href={article.url}
                    target="_blank"
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Home;
