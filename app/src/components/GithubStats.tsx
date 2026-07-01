import { useEffect, useState } from "react";

import './styles/GithubStats.css'


export default function GithubStats(){
    return (
        <section className="github-stats">
            
        </section>
    )
}

function repoCount(){
    const [repoCount, setRepoCount] = useState(0);
    useEffect(()=>{
        fetch("https://api.github.com/users/hunixcode")
        .then((res)=> res.json())
        .then((data) => setRepoCount(data.public_repos));
    }, []);
    return repoCount;
}