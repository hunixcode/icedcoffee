// Shoutout to my friend for sendin me his project component's page design
// I've only touched the project's details and the color schemes to match my project cards vibe

import { useEffect, useState } from "react";
import * as motion from 'motion/react-client'
import { OrbitProgress } from "react-loading-indicators";

import './ProjectGrid.css'

interface Contributor {
    login: string;
    avatar_url: string;
}

interface ProjectData {
    stars: number;
    html_url: string;
    contributors: Contributor[];
}

interface ProjectDef {
    slug: string;
    title: string;
    description: string;
    coverGradient: string;
}

const PROJECTS: ProjectDef[] = [
    {
        slug: "icedcoffee",
        title: "Iced Coffee",
        description: "The public repository of this website. The whole project was fully hand-made so I can actually learn and understand how React works",
        coverGradient: "linear-gradient(135deg, #2C1810, #4A2C2A)"
    },
    {
        slug: "cortado",
        title: "Cortado",
        description: "A vibe-coded password manager. Its goal is very simple, I made sure the app looked slick and was available on Windows as well as on Linux.",
        coverGradient: "linear-gradient(135deg, #1a1a2e, #16213e)"
    },
    {
        slug: "lattelab",
        title: "LatteLab",
        description: "My personal SOC Home Lab repository to train my cybersecurity skills and document my progress. This project will feature a honeypot, an attacker machine and an open-source dashboard for log monitoring and alert triage. ( Wazuh SIEM )",
        coverGradient: "linear-gradient(135deg, #0f3460, #1a1a2e)"
    }
];

export default function ProjectGrid() {
    const [projectsData, setProjectsData] = useState<Map<string, ProjectData>>(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const fetchAll = async () => {
            const data = new Map<string, ProjectData>();

            for (const project of PROJECTS) {
                try {
                    const [repoRes, contribRes] = await Promise.all([
                        fetch(`https://api.github.com/repos/hunixcode/${project.slug}`),
                        fetch(`https://api.github.com/repos/hunixcode/${project.slug}/contributors`)
                    ]);

                    const repo = await repoRes.json();
                    const contributors = await contribRes.json();

                    if (!cancelled) {
                        data.set(project.slug, {
                            stars: repo.stargazers_count ?? 0,
                            html_url: repo.html_url ?? `https://github.com/hunixcode/${project.slug}`,
                            contributors: Array.isArray(contributors)
                                ? contributors.slice(0, 5).map((c: any) => ({
                                    login: c.login,
                                    avatar_url: c.avatar_url
                                }))
                                : []
                        });
                    }

                } catch {
                    if (!cancelled) {
                        data.set(project.slug, {
                            stars: 0,
                            html_url: `https://github.com/hunixcode/${project.slug}`,
                            contributors: []
                        });
                    }
                }
            }

            if (!cancelled) {
                setProjectsData(data);
                setLoading(false);
            }
        };

        fetchAll();

        return () => { cancelled = true; };
    }, []);

    if (loading) {
        return (
            <div className="projects-loading">
                <OrbitProgress dense color="#000000" size="medium" text="" textColor="" />
            </div>
        );
    }

    return (
        <div className="projects-wrapper">
            <h1 className="projects-heading">/projects</h1>
            <p className="projects-subtitle">Some of the stuff I built</p>

            <div className="projects-list">
                {PROJECTS.map((project, index) => {
                    const data = projectsData.get(project.slug);

                    return (
                        <motion.article
                            key={project.slug}
                            className="blog-post"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: 0.1 * (index + 1)
                            }}
                        >
                            <div
                                className="blog-post-cover"
                                style={{ background: project.coverGradient }}
                            >
                                <span className="blog-post-cover-title">
                                    {project.title}
                                </span>
                            </div>

                            <div className="blog-post-body">
                                <p className="blog-post-description">
                                    {project.description}
                                </p>
                            </div>

                            <div className="blog-post-footer">
                                {data && (
                                    <>
                                        <div className="blog-post-stars">
                                                            &#9733; {data.stars}
                                        </div>

                                        {data.contributors.length > 0 && (
                                            <div className="blog-post-contributors">
                                                {data.contributors.map((c) => (
                                                    <img
                                                        key={c.login}
                                                        className="contributor-avatar"
                                                        src={c.avatar_url}
                                                        alt={c.login}
                                                        title={c.login}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        <a
                                            className="blog-post-link"
                                            href={data.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub &rarr;
                                        </a>
                                    </>
                                )}
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </div>
    );
}
