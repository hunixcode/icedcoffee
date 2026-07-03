import { useEffect, useState } from "react";
import { Folder, User } from "@boxicons/react"
import * as motion from "motion/react-client"
import { OrbitProgress } from "react-loading-indicators";

import './styles/GithubStats.css'



export default function GithubStats(){

    const userData = useUserData();

    if (!userData){
        return <OrbitProgress dense color="#000000" size="medium" text="" textColor="" />
    }
    return (
        <motion.section className="github-stats"
        initial={{opacity: 0, y: 50}}
        animate={{opacity: 1, y: 0}}
        transition={{
            delay: 0.15,
            duration: 0.4,
            ease: "easeOut"
        }}>
            <div className="repo-count" style={{display:"flex",alignItems:"center"}}>
                <Folder/>{userData.public_repos} public repositories
            </div>
            <div className="github-followers" style={{display:"flex",alignItems:"center"}}>
                <User/>{userData.followers} followers
            </div>
            <div className="github-stars" style={{display:"flex",alignItems:"center"}}>
                <User/>{userData.following} following 
            </div>
        </motion.section>
    )
}

function useUserData() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/hunixcode")
      .then((res) => res.json())
      .then((data) => setUserData(data))
  }, []);

  return userData;
}