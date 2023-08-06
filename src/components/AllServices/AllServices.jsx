import { useState, useEffect } from 'react'
import { storyblokEditable, getStoryblokApi } from '@storyblok/react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ContentSection2 from '@/components/ContentSection2'

/* The code is defining a React functional component called `AllServices`. This component is
responsible for displaying services fetched from the Storyblok API. */
export default function AllServices ({ blok }) {
  const [services, setServices] = useState([])

  // fetching all Services and categories on mount
  useEffect(() => {
    const getServices = async () => {
      // fetching Services
      const storyblokApi = getStoryblokApi()
      const { data } = await storyblokApi.get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'services/',
        is_startpage: false
      })
      // storing Services in state
      setServices(prev => data.stories.map(article => article))
    }
    getServices()
  }, [])

  return (
    // Background color container
    <Stack
      {...storyblokEditable(blok)}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'dark.light' }}
    >
      {/* Width container */}
      <Container
        maxWidth='lg'
        sx={{
          position: 'relative',
          width: 1
        }}
      >
        <Stack justifyContent='center' alignItems='center' spacing={2}>
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
        </Stack>
        <Stack
          justifyContent='center'
          alignItems='center'
          spacing={{ xs: 5, sm: 8 }}
          sx={{ paddingBlock: 5 }}
        >
          {!!services[0] &&
            services.map(({ content, ...rest }, i) => {
              const blok = {
                title: content.name,
                description: content.description,
                image: content.image,
                variant: i % 2 !== 0 ? 'variant1' : 'variant2',
                roundedBorders: true
              }
              return <ContentSection2 blok={blok} key={rest.uuid} />
            })}
        </Stack>
      </Container>
    </Stack>
  )
}
