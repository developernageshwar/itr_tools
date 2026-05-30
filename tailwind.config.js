/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        contactusbg: "#2B2B2B",
        white: "#FFFFFF",
        'light-blue': "#F0F4FF",
        'light-purple': "#F8F0FF",
        'brand-blue': "#1498EB",
        'brand-purple': "#962DE3",
        'brand-dark': "#0F172A", 
        'light-gray': "#8e8e93",
        brand: {
          blue: "#1498EB",
          purple: "#962DE3",
          dark: "#0F172A",
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(to right, #1498EB, #962DE3)',  
          'gradient-brand-opacity-50': 'linear-gradient(90deg, #1498EB, #962DE3)',
        'rupee-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='40' font-family='Arial' font-size='30' fill='%231498EB' fill-opacity='0.05' transform='rotate(-20 30 30)'%3E₹%3C/text%3E%3C/svg%3E\")",
      },
      fontFamily: { 
        sans: ['var(--font-outfit)', 'Inter', 'ui-sans-serif', 'system-ui'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
