import { useContext } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import configContext from '@/context/config'

/* The code is defining a React functional component called "Layout". It renders Header and Footer
components around the Page content */
export default function Layout ({ children, story }) {
  const config = useContext(configContext)

  if (!config) {
    return null
  }

  return (
    <div>
      <Header blok={config?.content} />
      {children}
      <Footer blok={config?.content} />
    </div>
  )
}
