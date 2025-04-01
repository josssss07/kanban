module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-purple": "#635FC7",
        "main-purple-hover": "#A8A4FF",
        black: "#000112",
        "very-dark-grey": "#20212C",
        "dark-grey": "#2B2C37",
        "lines-dark": "#3E3F4E",
        "medium-grey": "#828FA3",
        "lines-light": "#E4EBFA",
        "light-grey": "#F4F7FD",
        white: "#FFFFFF",
        red: "#EA5555",
        "red-hover": "#FF9898",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        "heading-xl": ["24px", { lineHeight: "30px", fontWeight: "700" }],
        "heading-l": ["18px", { lineHeight: "23px", fontWeight: "700" }],
        "heading-m": ["15px", { lineHeight: "19px", fontWeight: "700" }],
        "heading-s": [
          "12px",
          { lineHeight: "15px", fontWeight: "700", letterSpacing: "2.4px" },
        ],
        "body-l": [
          "15px",
          { lineHeight: "23px", fontWeight: "500", letterSpacing: "1px" },
        ],
        "body-m": ["12px", { lineHeight: "15px", fontWeight: "700" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
