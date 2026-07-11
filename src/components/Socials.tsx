import * as motion from "motion/react-client"
import { Github, Linkedin, Coffee, MailOpen, SwordAlt } from "@boxicons/react"

import './styles/Socials.css'

export default function Socials(){
    const base = import.meta.env.BASE_URL;
    return (
        <div className="socials">
            <motion.img initial={{opacity: 0, y: 50}} animate={{opacity:1, y: 0}} transition={{delay:0.13, ease: "easeOut"}} 
            src={`${base}coffee.png`} alt="iced coffee image" className="coffee" />
            <motion.div 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.1,
                    duration: 0.4,
                    ease: "easeOut"
                }}
                className="list"
            >
                <div className="icons">
                    <a href="https://github.com/hunixcode" target="_blank"><Github pack="basic" size="md" className="boxic"/></a>
                    <a href="https://github.com/hunixcode" target="_blank"><Linkedin pack="basic" size="md" className="boxic"/></a>
                    <a href="https://buymeacoffee.com/hunixcode" target="_blank"><Coffee pack="basic" size="md" className="boxic"/></a>
                    <a href="https://tryhackme.com/p/hunixcode" target="_blank"><SwordAlt pack="basic" size="md" className="boxic"/></a>
                    <a href={`${base}resume-fr.pdf`} target="_blank"><MailOpen pack="basic" size="md" className="boxic"/></a>
                </div>
                <button className="donate" onClick={() => window
            .open("https://buymeacoffee.com/hunixcode", "_blank", "noopener,noreferrer")}>Buy Me A Coffee</button>
            </motion.div>
        </div>
    )
}