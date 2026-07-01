import * as motion from "motion/react-client"
import { Github, Linkedin, Coffee, MailOpen } from "@boxicons/react"

import './styles/Socials.css'

export default function Socials(){
    return (
        <div className="socials">
            <motion.img initial={{opacity: 0, y: 50}} animate={{opacity:1, y: 0}} transition={{delay:0.13, ease: "easeOut"}} 
            src="/coffee.png" alt="iced coffee image" className="coffee" />
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
                    <a href="https://github.com/hunixcode" target="_blank"><Github pack="basic" size="md"/></a>
                    <a href="https://linkedin.com/hauani" target="_blank"><Linkedin pack="basic" size="md"/></a>
                    <a href="https://buymeacoffee.com/hauani" target="_blank"><Coffee pack="basic" size="md"/></a>
                    <a href="/resume-fr.pdf" target="_blank"><MailOpen pack="basic" size="md"/></a>
                </div>
                <button className="donate">Buy Me A Coffee</button>
            </motion.div>
        </div>
    )
}