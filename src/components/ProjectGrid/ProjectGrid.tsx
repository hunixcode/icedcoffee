import { useEffect, useState } from "react";
import * as motion from 'motion/react-client'

import './ProjectGrid.css'


interface Repository {
    name: string;
    description: string | null;
    stars: number;
}

export default function ProjectCard() {
    const [repos, setRepos] = useState<Repository[]>([]);

    useEffect(() => {
        const loadRepos = async () => {
            try {
                const data = await getRepositories();
                setRepos(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadRepos();
    }, []);

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: 0.03
            }}
            style={{
                display: "flex",
                flexDirection: "column",
                width: "650px",
                marginTop: "100px",
                gap: "1rem"
            }}
        >
            {repos.map((repo) => (
                <div className="project-container" key={repo.name}>
                    <h2>{repo.name}</h2>
                    <p>{repo.description}</p>
                    <p>{repo.stars}</p>
                </div>
            ))}
        </motion.div>
    );
}

async function getRepositories(): Promise<Repository[]> {
    const response = await fetch("https://api.github.com/users/hunixcode/repos");

    if (!response.ok) {
        throw new Error("Impossible de récupérer les repositories.");
    }

    const repos = await response.json();

    return repos.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
    }));
}