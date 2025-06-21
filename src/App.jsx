// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AuthorChart from "./pages/AuthorChart";
import Payouts from "./pages/Payouts.jsx";
import { useAuth } from "./context/AuthContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState } from "react";
import { getTheme } from "./theme";
// ⬅️ import theme function

function App() {
  const { user } = useAuth();

  // Toggle between light and dark
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={user ? <Home mode={mode} setMode={setMode} /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/payouts" element={<Payouts />} />
        <Route path="/author-chart" element={<AuthorChart />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
