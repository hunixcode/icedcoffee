import { Copyright } from '@boxicons/react'

import './Footer.css'


export default function Footer(){
    return (
        <>
            <section className="footer">
                <p style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    gap:"5px"
                }}>
                    <Copyright width="20px"/>all rights reserved to hunixcode.
                </p>
            </section>
        </>
    )
}