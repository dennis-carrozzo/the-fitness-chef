import { storyblokEditable } from '@storyblok/react'
import Variant1 from './Variant1'
// import Text from './Text'
// import Variant3 from './Variant3'

/**
 * The function exports a React component called "Hero" that renders different variants of a hero
 * section based on the value of the "variant" property in the "blok" object.
 */
export default function Hero ({ blok }) {
  switch (blok.variant) {
    // case 'variant3':
    //   return <Variant3 {...storyblokEditable(blok)} blok={blok} />
    // case 'text':
    //   return <Text {...storyblokEditable(blok)} blok={blok} />
    case 'variant1':
    default:
      return <Variant1 {...storyblokEditable(blok)} blok={blok} />
  }
}
