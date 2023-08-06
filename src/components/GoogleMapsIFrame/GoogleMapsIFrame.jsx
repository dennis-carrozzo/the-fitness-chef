import { useCallback, useContext } from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import configContext from '@/context/config'

export default function GoogleMapsIFrame ({ blok }) {
  const { content } = useContext(configContext)
  const generateGoogleMapsString = useCallback(
    address =>
      'https://www.google.com/maps?q=' +
      address.replace(' ', '+') +
      '&output=embed',
    []
  )
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'dark.main', paddingBlock: 10 }}
    >
      <Container maxWidth='lg' sx={{ height: '100vh' }}>
        {content?.contacts && content.contacts[0]?.address && (
          <iframe
            src={generateGoogleMapsString(content.contacts[0].address)}
            width='100%'
            height='100%'
            frameBorder='0'
            style={{ border: 0 }}
            allowFullScreen
          />
        )}
      </Container>
    </Stack>
  )
}
