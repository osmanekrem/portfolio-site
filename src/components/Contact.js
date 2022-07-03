import React from 'react'

const contactData = [
    {
        id: 1,
        title: 'Email',
        link: 'mailto:korkmazosmanekrem@gmail.com',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png'
    },
    {
        id: 2,
        title: 'Github',
        link: 'https://github.com/OsmanEkremKorkmaz',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png'
    },
    {
        id: 3,
        title: 'Hackerrank',
        link: 'https://www.hackerrank.com/osmanekrem',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/HackerRank_Icon-1000px.png/240px-HackerRank_Icon-1000px.png'
    },
    {
        id: 4,
        title: 'instagram',
        link: 'https://www.instagram.com/korkmazosmanekrem/',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/2048px-Instagram.svg.png'
    }
]

function Contact() {
  return (
    <div className='contact'>
        <div className='contact-header'>
            <h1>Contact</h1>

            </div>
        <div className='contact-content'>
            {contactData.map(item => (
                <a href={item.link} className='contact-item' key={item.id}>
                  <img src={item.logo} alt={item.title} />
                </a>
            ))}
          </div>
    </div>
  )
}

export default Contact