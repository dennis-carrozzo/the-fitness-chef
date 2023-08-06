import { storyblokEditable } from '@storyblok/react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ContactForm from '@/components/ContactForm'

export default function NewsLetterFormSection ({ blok }) {
  return (
    <Stack
      {...storyblokEditable(blok)}
      justifyContent='center'
      alignItems='center'
      sx={{
        position: 'relative',
        zIndex: 1,
        minHeight: '90vh',
        backgroundColor: 'dark.light',
        paddingBlock: { xs: 6, sm: 10 }
      }}
    >
      <Container maxWidth='md'>
        <Grid
          container
          justifyContent='flex-start'
          alignItems='center'
          spacing={5}
        >
          <Stack component={Grid} spacing={3} item xs={12} sm={6}>
            <Typography variant='h4' component='h3'>
              {blok.title}
            </Typography>
            <Typography variant='subtitle2' component='p'>
              {blok.subtitle}
            </Typography>
          </Stack>
          <Stack component={Grid} spacing={3} item xs={12} sm={6}>
            <ContactForm />
          </Stack>
        </Grid>
      </Container>
    </Stack>
  )
}
