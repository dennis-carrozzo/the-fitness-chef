import { useEffect, useRef } from 'react'
import { storyblokEditable } from '@storyblok/react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import anime from 'animejs'
import { useInView } from 'react-intersection-observer'
import theme from '@/theme'

export default function ImagesGrid ({ blok }) {
  const [scrollRef, inView] = useInView({
    threshold: 0.5
  })
  const imageRef = useRef()

  useEffect(() => {
    if (inView) {
      anime.timeline().add({
        targets: [...imageRef.current.children],
        delay: anime.stagger(300),
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
        paddingBlock: { xs: 6, md: 15 }
      }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          justifyContent='flex-start'
          alignItems='center'
          spacing={5}
          ref={imageRef}
        >
          {!!blok.images[0] &&
            blok.images.map(image => (
              <Stack
                key={image.id}
                component={Grid}
                justifyContent='center'
                alignItems='center'
                item
                xs={12}
                sm={4}
                sx={{ opacity: 0, position: 'relative', top: -20 }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: 10,
                    height: { xs: 275, sm: 200, lg: 350 },
                    width: { xs: 275, sm: 200, lg: 350 }
                  }}
                >
                  <Image
                    src={image.filename}
                    alt={image.alt}
                    fill
                    sizes={`${
                      theme.breakpoints.down('sm').split(' ')[1]
                    } 90vw,${theme.breakpoints.up('sm').split(' ')[1]} 25vw`}
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Stack>
            ))}
        </Grid>
      </Container>
    </Stack>
  )
}
