import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { render } from 'storyblok-rich-text-react-renderer'
import theme from '@/theme'

/* The code is defining a React functional component called `Variant1`. It is the first variant of
the ContentSection2 component. */
export default function Variant1 ({ blok }) {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      sx={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: blok.roundedBorders ? 'dark.light' : 'light.main'
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          borderRadius: blok.roundedBorders ? { lg: 10 } : 0,
          backgroundColor: 'light.main',
          padding: { xs: 2, sm: 6 },
          color: 'text.darksecondary'
        }}
      >
        <Grid
          container
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={{ xs: 3, md: 10 }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                overflow: 'hidden',
                position: 'relative',
                marginTop: { md: 10 },
                borderRadius: 10,
                width: 1,
                height: 1,
                minWidth: { xs: 250, lg: 500 },
                minHeight: { xs: 275, lg: 500 }
              }}
            >
              <Image
                src={blok.image.filename}
                alt={blok.image.alt}
                fill
                sizes={`${theme.breakpoints.down('sm').split(' ')[1]} 90vw,${
                  theme.breakpoints.up('sm').split(' ')[1]
                } 35vw`}
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack
              justifyContent='flex-start'
              alignItems='flex-start'
              spacing={3}
            >
              <Typography variant='overline'>{blok.tagline}</Typography>
              <Typography variant='h4' component='h2'>
                {blok.title}
              </Typography>
              <Box>{render(blok.description)}</Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  )
}
