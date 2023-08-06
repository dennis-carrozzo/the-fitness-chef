import { useState } from 'react'
import { storyblokEditable, StoryblokComponent } from '@storyblok/react'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import NextMuiLink from '@/components/NextMuiLink'
import SocialLinkButton from '@/components/SocialLinkButton'

/* The code is defining a React functional component called "Header". This component is responsible for
rendering a navigation bar with a drawer menu. */
export default function Header ({ blok }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState)
  }

  // Drawer navigation
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        height: '100vh',
        backgroundColor: 'dark.main',
        textAlign: 'center'
      }}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={{ position: 'relative', paddingBlock: 2 }}
      >
        <CloseIcon sx={{ position: 'absolute', right: 20 }} />
        <Stack component={NextMuiLink} href='/' sx={{ textDecoration: 'none' }}>
          <Typography variant='h5' component='h1' sx={{ color: 'light.main' }}>
            The Fitness Chef
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      {/* Navigation links */}
      <List sx={{ marginBlock: 5 }}>
        {blok?.HeaderMenu?.map(nestedBlok => (
          <ListItem key={nestedBlok._uid} sx={{ textAlign: 'center' }}>
            <ListItemText
              primary={
                <Button variant='text'>
                  <StoryblokComponent
                    blok={nestedBlok}
                    sx={{ color: 'light.main', textDecoration: 'none' }}
                  />
                </Button>
              }
            />
          </ListItem>
        ))}
        {/* Primary CTA */}
        {!!blok?.deliverooLink?.cached_url && (
          <ListItem sx={{ textAlign: 'center' }}>
            <ListItemText
              primary={
                <NextMuiLink
                  href={blok?.deliverooLink?.cached_url}
                  target='_blank'
                >
                  <Button variant='contained' sx={{ position: 'relative' }}>
                    Order Now
                    <Image
                      src='/deliveroo.svg'
                      alt='deliveroo icon'
                      width='20'
                      height='20'
                      style={{ marginLeft: 4 }}
                    />
                  </Button>
                </NextMuiLink>
              }
            />
          </ListItem>
        )}
      </List>
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
    </Box>
  )

  return (
    <Box
      sx={{
        position: 'sticky',
        zIndex: 20,
        width: 1,
        display: 'flex'
      }}
      {...storyblokEditable(blok)}
    >
      <AppBar
        component='nav'
        sx={{ width: 1, backgroundColor: 'dark.main', boxShadow: 'none' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 'xl',
            paddingInline: { sm: 2, lg: 10 }
          }}
        >
          <NextMuiLink
            href='/'
            sx={{
              display: {
                display: 'flex',
                direction: 'row',
                textDecoration: 'none'
              }
            }}
          >
            <Typography
              variant='h6'
              component='h1'
              sx={{
                width: 'fit-content',
                display: 'inline',
                color: 'light.main'
              }}
            >
              The Fitness Chef
            </Typography>
          </NextMuiLink>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              ml: 'auto',
              display: { md: 'none' },
              color: 'light.main'
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Navigation */}
          <Stack
            spacing={3}
            direction='row'
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {/* Website links */}
            {blok?.HeaderMenu?.map(nestedBlok => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
            {/* Primary CTA */}
            {!!blok?.deliverooLink?.cached_url && (
              <NextMuiLink
                href={blok?.deliverooLink?.cached_url}
                target='_blank'
              >
                <Button variant='contained' sx={{ position: 'relative' }}>
                  Order Now
                  <Image
                    src='/deliveroo.svg'
                    alt='deliveroo icon'
                    width='20'
                    height='20'
                    style={{ marginLeft: 4 }}
                  />
                </Button>
              </NextMuiLink>
            )}
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
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          anchor='right'
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '100%'
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}
