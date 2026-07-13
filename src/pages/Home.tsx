import { useEffect, useState } from "react"
import * as motion from 'motion/react-client'

import LoadingScreen from "../components/LoadingScreen"
import Socials from "../components/Socials/Socials";
import ContactMe from "../components/ContactMe/ContactMe";
import BuyIt from "../components/BuyIt/BuyIt";

import './styles/Home.css'


export default function Hero(){
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    const [isOpen, setOpen] = useState(true);
        return loading ? <LoadingScreen/> : (
            <div className="hero">
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
                            The name's hunix, I am a senior Computer Science Student. Obsessed with Cybersecurity and Software Engineering.
                            I build stuff, break them and then rebuilds them. Feel free to reach out if you find my person interesting.
                        </p>
                    </motion.div>
                    {isOpen && <ContactMe setOpen={setOpen} />}
                    <BuyIt/>
                </div>
            </div>
        )
}