import { useContext, useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '@/components/NextMuiLink'
import useMediaQuery from '@mui/material/useMediaQuery'
import Rellax from 'rellax'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import theme from '@/theme'
import configContext from '@/context/config'

/* The code is defining a React functional component called "Variant1". It is a variant of the Hero
Component */
export default function Variant1 ({ blok }) {
  const { content } = useContext(configContext)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [scrollRef, inView] = useInView()
  const textRef = useRef()
  const imageRef = useRef()
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
        color: 'light.main'
      }}
    >
      <Box
        ref={imageRef}
        data-rellax-speed='-1'
        sx={{
          position: 'absolute',
          zIndex: -1,
          top: { xs: -30, sm: 20 },
          right: -10,
          minHeight: { xs: '70vh', sm: '100vh' },
          width: '65vw',
          maxWidth: 800,
          maxHeight: 800
        }}
      >
        <Image
          src={blok.image.filename}
          alt={blok.image.alt}
          fill
          as='image'
          sizes='50vw'
          priority
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Container maxWidth='md'>
        <Grid
          container
          justifyContent='start'
          alignItems={{ xs: 'end', sm: 'center' }}
          sx={{ width: 1, height: { xs: '80vh', sm: 'fit-content' } }}
        >
          <Grid
            ref={textRef}
            item
            xs={12}
            sm={7}
            md={6}
            sx={{
              '& > *': {
                position: 'relative',
                opacity: 0,
                top: -100
              }
            }}
          >
            <Typography
              variant='overline'
              component='p'
              sx={{ maxWidth: { xs: 0.7, sm: 1 } }}
            >
              {blok.tagline}
            </Typography>
            <Typography
              variant={isSmallScreen ? 'h4' : 'h2'}
              component='h1'
              sx={{ lineHeight: 1.1 }}
            >
              {blok.title}
            </Typography>
            <Stack
              direction='row'
              justifyContent='flex-start'
              alignItems='center'
              spacing={5}
              sx={{ paddingTop: 3 }}
            >
              <NextMuiLink href={content?.deliverooLink?.cached_url}>
                <Button variant='contained' size='large' color='accent2'>
                  <Image
                    src='/deliveroo.svg'
                    alt='deliveroo icon'
                    width='50'
                    height='40'
                  />
                </Button>
              </NextMuiLink>
              <NextMuiLink href={content?.uberEatsLink?.cached_url}>
                <Button variant='contained' size='large' color='accent2'>
                  <Image
                    src='/uber-eats.svg'
                    alt='deliveroo icon'
                    width='50'
                    height='40'
                  />
                </Button>
              </NextMuiLink>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  )
}
