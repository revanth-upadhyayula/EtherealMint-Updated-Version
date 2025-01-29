import { useEffect, useState } from "react";
const Main_content = () => {

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handelScroll = () => {
      setScrollY(window.scrollY);  //at start of webpage it will take the scrolling control
    };
    window.addEventListener('scroll', handelScroll);
    return () => window.addEventListener("scroll", handelScroll); //used to avoid memory leak
  }, []);


  const calculateTransform = (scrollPosition, type) => {

    // stop points for hero(hero2+hero1) images
    const stopPointX = -153.6;
    const stopPointY = 668;
    const stopScale = 1.1536;

    //Hero2 transform calculations
    if (type === "hero2") {
      const translateX = Math.max(-scrollPosition * 0.2, stopPointX);
      const translateY = Math.min(scrollPosition * 0.9, stopPointY);
      const scale = Math.min(1 + scrollPosition * 0.0002, stopScale);
      return `translate(${translateX}px,${translateY}px) scale(${scale})`;
    }

    //Hero1 tranform calculations
    if (type === "hero1") {
      const translateX = Math.max(-scrollPosition * 0.2,stopPointX);
      const translateY = Math.min(scrollPosition * 1 - 100, stopPointY);
      const scale = Math.min(1 + scrollPosition * 0.0002, stopScale);
      return `translate(${translateX}px,${translateY}px) scale(${scale})`;
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
        <div className='main'>
          <h2>
            {currentText}
            <span className="blinking-cursor"></span>
          </h2>
          <div className="imgcon">
            <img className="hero2" src="hero2.png" alt="Hero" style={{ transform: calculateTransform(scrollY, "hero2"), }} />
            <h1 className="Token">Token</h1>
            <img className="hero1" src="hero1.png" alt="Hero" style={{ transform: calculateTransform(scrollY, "hero1"), }} />
          </div>
        </div>
        <div className="bm">
          <div className="hero-btn" >
            <button className="create">Mint Token</button>
            <button className="explore">Explore</button>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Main_content;