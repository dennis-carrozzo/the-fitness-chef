import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '../NextMuiLink'
import SocialLinkButton from '@/components/SocialLinkButton'

/**
 * The above function is a React component that renders a footer
 */
export default function Footer ({ blok }) {
  return (
    <Stack
      component='footer'
      justifyContent='center'
      alignItems='center'
      spacing={1}
      sx={{
        position: 'relative',
        backgroundColor: 'dark.main',
        padding: 6,
        color: 'light.main'
      }}
    >
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={0}
        sx={{ display: 'inline-block' }}
      >
        {!!blok.SocialLinks &&
          !!blok.SocialLinks[0] &&
          blok.SocialLinks.map(link => (
            <SocialLinkButton
              key={link._uid}
              link={link.link.cached_url}
              platform={link.platform}
            />
          ))}
      </Stack>
      <Typography
        variant='h6'
        align='center'
        sx={{
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderTopColor: 'light.main'
        }}
      >
        {blok.FooterContent[0].title}
      </Typography>
      <Typography variant='subtitle2' align='center' component='p'>
        {blok.FooterContent[0].headline}
      </Typography>
      <Typography variant='body2' align='center'>
        {'Copyright © '}
        <NextMuiLink color='inherit' to='/' sx={{ textDecoration: 'none' }}>
          The Fitness Chef
        </NextMuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Stack>
  )
}
