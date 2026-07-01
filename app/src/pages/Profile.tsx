import './styles/Profile.css'
import * as motion from 'motion/react-client'
import Socials from '../components/Socials'
import GithubStats from '../components/GithubStats'
import FeaturedProject from '../components/FeaturedProject'
import Quote from '../components/Quote'

export default function Profile(){
    return (
        <section className="profile-wrapper">
            <div className="profile">
                <motion.div className="row1" initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{
                    delay:0.05,
                    duration: 0.4,
                    ease: "easeOut"
                }}>
                    <img src="https://avatars.githubusercontent.com/u/211940501?v=4" alt="github logo of hunixcode" className="photo" style={{width: "200px",
                    borderRadius: "5px"}}/>
                    <p className="photo" style={{maxWidth:"500px",fontFamily:"JetBrains mono"}}>
                        Hey! My name is Dylan also known as Hauani or hunix,
                        I'm a Senior Computer Science student living in French Polynesia.
                        I am willing to specialize in CyberSecurity but I have experience in web development. <br/><br/>
                        I build stuff, from simple programming projects to advanced SOC home labs, I simply never stop learning.
                    </p>
                </motion.div>
                <Socials/>
                <Quote/>
                <div style={{display:"flex",width:"100%",gap:"1rem"}}>
                    <GithubStats/>
                    <FeaturedProject/>
                </div>
            </div>
        </section>
    )
}

