import { useCallback, useContext, useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Email from '@mui/icons-material/Email'
import LocationOn from '@mui/icons-material/LocationOn'
import Phone from '@mui/icons-material/Phone'
import configContext from '@/context/config'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import NextMuiLink from '@/components/NextMuiLink'

export default function Variant1 ({ blok }) {
  const { content } = useContext(configContext)
  const [scrollRef, inView] = useInView({
    threshold: 0.5
  })
  const cardsRef = useRef()

  /* The `generateGoogleMapsString` function is a callback function created using the `useCallback`
  hook. It takes an `address` parameter and returns a Google Maps URL string. */
  const generateGoogleMapsString = useCallback(
    address => 'https://www.google.com/maps?q=' + address.replace(' ', '+'),
    []
  )

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

  return (
    <Stack
      ref={scrollRef}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'light.main', paddingBlock: { xs: 15 } }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          justifyContent='center'
          alignItems='flex-start'
          spacing={{ xs: 8, md: 2 }}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant='h3' component='h2' color='text.darksecondary'>
              Our Contacts
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack
              spacing={10}
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
              <Stack
                justifyContent='flex-start'
                alignItems='flex-start'
                spacing={1}
                sx={{ color: 'dark.light' }}
              >
                <Stack
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    backgroundColor: 'accent2.main'
                  }}
                >
                  <Email sx={{ width: 20, height: 20, color: 'dark.main' }} />
                </Stack>
                <Typography variant='button' component='h3' align='left'>
                  {blok.contactCards[0].title}
                </Typography>
                <Typography variant='subtitle1' component='p' align='left'>
                  {blok.contactCards[0].subtitle}
                </Typography>
                <NextMuiLink href={`mailto:${content.contacts[0].email}`}>
                  <Button variant='text' color='accent' sx={{ padding: '0' }}>
                    {content.contacts[0].email}
                  </Button>
                </NextMuiLink>
              </Stack>
              {/* Location */}
              <Stack
                justifyContent='flex-start'
                alignItems='flex-start'
                spacing={1}
                sx={{ color: 'dark.light' }}
              >
                <Stack
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    backgroundColor: 'accent2.main'
                  }}
                >
                  <LocationOn
                    sx={{ width: 20, height: 20, color: 'dark.main' }}
                  />
                </Stack>
                <Typography variant='button' component='h3' align='left'>
                  {blok.contactCards[1].title}
                </Typography>
                <Typography variant='subtitle1' component='p' align='left'>
                  {blok.contactCards[1].subtitle}
                </Typography>
                <NextMuiLink
                  href={generateGoogleMapsString(content.contacts[0].address)}
                  target='_blank'
                >
                  <Button variant='text' color='accent' sx={{ padding: '0' }}>
                    {content.contacts[0].address}
                  </Button>
                </NextMuiLink>
              </Stack>
              {/* Phone */}
              <Stack
                justifyContent='flex-start'
                alignItems='flex-start'
                spacing={1}
                sx={{ color: 'dark.light' }}
              >
                <Stack
                  justifyContent='center'
                  alignItems='center'
                  sx={{
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    backgroundColor: 'accent2.main'
                  }}
                >
                  <Phone sx={{ width: 20, height: 20, color: 'dark.main' }} />
                </Stack>
                <Typography variant='button' component='h3' align='left'>
                  {blok.contactCards[2].title}
                </Typography>
                <Typography variant='subtitle1' component='p' align='left'>
                  {blok.contactCards[2].subtitle}
                </Typography>
                <NextMuiLink href={`tel:${content.contacts[0].phone}`}>
                  <Button variant='text' color='accent' sx={{ padding: '0' }}>
                    {content.contacts[0].phone}
                  </Button>
                </NextMuiLink>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  )
}
