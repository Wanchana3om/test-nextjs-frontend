import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./auth/authContext";
import { useAuthCheckToken } from "./auth/useAuthCheckToken";

export default function App({ Component, pageProps }: AppProps) {
  useAuthCheckToken();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
