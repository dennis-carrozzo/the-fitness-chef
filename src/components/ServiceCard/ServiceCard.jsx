import Image from 'next/image'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import NextMuiLink from '@/components/NextMuiLink'
import theme from '@/theme'

export default function ServiceCard ({ service }) {
  return (
    <Paper
      component={NextMuiLink}
      href='/services'
      sx={{
        transition: 'background-color 0.5s ease',
        borderRadius: 10,
        width: 1,
        maxWidth: 'sm',
        backgroundColor: 'light.main',
        paddingBlock: 5,
        paddingInline: 3,
        textDecoration: 'none',
        '&:hover': {
          backgroundColor: 'accent2.light'
        }
      }}
    >
      <Stack justifyContent='center' alignItems='center' spacing={3}>
        <Box
          sx={{
            overflow: 'hidden',
            position: 'relative',
            borderRadius: 10,
            width: 1,
            height: 200,
            minWidth: 200
          }}
        >
          <Image
            src={service.image.filename}
            alt={service.image.alt}
            fill
            sizes={`${theme.breakpoints.down('sm').split(' ')[1]} 90vw,${
              theme.breakpoints.up('sm').split(' ')[1]
            } 25vw`}
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Typography
          variant='h6'
          component='h3'
          align='center'
          color='text.dark'
        >
          {service.name}
        </Typography>
        <Typography
          variant='body2'
          component='h3'
          align='center'
          color='text.darksecondary'
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            height: 80,
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {service.snippet}
        </Typography>
      </Stack>
    </Paper>
  )
}
