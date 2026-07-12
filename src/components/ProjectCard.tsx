import { useEffect, useState } from "react";

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
        <>
            {repos.map((repo) => (
                <div className="project-container" key={repo.name}>
                    <h2>{repo.name}</h2>
                    <p>{repo.description}</p>
                    <p>⭐ {repo.stars}</p>
                </div>
            ))}
        </>
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