import './styles/Header.css'
import ScrambledText from './ScrambledText'
import * as motion from 'motion/react-client'

import Hamburger from 'hamburger-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'

export default function Header(){
    const [isOpen, setOpen] = useState(false);
    return (
        <motion.div
            initial={{y: 50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{
                duration: 0.4,
                ease: "easeOut"
            }}
            className='container'
        >
            <section className="header">
                <ScrambledText>hunix</ScrambledText>
                <div className="links">
                    <Link to="/">HOME</Link>
                    <Link to="/profile">PROFILE</Link>
                    <Link to="/projects">PROJECTS</Link>
                    <Link to="/contact">GET IN TOUCH</Link>
                </div>
                <div className="hamburger">
                    <Hamburger toggled={isOpen} toggle={setOpen} size={20}/>
                </div>
            </section>
            {isOpen && <MobileMenu setOpen={setOpen} />}
        </motion.div>
    )
}