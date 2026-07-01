import { motion } from "motion/react";
import "./styles/FeaturedProject.css"

export default function FeaturedProject(){
    return (
        <motion.div 
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        transition={{
            ease:"easeOut",
            duration:0.4,
            delay:0.2
        }}
        className="featured-project"
        >
            <p className="larp">Am I Larping ?</p>
            <button onClick={() => window
            .open("https://github.com/hunixcode/lattelab", "_blank", "noopener,noreferrer")}>
                SOC Home Lab
            </button>
        </motion.div>
    )
}