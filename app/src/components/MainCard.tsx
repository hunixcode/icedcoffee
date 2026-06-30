import './styles/MainCard.css'
import { Github, Linkedin, Coffee, MailOpen } from '@boxicons/react'


export default function MainCard(){
    return (
        <>
            <div className="canva">
                <div className="socials">
                    <img src="/coffee.png" alt="iced coffee image" className="coffee" />
                    <div className="list">
                        <div className="icons">
                            <a href="https://github.com/hunixcode" target="_blank"><Github pack="basic" size="md"/></a>
                            <a href="https://linkedin.com/hauani" target="_blank"><Linkedin pack="basic" size="md"/></a>
                            <a href="https://buymeacoffee.com/hauani" target="_blank"><Coffee pack="basic" size="md"/></a>
                            <a href="/resume-fr.pdf" target="_blank"><MailOpen pack="basic" size="md"/></a>
                        </div>
                        <button className="donate">Buy Me A Coffee</button>
                    </div>
                </div>
                <div className="card">
                    <p className="description">
                        The name's Hauani, I am a senior Computer Science Student. Obsessed with Cybersecurity and Software Engineering.
                        I build stuff, break them and then rebuilds them. Feel free to reach out if you find my person interesting.
                    </p>
                </div>
            </div>
        </>
    )
}