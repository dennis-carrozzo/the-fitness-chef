import { storyblokEditable } from '@storyblok/react'
import Box from '@mui/material/Box'

export default function Spacer ({ blok }) {
  return (
    <Box
      {...storyblokEditable(blok)}
      sx={{
        width: blok.width[0] === '{' ? JSON.parse(blok.width) : blok.width,
        height: blok.height[0] === '{' ? JSON.parse(blok.height) : blok.height,
        backgroundColor: 'dark.light'
      }}
    />
  )
}
