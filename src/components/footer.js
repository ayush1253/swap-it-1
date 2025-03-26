import React from 'react'
import { SiteConfig } from '@/config/site'
import Image from 'next/image'
import navIcon1 from "./assets/nav-icon1.svg";
import navIcon2 from "./assets/nav-icon2.svg";
import navIcon3 from "./assets/nav-icon3.svg";
import navIcon4 from "./assets/nav-icon4.svg";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-wrap justify-center items-center py-12 bg-">
        <section className="text-center">
          <div className="flex justify-center mt-4">
            <a href="https://linkedin.com/" target='_blank' className="relative w-14 h-14 bg-black	hover:bg-gray-600  inline-flex rounded-full mr-2 items-center justify-center">
              <Image src={navIcon1} alt="LinkedIn Icon" className="w-2/5 z-10" />
            </a>
            <a href="https://github.com/" target='_blank' className="relative w-14 h-14 bg-black hover:bg-gray-600 inline-flex rounded-full mr-2 items-center justify-center">
              <Image src={navIcon2} alt="GitHub Icon" className="w-2/5 z-10" />
            </a>
            <a href="https://twitter.com/" target="_blank" className="relative w-14 h-14 bg-black  hover:bg-gray-800 inline-flex rounded-full mr-2 items-center justify-center">
              <Image src={navIcon4} alt="Twitter Icon" className="w-2/5 z-10" />
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-500 font-normal">© SWAP-IT 2024. All Rights Reserved</p>
        </section>
      </footer>
    </>

  )
}

export default Footer