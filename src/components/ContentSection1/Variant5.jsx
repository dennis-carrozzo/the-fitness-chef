import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme'
import NextMuiLink from '@/components/NextMuiLink'

/* The code is defining a React functional component called `Variant5`. It is the fifth variant of
the ContentSection component. */
export default function Variant5 ({ blok }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [scrollRef, inView] = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5
  })
  const boxRef = useRef()

  useEffect(() => {
    if (inView) {
      anime.timeline().add({
        targets: boxRef.current,
        delay: 500,
        height: '100%',
        easing: 'easeOutExpo'
      })
    }
  }, [inView])

  return (
    <Stack
      ref={scrollRef}
      justifyContent='center'
      alignItems='center'
      sx={{
        backgroundColor: 'dark.light',
        paddingBlock: 10
      }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          spacing={{ xs: 3, lg: 10 }}
        >
          <Grid item xs={12} sm={6}>
            <Stack
              justifyContent='center'
              alignItems='flex-start'
              spacing={3}
              sx={{
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1,
                borderRadius: 10,
                width: 1,
                height: 1,
                minWidth: { xs: 275, lg: 500 },
                minHeight: { xs: 275, lg: 500 },
                padding: 5
              }}
            >
              <Box
                ref={boxRef}
                sx={{
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                  width: 1,
                  height: 0,
                  backgroundColor: 'accent2.dark'
                }}
              />
              <Typography variant='overline'>{blok.tagline}</Typography>
              <Typography variant={isSmallScreen ? 'h5' : 'h3'} component='h2'>
                {blok.title}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary'>
                {blok.subtitle}
              </Typography>
              {!!blok.ctaLinkText && (
                <NextMuiLink href={blok.ctaLink.cached_url}>
                  <Button variant='contained'>{blok.ctaLinkText}</Button>
                </NextMuiLink>
              )}
            </Stack>
          </Grid>
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
        </Grid>
      </Container>
    </Stack>
  )
}
