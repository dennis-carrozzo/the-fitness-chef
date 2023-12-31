import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
})

const typography = {
  fontFamily: montserrat.style.fontFamily
}

export default typography
