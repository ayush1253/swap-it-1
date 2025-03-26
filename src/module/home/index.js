import React from 'react'
import HeroComponent from './HeroComponent'
import { SiteHeader } from '@/components/Nav/site-header'

const Home = () => {
  return (
    <>
      <SiteHeader />
      <HeroComponent />
    </>
  )
}

export default Home