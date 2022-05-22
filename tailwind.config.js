module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#AD4328",
          secondary: "#B65741",
          accent: "#ed6f3e",
          neutral: "#d19777",
          "base-100": "#ffffff",
        },
      },
    ],
  },
}
