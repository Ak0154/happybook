/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			surface: 'var(--surface)',
  			card: 'var(--card)',
  			'card-foreground': 'var(--card-foreground)',
  			popover: 'var(--card)',
  			'popover-foreground': 'var(--on-surface)',
  			primary: 'var(--primary)',
  			'primary-foreground': 'var(--on-primary)',
  			secondary: 'var(--secondary)',
  			'secondary-foreground': 'var(--on-secondary)',
  			muted: 'var(--background)',
  			'muted-foreground': 'var(--on-surface-variant)',
  			accent: 'var(--surface)',
  			'accent-foreground': 'var(--on-surface)',
  			border: 'hsl(var(--sidebar-border) / <alpha-value>)',
  			input: 'hsl(var(--sidebar-border) / <alpha-value>)',
  			ring: 'hsl(var(--sidebar-ring) / <alpha-value>)',
  			foreground: 'var(--on-surface)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
        keyframes: {
            "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
        }
  	}
  },
  plugins: [],
}

