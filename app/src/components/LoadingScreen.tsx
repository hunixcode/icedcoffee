import { FourSquare } from "react-loading-indicators";
import * as motion from "motion/react-client"


export default function LoadingScreen(){
    return (
        <div style={{
            display: "flex",
            flexDirection:"column",
            height: "80vh",
            alignItems:"center",
            justifyContent:"center",
            fontFamily:"Archivo",
            fontSize:"15px"
        }}>
            <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{
                duration:0.8,
                ease:"easeOut"
            }}>
                <FourSquare color="#000000" size="large" text="" textColor="#ffffff" />
            </motion.div>
            <motion.h1
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{
                delay: 0.1,
                duration:0.8,
                ease:"easeOut"
            }}>hunixcode</motion.h1>
        </div>
    )
}