import { useState, useEffect } from 'react'
import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Spinner from '@/components/Spinner'

/* The code is defining a React functional component called "Page" that takes a prop called "blok".
Inside the component, it returns a Box component from the Material-UI library. The Box component is
used as the main container for the page. */
export default function Page ({ blok }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(false), 900)
    }
  }, [loading])

  if (loading) {
    return (
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={{ width: 1, height: '100vh', backgroundColor: 'dark.light' }}
      >
        <Spinner />
      </Stack>
    )
  }

  return (
    <Box
      component='main'
      sx={{
        overflow: 'hidden',
        scrollBehavior: 'smooth',
        width: 1
      }}
      {...storyblokEditable(blok)}
    >
      {blok.body?.map(nestedBlok => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </Box>
  )
}
