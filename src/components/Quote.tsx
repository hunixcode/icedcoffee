import { ThreeDot } from "react-loading-indicators";
import { useEffect, useState } from "react";

import * as motion from "motion/react-client"

export default function Quote(){
    
    const quote = useQuoteData();
    if(!quote){
        return <ThreeDot variant="bounce" color="#000000" size="small" text="" textColor="" />
    }
    
    return (
        <motion.div className="inspirational"
        style={{maxWidth:"400px",textAlign:"center",fontFamily:"Archivo"}}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
            duration: 0.4,
            ease:"easeOut"
        }}>
            <p>"{quote.text}"</p>
        </motion.div>
    )
}

function useQuoteData() {
  const [quoteData, setQuoteData] = useState<any>(null);
  const pick = () => Math.floor(Math.random() * 10);

  useEffect(() => {
    fetch("https://thequoteshub.com/api/tags/computer%20science?page=1&page_size=20&format=json")
      .then((res) => res.json())
      .then((data) => setQuoteData(data.quotes[pick()]))
  }, []);

  console.log(quoteData)

  return quoteData;
}