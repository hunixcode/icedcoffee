import './styles/Header.css'
import ScrambledText from './ScrambledText'
import * as motion from 'motion/react-client'

export default function Header(){
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
                    <a href="/">HOME</a>
                    <a href="/profile">PROFILE</a>
                    <a href="/projects">PROJECTS</a>
                    <a href="/contact">GET IN TOUCH</a>
                </div>
            </section>
        </motion.div>
    )
}