import { useEffect, useState } from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

const Main_content = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const handleMint = () => {
    navigate("/mint"); // Redirects to the Mint page
  };
  const calculateTransform = (scrollPosition, type) => {
    const windowWidth = window.innerWidth;

    // Define responsive values based on breakpoints
    let stopPointX = -153.6;
    let stopPointY = 668;
    let stopScale = 1.1536;
    let gap = 0; // Initialize gap

    if (windowWidth <= 576) {
      stopPointX=0;
      stopPointY = 0; // Adjust for smaller screens
      gap = 0; // Adjust gap for smaller screens
    } else if (windowWidth <= 768) {
      stopPointX=0;
      stopPointY = -33; // Adjust for medium screens
      gap = 67; // Adjust gap for medium screens
    } else if (windowWidth <= 992) {
      stopPointX=0;
      stopPointY = -33; // Adjust for larger screens
      gap = 67; // Adjust gap for larger screens
    }else if (windowWidth <= 1300) {
      stopPointY = 700; // Adjust for larger screens
      gap = 27; // Adjust gap for larger screens
    }

    // Hero 2 calculation (hero2 image)
    if (type === "hero2") {
      if (windowWidth <= 992)
        return "none";
      const translateX = Math.max(-scrollPosition * 0.2, stopPointX); // Stop at -153.6
      const translateY = Math.min(scrollPosition * 0.9, stopPointY); // Stop at translateY of 668
      const scale = Math.min(1 + scrollPosition * 0.0002, stopScale); // Stop scale at 1.1536
      return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    // Hero 1 calculation (hero1 image)
    if (type === "hero1") {
      if (windowWidth <= 992) return `translate(0px,0px scale(0))`;
      const translateX = Math.max(-scrollPosition * 0.2, stopPointX); // Stop at -153.6
      const translateY = Math.min(scrollPosition * 1 - 100 + gap, stopPointY); // Stop at translateY of 668
      const scale = Math.min(1 + scrollPosition * 0.0002, stopScale); // Stop scale at 1.1536
      return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
  };

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
        <div className="main">
          <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 2,ease:"easeInOut"}}>
            {currentText}
            <span className="blinking-cursor"></span>
          </motion.h2>
          <div className="imgcon">
            {/* hero2 image */}
            <img
              className="hero2"
              src="hero2.png"
              alt="Hero"
              style={{
                transform: calculateTransform(scrollY, "hero2"),
              }}
            />
            <motion.h1 initial={{opacity:0,scale: 0.2}} animate={{opacity:1,scale:1}} transition={{duration: 2}} className="Token">Token</motion.h1>
            {/* hero1 image */}
            <img
              className="hero1"
              src="hero1.png"
              alt="Hero"
              style={{
                transform: calculateTransform(scrollY, "hero1"),
              }}
            />
          </div>
        </div>
        <motion.div initial={{opacity:0,y:300}} animate={{opacity:1,y:0}} transition={{duration: 2}} className="bm">
          <div className="hero-btn">
            <button onClick={handleMint} className="create">Mint Token</button>
            {/* <button className="explore">Explore</button> */}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default Main_content;
