import * as motion from "motion/react-client"

import { Link } from "react-router-dom"

import './ContactMe.css'


export default function ContactMe({ setOpen }: { setOpen: (open: boolean) => void }){
    return (
        <motion.section
        initial={{opacity:0, y: 50}}
        animate={{opacity:1, y: 0}}
        transition={{
            duration: 0.4,
            ease:"easeOut",
            delay: 0.17
        }}
        className="contact-me"
        >
            <img src="https://media.tenor.com/ko4tpRh2FTcAAAAj/mr-free-super-tux.gif"/>
            <div className="contact">
                <p>fly away from telemetry with tux and I</p>
                <Link onClick={()=>{setOpen(false)}} to="/contact" className="join">Contact</Link>
            </div>
        </motion.section>
    )
}