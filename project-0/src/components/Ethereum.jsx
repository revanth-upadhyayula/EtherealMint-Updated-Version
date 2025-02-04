import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import Features from "./Features";
const Ethereum = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <main>
            <section className="ethereum" >
                <div className="eth-he">
                    <motion.h2 initial={{opacity:0,x:-200}} whileInView={{opacity:1,x:0}} transition={{duration: 1,delay:1,ease:"easeOut"}} viewport={{once:true,amount:1}} className="eth-h21">What is</motion.h2>
                    <motion.h2 initial={{opacity:0,x:-200}} whileInView={{opacity:1,x:0}} transition={{duration: 1,delay:0.5,ease:"easeOut"}} viewport={{once:true}} className="eth-h22">Ethereum</motion.h2>
                </div>
                <div className="ethdown">
                    <div className="eth-para">
                        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration: 1,delay:1,ease:"easeOut"}} viewport={{once:true}} >
                            Ethereum is a decentralized blockchain platform that enables developers to build and deploy smart contracts and decentralized applications (DApps). It is powered by Ether (ETH), the native cryptocurrency used for transactions and computational services.
                        </motion.p>
                        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration: 1,delay:1.25,ease:"easeOut"}} viewport={{once:true}} >
                            With Ethereum, you can create and manage digital assets, execute programmable transactions, and explore a vast ecosystem of innovative blockchain applications.
                        </motion.p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Ethereum;