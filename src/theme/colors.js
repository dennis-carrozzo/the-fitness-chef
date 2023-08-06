const palette = {
  primary: {
    main: '#8bc34a'
  },
  secondary: {
    main: '#795548'
  },
  accent: {
    main: '#d2b48c',
    dark: '#937d62',
    light: '#dbc3a3'
  },
  accent2: {
    main: '#698996',
    dark: '#495f69',
    light: '#87a0ab'
  },
  dark: {
    main: '#000000',
    light: '#1a1a1a'
  },
  light: {
    main: '#FFFFFF',
    dark: '#b2b2b2'
  }
}
palette.text = {}
palette.text.primary = palette.light.main
palette.text.secondary = palette.light.dark
palette.text.dark = palette.dark.main
palette.text.darksecondary = palette.dark.light

export default palette
