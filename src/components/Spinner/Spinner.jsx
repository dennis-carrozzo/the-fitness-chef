import Box from '@mui/material/Box'

export default function Spinner () {
  return (
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
        width: 80,
        height: 80,
        '& div': {
          position: 'absolute',
          border: '4px solid #fff',
          opacity: 1,
          bordeRadius: '50%',
          animation: 'lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite'
        },
        '& div:nth-child(2)': {
          animatioDdelay: '-0.5s'
        },
        '@keyframes lds-ripple': {
          '0%': {
            top: 36,
            left: 36,
            width: 0,
            height: 0,
            opacity: 0
          },
          '4.9%': {
            top: 36,
            left: 36,
            width: 0,
            height: 0,
            opacity: 0
          },
          '5%': {
            top: 36,
            left: 36,
            width: 0,
            height: 0,
            opacity: 1
          },
          '100%': {
            top: 0,
            left: 0,
            width: 72,
            height: 72,
            opacity: 0
          }
        }
      }}
    >
      <div />
      <div />
    </Box>
  )
}
