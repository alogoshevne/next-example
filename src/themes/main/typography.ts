import { Roboto } from '@next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});
export const typography = {
  fontFamily: roboto.style.fontFamily,
};
