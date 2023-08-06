import { useContext, useEffect, useRef } from 'react'
import { storyblokEditable } from '@storyblok/react'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import configContext from '@/context/config'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import NextMuiLink from '@/components/NextMuiLink'

// TODO: move delivery providers to list in config to make it iterable
export default function ContentSectionWithOrderCTA ({ blok }) {
  const { content } = useContext(configContext)
  const [scrollRef, inView] = useInView({
    threshold: 0.5
  })
  const textRef = useRef()

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
      {...storyblokEditable(blok)}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'dark.light', paddingBlock: 6 }}
    >
      <Container maxWidth='md'>
        <Stack
          ref={textRef}
          sx={{
            '& > *': {
              position: 'relative',
              opacity: 0,
              top: -100
            }
          }}
          justifyContent='center'
          alignItems='center'
          spacing={4}
        >
          <Typography variant='overline' component='p' align='center'>
            {blok.tagline}
          </Typography>
          <Typography variant='h4' component='h2' align='center'>
            {blok.title}
          </Typography>
          <Typography
            variant='subtitle1'
            component='p'
            align='center'
            sx={{ maxWidth: 'sm' }}
          >
            {blok.subtitle}
          </Typography>
          {/* Links */}
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
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
        </Stack>
      </Container>
    </Stack>
  )
}
