import * as motion from "motion/react-client"
import Hamburger from 'hamburger-react'
import { Link } from 'react-router-dom'
import "./MobileMenu.css"

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
                <Link onClick={() => setOpen(false)} to="/">HOME</Link>
                <Link onClick={() => setOpen(false)} to="/profile">PROFILE</Link>
                <Link onClick={() => setOpen(false)} to="/projects">PROJECTS</Link>
                <Link onClick={() => setOpen(false)} to="/contact">GET IN TOUCH</Link>
            </div>
        </motion.div>
    )
}