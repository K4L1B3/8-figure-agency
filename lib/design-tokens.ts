// IONS - Design Tokens
// Defines the fundamental design values used throughout the application

export const tokens = {
  colors: {
    primary: "hsl(221, 83%, 53%)",
    success: "hsl(142, 76%, 36%)",
    danger: "hsl(0, 84%, 60%)",
    warning: "hsl(45, 93%, 47%)",
    neutral: {
      50: "hsl(210, 20%, 98%)",
      100: "hsl(220, 14%, 96%)",
      200: "hsl(220, 13%, 91%)",
      300: "hsl(216, 12%, 84%)",
      500: "hsl(220, 9%, 46%)",
      700: "hsl(215, 25%, 27%)",
      900: "hsl(220, 13%, 18%)",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
  typography: {
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
  },
} as const
