// src/pages/Login.jsx
import { Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button fullWidth variant="contained" onClick={handleEmailLogin}>
        Login
      </Button>
      <Typography align="center" sx={{ my: 2 }}>
        OR
      </Typography>
      <Button fullWidth variant="outlined" onClick={handleGoogleLogin}>
        Sign in with Google
      </Button>
    </Box>
  );
}
