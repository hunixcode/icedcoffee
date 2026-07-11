import * as motion from 'motion/react-client'
import './styles/BuyIt.css'


export default function BuyIt(){
    return (
        <motion.div className="buy-it">
            <img src="https://hunix.shop/cdn/shop/files/20260703215908-1f1772a6-aa64-615a-94ee-364803eeedf5.png?v=1783117223&width=3840" alt="Opensourcer Shirt" className="img"
            style={{
                borderRadius: '5px'
            }}/>
            <div className="buy-it-form">
                <p style={{textAlign:'center'}}><b>BUY THE OPENSOURCER SHIRT </b><br/>at hunix.shop</p>
                <button onClick={() => window
            .open("https://hunix.shop/collections/all", "_blank", "noopener,noreferrer")}>I NEED IT</button>
            </div>
        </motion.div>
    )
}