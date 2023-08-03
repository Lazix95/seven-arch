import { sharedThemeDefaultDark, sharedThemeDefaultLight } from "@/themes/sharedThemeDefault";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

export function SharedThemeProvider({ mode, children }: { mode?: "light" | "dark"; children: ReactNode }) {
  const isSystemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const isManualDark = mode === "dark";
  const theme = (isSystemDark || isManualDark) && mode !== "light" ? sharedThemeDefaultDark : sharedThemeDefaultLight;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
