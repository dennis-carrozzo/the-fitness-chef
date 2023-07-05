import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '../NextMuiLink'

// TODO: move content to cms
/**
 * The above function is a React component that renders a footer
 */
export default function Footer () {
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
      <Typography
        variant='h6'
        align='center'
        sx={{
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderTopColor: 'light.main'
        }}
      >
        The Fitness Chef
      </Typography>
      <Typography variant='subtitle2' align='center' component='p'>
        Writer, Mother, Life Lover
      </Typography>
      <Typography
        variant='body2'
        align='center'
        sx={{ position: 'absolute', bottom: 10 }}
      >
        {'Copyright © '}
        <NextMuiLink color='inherit' to='/'>
          The Fitness Chef
        </NextMuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Stack>
  )
}
