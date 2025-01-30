import {motion} from "framer-motion";
const Down_content = () => {
    return (
        <main>
            <section className="down" >
                <div className="he">
                    <motion.h2 initial={{opacity:0,x:-600}} whileInView={{opacity:1,x:0}} transition={{duration: 1,delay:1,ease:"easeOut"}} viewport={{once:true,amount:1}} className="h21">What is</motion.h2>
                    <motion.h2 initial={{opacity:0,x:-200}} whileInView={{opacity:1,x:0}} transition={{duration: 1,delay:0.5,ease:"easeOut"}} viewport={{once:true}} className="h22">Ethereum</motion.h2>
                </div>
                <div className="downmain">
                    <div className="para">
                        <motion.p initial={{opacity:0,x:600}} whileInView={{opacity:1,x:0}} transition={{duration: 1,delay:1,ease:"easeOut"}} viewport={{once:true}} className="text-lg text-gray-700 mb-4">
                            Ethereum is a decentralized blockchain platform that enables developers to build and deploy smart contracts and decentralized applications (DApps). It is powered by Ether (ETH), the native cryptocurrency used for transactions and computational services.
                        </motion.p>
                        <motion.p initial={{opacity:0,x:600}} whileInView={{opacity:1,x:0}} transition={{duration: 1,delay:1.5,ease:"easeOut"}} viewport={{once:true}} className="text-lg text-gray-700">
                            With Ethereum, you can create and manage digital assets, execute programmable transactions, and explore a vast ecosystem of innovative blockchain applications.
                        </motion.p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Down_content;