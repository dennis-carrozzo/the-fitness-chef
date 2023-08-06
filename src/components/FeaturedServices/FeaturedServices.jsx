import { useEffect, useRef } from 'react'
import { storyblokEditable } from '@storyblok/react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ServiceCard from '@/components/ServiceCard'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import useMediaQuery from '@mui/material/useMediaQuery'
import theme from '@/theme'

export default function FeaturedServices ({ blok }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [scrollRef, inView] = useInView({
    threshold: isSmallScreen ? 0.2 : 0.5
  })
  const textRef = useRef()
  const cardsRef = useRef()

  useEffect(() => {
    if (inView) {
      anime
        .timeline()
        .add({
          targets: [...textRef.current.children],
          delay: anime.stagger(200),
          opacity: 1,
          top: 0,
          easing: 'easeOutExpo'
        })
        .add({
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
      {...storyblokEditable(blok)}
      justifyContent='center'
      alignItems='center'
      sx={{
        backgroundColor: 'dark.light',
        paddingBlock: 6,
        color: 'light.main'
      }}
    >
      <Stack
        ref={textRef}
        component={Container}
        maxWidth='md'
        justifyContent='center'
        alignItems='center'
        spacing={5}
        sx={{
          '& > *': {
            position: 'relative',
            opacity: 0,
            top: -100
          }
        }}
      >
        <Typography
          variant='h3'
          component='h2'
          align='center'
          sx={{ maxWidth: 'md' }}
        >
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
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent='space-between'
          alignItems='center'
          spacing={3}
          ref={cardsRef}
          sx={{
            '& > *': {
              position: 'relative',
              opacity: 0,
              top: -30
            }
          }}
        >
          {!!blok.services[0] &&
            blok.services.map(service => {
              service.content.slug = service.full_slug
              return (
                <ServiceCard service={service.content} key={service.uuid} />
              )
            })}
        </Stack>
      </Stack>
    </Stack>
  )
}
