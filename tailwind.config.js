/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.{html,js}"],
	theme: {
		fontFamily: {
			nunito: ["Nunito Sans", "sans-serif"],
		},
		colors: {
			DarkBlue: "hsl(209, 23%, 22%)", // (Dark Mode Elements)
			DarkBlueBg: "hsl(207, 26%, 17%)", // (Dark Mode Background)
			DarkBlueText: "hsl(200, 15%, 8%)", // (Light Mode Text)
			DarkGray: "hsl(0, 0%, 52%)", // (Light Mode Input)
			VeryLightGray: "hsl(0, 0%, 98%)", // (Light Mode Input)
			White: "hsl(0, 0%, 100%)", // (Dark Mode Text & Light Mode Elements)
		},
		extend: {
			fontSize:{
				homePage:"14px",
				detailPage: "16px"
			}
		},
	},
	plugins: [],
	darkMode: "class",
};
