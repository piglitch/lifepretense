import { footerLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

type ColumnProps = {
  title: string;
  links: Array<string>;
}

const FooterColumn = ({ title, links } : 
  ColumnProps) => (
  <div className='footer_column'>
    <h4 className='font-semibold'>{title}</h4>
    <ul className='flex flex-col gap-2 font-normal'>
      {links.map((link) => <Link href='/' key={link}>{link}</Link>)}
    </ul>
  </div>
)
const Footer = () => {
  return (
    <footer className='flexStart footer'>
      <div className='flex flex-col w-full'>
        <div className='flex items-start flex-col'>
          <Image 
            src="/logo-no-background.svg"
            width={115}
            height={38}
            alt='flexible'
          />

          <p className='text-start text-sm font-normal mt-2 max-w-xs'>
          Introducing LifePretense, the authentic social media app. No more staged posts or filters. 
          Embrace your true self, share everyday moments that are incredibly rare, celebrate imperfections, 
          and build genuine connections that mean nothing. 
          LifePretense—keeping it real, always. Join us now!
          </p>
          <div className='mt-10 flex flex-wrap gap-12'>
            <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links}/>
            <div className='flex-1 flex flex-col gap-4'>
              <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
              <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
            </div>
            <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />
            <div className='flex-1 flex flex-col gap-4'>              
              <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
              <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
            </div>
            <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links} />
          </div>
        </div>
      </div>

      <div className='flexBetween footer_copyright'>
        <p>@ 2023 LifePretence. All rights reserved</p>
        <p className='text-gray'>
          <span className='text-black font-semibold'>10,214</span> projects submitted
        </p>
      </div>
    </footer>
  )
}

export default Footer