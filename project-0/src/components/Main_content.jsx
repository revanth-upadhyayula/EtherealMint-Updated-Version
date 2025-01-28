import { useEffect,useState } from "react";
const Main_content = () => {
    const texts = ["Create", "Mint", "Transfer"];
    const [currentText, setCurrentText] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
  
    useEffect(() => {
      const typeTimeout = setTimeout(() => {
        setCurrentText((prev) => prev + texts[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100); // Typing speed
  
      if (charIndex === texts[index].length) {
        clearTimeout(typeTimeout);
        setTimeout(() => {
          setCurrentText("");
          setCharIndex(0);
          setIndex((prev) => (prev + 1) % texts.length);
        }, 2000); // Pause before clearing
      }
  
      return () => clearTimeout(typeTimeout);
    }, [charIndex, index]);
    return (
        <main>
            <section className="hero">
                <div className='main'>
                    <h2>
                        {currentText}
                        <span className="blinking-cursor"></span>
                        </h2>
                    <h1 className="Token">Token</h1>
                    <p>Seamlessly create, mint, and transfer your tokens on the blockchain. Simplify the process with EthrealMint, and bring your decentralized vision to life with just a few clicks.</p>
                    <div className="hero-btn" >
                        <button className="create">Mint Token</button>
                        <button className="explore">Explore</button>
                    </div>
                </div>
                <div className="image">
                    <img src="hero.png" alt="Hero" />
                </div>
            </section>
        </main>
    )
}
export default Main_content;