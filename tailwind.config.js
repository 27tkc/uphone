import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
      spacing: {
        5: "1.25rem",
        10: "2.5rem",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "56px": "56px",
      },
      width: {
        "95vw": "95vw",
        "88vw": "88vw",
        "70vw": "70vw",
      },
      height: {
        "90vh": "90vh",
        "70vh": "70vh",
        "50vh": "50vh",
        "35vh": "35vh",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities }) {
      addComponents({
        ".btn": {
          padding: "0.5rem 1.25rem",
          borderRadius: "1.5rem",
          backgroundColor: "#1E40AF",
          margin: "1.25rem 0",
          border: "1px solid transparent",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "transparent",
            color: "#1E40AF",
            borderColor: "#1E40AF",
          },
        },
      });

      addUtilities({
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".nav-height": {
          height: "calc(100vh - 60px)",
        },
        ".common-padding": {
          padding: "5rem 1.25rem",
        },
        "@screen sm": {
          ".common-padding": {
            padding: "8rem 2.5rem",
          },
        },
        ".g_fadeIn": {
          opacity: "0",
          transform: "translateY(100px)",
        },
      });
    }),
  ],
};
