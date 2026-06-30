import './styles/Header.css'

export default function Header(){
    return (
        <>
            <div className="container">
                <section className="header">
                <h1>hunix</h1>
                <div className="links">
                    <a href="/">HOME</a>
                    <a href="/profile">PROFILE</a>
                    <a href="/projects">PROJECTS</a>
                    <a href="/contact">GET IN TOUCH</a>
                </div>
                </section>
            </div>
        </>
    )
}