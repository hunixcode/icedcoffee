import * as motion from "motion/react-client"
import Hamburger from 'hamburger-react'
import "./styles/MobileMenu.css"

export default function MobileMenu({ setOpen }: { setOpen: (open: boolean) => void }){
    return (
        <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className="mobile-menu-header">
                <span className="mobile-menu-title">Navigation</span>
                <Hamburger toggled={true} toggle={() => setOpen(false)} size={20}/>
            </div>
            <div className="mobile-menu-links">
                <a onClick={() => setOpen(false)} href="/">HOME</a>
                <a onClick={() => setOpen(false)} href="/profile">PROFILE</a>
                <a onClick={() => setOpen(false)} href="/projects">PROJECTS</a>
                <a onClick={() => setOpen(false)} href="/contact">GET IN TOUCH</a>
            </div>
        </motion.div>
    )
}