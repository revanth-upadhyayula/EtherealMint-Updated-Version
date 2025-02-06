import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Down_content = () => {
    return (
        <main>
            <section className="down">
                <div className="he">
                    <motion.h2 initial={{ opacity: 0, x: -200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1, ease: "easeOut" }} viewport={{ once: true, amount: 1 }} className="h21">What are</motion.h2>
                    <motion.h2 initial={{ opacity: 0, x: -200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} viewport={{ once: true }} className="h22">Tokens</motion.h2>
                </div>
                <div className="downmain">
                    <div className="para">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1, ease: "easeOut" }} viewport={{ once: true }}>
                            A Token is a representation of money, time, services, shares in a company, a virtual pet, anything in the blockchain. By representing things as tokens, we can allow smart contracts to interact with them, exchange them, create or destroy them.
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1.15, ease: "easeOut" }} viewport={{ once: true }}>
                            ERC-20, or Ethereum Request for Comment 20, is a technical standard used for issuing and implementing assets on the{" "}
                            <Link to="/ethereum" style={{ color: "#1a3971", textDecoration:"underline" }}>Ethereum</Link> blockchain.
                        </motion.p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Down_content;