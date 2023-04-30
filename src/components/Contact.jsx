import React from 'react'
import { ReactSVG } from 'react-svg'

const contactData = [
    {
        id: 1,
        title: 'Email',
        link: 'mailto:korkmazosmanekrem@gmail.com',
        logo: "/imgs/email.svg"
    },
    {
        id: 2,
        title: 'Github',
        link: 'https://github.com/OsmanEkremKorkmaz',
        logo: "/imgs/github.svg"
    },
    {
        id: 3,
        title: 'Linkedin',
        link: 'https://www.linkedin.com/in/osman-ekrem/',
        logo: "/imgs/linkedin.svg"
    },
    {
        id: 4,
        title: 'Hackerrank',
        link: 'https://www.hackerrank.com/osmanekrem',
        logo: "/imgs/hackerrank.svg"
    },
    {
        id: 5,
        title: 'instagram',
        link: 'https://www.instagram.com/osmanekrem_/',
        logo: "/imgs/instagram.svg"
    }
]

function Contact() {
  return (
    <div className='contact'>
        {contactData.map(item => (
            <a href={item.link} className='contact-item' key={item.id}>
                <ReactSVG src={item.logo} />
            </a>
        ))}
    </div>
  )
}

export default Contact