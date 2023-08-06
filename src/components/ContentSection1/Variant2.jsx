import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Rellax from 'rellax'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import NextMuiLink from '@/components/NextMuiLink'
import theme from '@/theme'

/* The code is defining a React functional component called `Variant2`. It is the second variant of
the ContentSection component. */
export default function Variant2 ({ blok }) {
  const [scrollRef, inView] = useInView({ threshold: 0.3 })
  const imageRef = useRef()
  const textRef = useRef()
  const rellaxRef = useRef()
  useEffect(() => {
    if (inView) {
      if (!rellaxRef.current) {
        rellaxRef.current = new Rellax(imageRef.current, {})
      }
    } else if (rellaxRef.current) {
      rellaxRef.current.refresh()
    }
  }, [inView])

  useEffect(() => {
    if (inView) {
      anime.timeline().add({
        targets: [...textRef.current.children],
        delay: anime.stagger(200),
        opacity: 1,
        top: 0,
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
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: 'dark.light',
        paddingBlock: 6
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,
          top: { xs: -30, sm: 80 },
          left: -10,
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '50%',
          height: { xs: '70vh', sm: '100vh' },
          width: '65vw',
          maxWidth: '50vw',
          maxHeight: 600
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            height: { sm: '200%', md: '150%' },
            width: 1
          }}
        >
          <Image
            sizes={`${theme.breakpoints.down('sm').split(' ')[1]} 90vw,${
              theme.breakpoints.up('sm').split(' ')[1]
            } 50vw`}
            ref={imageRef}
            data-rellax-speed='2'
            src={blok.image.filename}
            alt={blok.image.alt}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>
      <Container maxWidth='md'>
        <Grid
          container
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={5}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: { sm: 'none' },
              height: 300
            }}
          >
            <Box
              sx={{
                display: { xs: 'block', sm: 'none' },
                overflow: 'hidden',
                position: 'relative',
                borderRadius: 10,
                width: 1,
                height: 1
              }}
            >
              <Image
                src={blok.image.filename}
                alt={blok.image.alt}
                fill
                sizes={`${theme.breakpoints.down('sm').split(' ')[1]} 90vw,${
                  theme.breakpoints.up('sm').split(' ')[1]
                } 200vw`}
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>
          <Stack
            component={Grid}
            item
            xs={12}
            justifyContent='flex-end'
            alignItems='flex-end'
          >
            <Stack
              ref={textRef}
              justifyContent='flex-start'
              alignItems='flex-start'
              spacing={3}
              sx={{
                maxWidth: 350,
                '& > *': {
                  position: 'relative',
                  opacity: 0,
                  top: -30
                }
              }}
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
          </Stack>
        </Grid>
      </Container>
    </Stack>
  )
}
