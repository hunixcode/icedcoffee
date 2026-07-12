import * as motion from 'motion/react-client'

import ProjectGrid from '../components/ProjectGrid/ProjectGrid'


export default function Projects(){
    return (
        <motion.div
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        transition={{
            duration: 0.4,
            delay: 0.03,
            ease: "easeOut"
        }}
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',    
        }}>
            <ProjectGrid/>
        </motion.div>
    )
}