
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
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
				teal: {
					50: '#e6f7f7',
					100: '#ccefef',
					200: '#99dfdf',
					300: '#66cfcf',
					400: '#33bfbf',
					500: '#00afaf',
					600: '#008c8c',
					700: '#006969',
					800: '#004646',
					900: '#002323',
				},
				emerald: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#059669',
					600: '#047857',
					700: '#065f46',
					800: '#064e3b',
					900: '#022c22',
				},
				gold: {
					50: '#fefbea',
					100: '#fdf6d5',
					200: '#fbedb1',
					300: '#f9e48c',
					400: '#f7db68',
					500: '#f5d244',
					600: '#f3c920',
					700: '#d3ab10',
					800: '#9f810c',
					900: '#6b5708',
				},
				luxury: {
					dark: '#1A1814',
					gold: '#C8AA6E',
					cream: '#F5F1E9',
					brown: '#3C2A1A',
					tan: '#D2B48C',
					accent: '#A67C52',
					darkBrown: '#2C1D10',
					coffeeBrown: '#4A3728',
					chocolateBrown: '#3B2314',
					espresso: '#23120B',
				},
				brown: {
					50: '#FAF8F6',
					100: '#F5F1E9',
					200: '#EAE0D1',
					300: '#D2B48C',
					400: '#C19A6B',
					500: '#A67C52',
					600: '#8B5E3C',
					700: '#704D30',
					800: '#3C2A1A',
					900: '#1F160D',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-out-left': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' }
				},
				'slide-up': {
					from: { transform: 'translateY(10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-left': 'slide-out-left 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			backgroundImage: {
				'luxury-pattern': "url('/lovable-uploads/eb6476f7-3db0-4de7-bfc9-652af5fc7b34.png')",
				'hotel-room': "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470')",
				'hotel-lobby': "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470')",
				'hotel-spa': "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070')",
				'hotel-dining': "url('https://images.unsplash.com/photo-1599458252573-56ae36120de1?q=80&w=2070')",
				'brown-pattern': "linear-gradient(45deg, rgba(60, 42, 26, 0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(60, 42, 26, 0.05) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(60, 42, 26, 0.05) 75%), linear-gradient(-45deg, transparent 75%, rgba(60, 42, 26, 0.05) 75%)",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
