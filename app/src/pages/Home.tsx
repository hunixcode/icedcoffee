import { useEffect, useState } from "react"
import LoadingScreen from "../components/LoadingScreen"

import './styles/Home.css'
import '../components/MainCard'
import MainCard from '../components/MainCard'

export default function Hero(){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return loading ? <LoadingScreen /> : (
        <section className="hero">
            <MainCard/>
        </section>
    )
}