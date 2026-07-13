import * as motion from 'motion/react-client'
import { useState } from 'react'

import ProjectGrid from '../components/ProjectGrid/ProjectGrid'
import BuyIt from '../components/BuyIt/BuyIt'
import ContactMe from '../components/ContactMe/ContactMe'

import './styles/Projects.css'

export default function Projects() {
    const [isOpen, setOpen] = useState(true);
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: 0.03,
                ease: "easeOut"
            }}
            className="projects-page"
        >
            <ProjectGrid />
            <BuyIt/>
            {isOpen && <ContactMe setOpen={setOpen} />}
        </motion.div>
    )
}