import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export const tokens = {
	radius: { sm: '4px', md: '8px', lg: '16px', full: '9999px' },
	spacing: ['0', '4px', '8px', '12px', '16px', '24px', '32px', '40px', '56px', '72px'],
	fontFamily: {
		heading: ['"Inter"', 'sans-serif'],
		body: ['"Inter"', 'sans-serif'],
	},
	colors: {
		border: 'hsl(var(--border))',
		input: 'hsl(var(--input))',
		ring: 'hsl(var(--ring))',
		background: 'hsl(var(--background))',
		foreground: 'hsl(var(--foreground))',
		primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
			50: '#ffe6e6', 100: '#feb3b3', 200: '#fd8080', 300: '#fc4d4d',
			400: '#fb1a1a', 500: '#e20000', 600: '#b60000',
			700: '#8a0000', 800: '#5e0000', 900: '#320000',
		},
		secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		},
		destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		},
		muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		},
		accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		},
		popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		},
		card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		},
		sidebar: {
			DEFAULT: 'hsl(var(--sidebar-background))',
			foreground: 'hsl(var(--sidebar-foreground))',
			primary: 'hsl(var(--sidebar-primary))',
			'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			accent: 'hsl(var(--sidebar-accent))',
			'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			border: 'hsl(var(--sidebar-border))',
			ring: 'hsl(var(--sidebar-ring))'
		},
		remondis: {
			DEFAULT: '#00A0DC', // Remondis blå
			dark: '#0077B3',    // Mörkare blå
			light: '#33B4E3',   // Ljusare blå
			green: '#00B140',   // Remondis grön
			gray: '#58595B'     // Remondis grå
		},
		neutral: {
			50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4',
			400: '#a3a3a3', 500: '#737373', 600: '#525252',
			700: '#404040', 800: '#262626', 900: '#171717',
		},
		success: '#22c55e',
		warning: '#facc15',
		error: '#ef4444',
	},
} as const;

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx,js,jsx,mdx}",
		"./node_modules/@shadcn/ui/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			borderRadius: tokens.radius,
			spacing: tokens.spacing,
			colors: tokens.colors,
			fontFamily: {
				heading: tokens.fontFamily.heading,
				body: tokens.fontFamily.body,
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [typography, animatePlugin],
} satisfies Config;

export default config;
