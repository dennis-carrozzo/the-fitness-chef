import Button from '@mui/material/Button'
import Instagram from '@mui/icons-material/Instagram'
import Twitter from '@mui/icons-material/Twitter'
import NextMuiLink from '@/components/NextMuiLink'

export default function SocialLinkButton ({ link, platform }) {
  let socialPlatformIcon

  switch (platform) {
    case 'instagram':
      socialPlatformIcon = <Instagram />
      break
    case 'twitter':
      socialPlatformIcon = <Twitter />
      break
    default:
      socialPlatformIcon = null
  }

  return (
    <NextMuiLink href={link} target='_blank'>
      <Button variant='text'>{socialPlatformIcon}</Button>
    </NextMuiLink>
  )
}
