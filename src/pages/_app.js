import { storyblokInit, apiPlugin } from '@storyblok/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import MenuLink from '@/components/MenuLink'
import Page from '@/components/Page'
import theme from '@/theme'

const components = {
  Hero,
  MenuLink,
  Page
}

// initialize the storyblok SDK
storyblokInit({
  accessToken: process.env.storyblokPreviewToken,
  use: [apiPlugin],
  components
})

/**
 * The function `MyApp` is a React component that wraps the provided `Component` with a theme provider,
 * CSS baseline, and a layout component.
 */
function MyApp ({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout story={pageProps.config}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
