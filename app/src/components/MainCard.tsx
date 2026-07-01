import './styles/MainCard.css'
import * as motion from 'motion/react-client'
import Socials from './Socials'
import ContactMe from './ContactMe'

export default function MainCard(){
    return (
        <div className="canva">
            <Socials/>
            <motion.div 
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    delay: 0.2,
                    duration: 0.4,
                    ease: "easeOut"
                }}
                className="card"
            >
                <p className="description">
                    The name's Hauani, I am a senior Computer Science Student. Obsessed with Cybersecurity and Software Engineering.
                    I build stuff, break them and then rebuilds them. Feel free to reach out if you find my person interesting.
                </p>
            </motion.div>
            <ContactMe/>
        </div>
    )
}