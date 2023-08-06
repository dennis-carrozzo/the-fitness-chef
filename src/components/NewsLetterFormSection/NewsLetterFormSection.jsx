import { useEffect, useRef } from 'react'
import { storyblokEditable } from '@storyblok/react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Rellax from 'rellax'
import { useInView } from 'react-intersection-observer'
import NewsLetterForm from '@/components/NewsLetterForm'

export default function NewsLetterFormSection ({ blok }) {
  const [scrollRef, inView] = useInView()
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

  return (
    <Stack
      ref={scrollRef}
      {...storyblokEditable(blok)}
      justifyContent='center'
      alignItems='center'
      sx={{
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        minHeight: '90vh',
        backgroundColor: 'dark.light',
        paddingBlock: { xs: 6, sm: 10 }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          height: 1,
          width: { xs: 1, sm: 0.6 },
          background:
            'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 46%, rgba(0,212,255,0) 100%)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          height: { xs: '50%', sm: '200%', md: '150%' },
          width: 1
        }}
      >
        <Image
          ref={imageRef}
          data-rellax-speed='-3'
          data-rellax-percentage='1'
          src={blok.image.filename}
          alt={blok.image.alt}
          fill
          sizes='100vw'
          style={{
            objectFit: 'cover',
            zIndex: -2
          }}
        />
      </Box>
      <Container maxWidth='md'>
        <Grid container justifyContent='flex-start' alignItems='center'>
          <Stack component={Grid} spacing={3} item xs={12} sm={5}>
            <Typography variant='h4' component='h3'>
              {blok.title}
            </Typography>
            <Typography variant='subtitle2' component='p'>
              {blok.subtitle}
            </Typography>
            <NewsLetterForm modalContent={blok.modalContent[0]} />
          </Stack>
        </Grid>
      </Container>
    </Stack>
  )
}
