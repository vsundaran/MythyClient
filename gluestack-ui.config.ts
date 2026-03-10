import { createConfig } from '@gluestack-style/react';

export const config = createConfig({
  aliases: {
    bg: 'backgroundColor',
    bgColor: 'backgroundColor',
    color: 'color',
    p: 'padding',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    m: 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mx: 'marginHorizontal',
    my: 'marginVertical',
  },
  tokens: {
    colors: {
      primary: '#79c3a5',
      primary90: 'rgba(121, 195, 165, 0.9)',
      primary20: 'rgba(121, 195, 165, 0.2)',
      backgroundLight: '#FAF9F6',
      backgroundDark: '#151d1a',
      accentSoft: '#d6e1dc',
      slate100: '#f1f5f9',
      slate300: '#cbd5e1',
      slate400: '#94a3b8',
      slate600: '#475569',
      slate700: '#334155',
      slate800: '#1e293b',
      slate900: '#0f172a',
      white: '#ffffff',
    },
    space: {
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      8: 32,
      10: 40,
      12: 48,
    },
    radii: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 24,
      full: 9999,
    },
    fonts: {
      heading: 'Poppins',
      body: 'Poppins',
    },
    fontSizes: {
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 32,
    },
  },
});

type Config = typeof config;
declare module '@gluestack-style/react' {
  interface ICustomConfig extends Config {}
}
