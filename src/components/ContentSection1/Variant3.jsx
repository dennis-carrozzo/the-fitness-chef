import Image from 'next/image'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import theme from '@/theme'
import NextMuiLink from '@/components/NextMuiLink'

/* The code is defining a React functional component called `Variant3`. It is the third variant of
the ContentSection component. */
export default function Variant3 ({ blok }) {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      sx={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: 'dark.light',
        paddingBlock: 6
      }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          spacing={{ xs: 3, sm: 10 }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                overflow: 'hidden',
                position: 'relative',
                borderRadius: 10,
                width: 1,
                height: 1,
                minWidth: { xs: 275, lg: 500 },
                minHeight: { xs: 275, lg: 500 }
              }}
            >
              <Image
                src={blok.image.filename}
                alt={blok.image.alt}
                fill
                sizes={`${theme.breakpoints.down('sm').split(' ')[1]} 90vw,${
                  theme.breakpoints.up('sm').split(' ')[1]
                } 40vw`}
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
              <Typography variant='subtitle1' color='text.secondary'>
                {blok.subtitle}
              </Typography>
              {!!blok.ctaLinkText && (
                <NextMuiLink href={blok.ctaLink.cached_url}>
                  <Button variant='contained' color='secondary'>
                    {blok.ctaLinkText}
                  </Button>
                </NextMuiLink>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  )
}
