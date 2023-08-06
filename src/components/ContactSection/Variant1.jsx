import { useCallback, useContext, useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Email from '@mui/icons-material/Email'
import LocationOn from '@mui/icons-material/LocationOn'
import Phone from '@mui/icons-material/Phone'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'

import configContext from '@/context/config'
import NextMuiLink from '@/components/NextMuiLink'

export default function Variant1 ({ blok }) {
  const { content } = useContext(configContext)
  const [scrollRef, inView] = useInView({
    threshold: 0.5
  })
  const cardsRef = useRef()

  useEffect(() => {
    if (inView) {
      anime.timeline().add({
        targets: [...cardsRef.current.children],
        delay: anime.stagger(200),
        opacity: 1,
        top: 0,
        easing: 'easeOutExpo'
      })
    }
  }, [inView])

  /* The `generateGoogleMapsString` function is a callback function created using the `useCallback`
  hook. It takes an `address` parameter and returns a Google Maps URL string. */
  const generateGoogleMapsString = useCallback(
    address => 'https://www.google.com/maps?q=' + address.replace(' ', '+'),
    []
  )

  return (
    <Stack
      ref={scrollRef}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'light.main', paddingBlock: { xs: 6 } }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          spacing={{ xs: 8, md: 2 }}
          ref={cardsRef}
          sx={{
            '& > *': {
              position: 'relative',
              opacity: 0,
              top: -30
            }
          }}
        >
          {/* EMail */}
          <Grid item xs={12} md={3}>
            <Stack
              justifyContent='flex-start'
              alignItems='center'
              spacing={1}
              sx={{ minHeight: { md: 300 }, color: 'dark.light' }}
            >
              <Stack
                justifyContent='center'
                alignItems='center'
                sx={{
                  borderRadius: '50%',
                  width: 100,
                  height: 100,
                  backgroundColor: 'accent2.main'
                }}
              >
                <Email sx={{ width: 50, height: 50, color: 'dark.main' }} />
              </Stack>
              <Typography variant='button' component='h3' align='center'>
                {blok.contactCards[0].title}
              </Typography>
              <Typography
                variant='subtitle1'
                component='p'
                align='center'
                sx={{ minHeight: { md: 75 } }}
              >
                {blok.contactCards[0].subtitle}
              </Typography>
              <NextMuiLink href={`mailto:${content.contacts[0].email}`}>
                <Button variant='text' color='accent'>
                  {content.contacts[0].email}
                </Button>
              </NextMuiLink>
            </Stack>
          </Grid>
          {/* Location */}
          <Grid item xs={12} md={3}>
            <Stack
              justifyContent='flex-start'
              alignItems='center'
              spacing={1}
              sx={{ minHeight: { md: 300 }, color: 'dark.light' }}
            >
              <Stack
                justifyContent='center'
                alignItems='center'
                sx={{
                  borderRadius: '50%',
                  width: 100,
                  height: 100,
                  backgroundColor: 'accent2.main'
                }}
              >
                <LocationOn
                  sx={{ width: 50, height: 50, color: 'dark.main' }}
                />
              </Stack>
              <Typography variant='button' component='h3' align='center'>
                {blok.contactCards[1].title}
              </Typography>
              <Typography
                variant='subtitle1'
                component='p'
                align='center'
                sx={{ minHeight: { md: 75 } }}
              >
                {blok.contactCards[1].subtitle}
              </Typography>
              <NextMuiLink
                href={generateGoogleMapsString(content.contacts[0].address)}
                target='_blank'
              >
                <Button variant='text' color='accent'>
                  {content.contacts[0].address}
                </Button>
              </NextMuiLink>
            </Stack>
          </Grid>
          {/* Phone */}
          <Grid item xs={12} md={3}>
            <Stack
              justifyContent='flex-start'
              alignItems='center'
              spacing={1}
              sx={{ minHeight: { md: 300 }, color: 'dark.light' }}
            >
              <Stack
                justifyContent='center'
                alignItems='center'
                sx={{
                  borderRadius: '50%',
                  width: 100,
                  height: 100,
                  backgroundColor: 'accent2.main'
                }}
              >
                <Phone sx={{ width: 50, height: 50, color: 'dark.main' }} />
              </Stack>
              <Typography variant='button' component='h3' align='center'>
                {blok.contactCards[2].title}
              </Typography>
              <Typography
                variant='subtitle1'
                component='p'
                align='center'
                sx={{ minHeight: { md: 75 } }}
              >
                {blok.contactCards[2].subtitle}
              </Typography>
              <NextMuiLink href={`tel:${content.contacts[0].phone}`}>
                <Button variant='text' color='accent'>
                  {content.contacts[0].phone}
                </Button>
              </NextMuiLink>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  )
}
