import { useState } from 'react'
import { storyblokEditable } from '@storyblok/react'
import Collapse from '@mui/material/Collapse'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
export default function FAQSection ({ blok }) {
  return (
    <Stack
      {...storyblokEditable(blok)}
      justifyContent='center'
      alignItems='center'
      sx={{ backgroundColor: 'accent2.light', paddingBlock: 10 }}
    >
      <Container maxWidth='md'>
        <Stack
          justifyContent='center'
          alignItems='center'
          spacing={3}
          sx={{ marginBottom: 5 }}
        >
          <Typography variant='h3' component='h3'>
            {blok.title}
          </Typography>
          <Typography variant='subtitle1' component='p'>
            {blok.subtitle}
          </Typography>
        </Stack>
        {blok.FAQs.map((faq, i, arr) => {
          return (
            <Stack sx={{ backgroundColor: 'light.main' }} key={faq._uid}>
              <Faq q={faq.question} a={faq.answer} />
              {i !== arr.length - 1 && <Divider light />}
            </Stack>
          )
        })}
      </Container>
    </Stack>
  )
}

function Faq ({ q, a }) {
  const [collapsed, setCollapsed] = useState(false)

  const handleChange = () => {
    setCollapsed(prev => !prev)
  }

  return (
    <Stack
      sx={{
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        backgroundColor: 'light.main',
        paddingBlock: 3,
        paddingInline: { xs: 2, sm: 5 },
        color: 'dark.light',
        ':hover': {
          backgroundColor: collapsed ? 'light.main' : 'rgba(0,0,0,0.1)'
        }
      }}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={1}
        aria-label='collapse answer'
        title='collapse answer'
        onClick={handleChange}
        role='button'
      >
        <Typography variant='h6' component='p'>
          {q}
        </Typography>
        <KeyboardArrowDownIcon
          width={20}
          height={20}
          sx={{
            transition: 'transform 0.5s ease',
            transform: collapsed ? 'rotate(-90deg)' : 'rotate(0)'
          }}
        />
      </Stack>
      <Collapse in={collapsed} collapsedSize={0} onClick={handleChange}>
        <Typography variant='body1' component='p' sx={{ paddingTop: 3 }}>
          {a}
        </Typography>
      </Collapse>
    </Stack>
  )
}
