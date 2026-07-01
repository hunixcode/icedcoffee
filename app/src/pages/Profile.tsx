import './styles/Profile.css'
import * as motion from 'motion/react-client'
import Socials from '../components/Socials'
import GithubStats from '../components/GithubStats'

export default function Profile(){
    return (
        <section className="profile-wrapper">
            <motion.div className="profile"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    delay:0.05,
                    duration: 0.4,
                    ease: "easeOut"
                }}
            >
                <div className="row1">
                    <img src="https://avatars.githubusercontent.com/u/211940501?v=4" alt="github logo of hunixcode" className="photo" style={{width: "200px",
                    borderRadius: "5px"}}/>
                    <p className="photo" style={{maxWidth:"500px",fontFamily:"JetBrains mono"}}>
                        Hey! My name is Dylan also known as Hauani or hunix,
                        I'm a Senior Computer Science student living in French Polynesia.
                        I am willing to specialize in CyberSecurity but I have experience in web development. <br/><br/>
                        I build stuff, from simple programming projects to advanced SOC home labs, I simply never stop learning.
                    </p>
                </div>
                <Socials/>
                <GithubStats/>
            </motion.div>
        </section>
    )
}