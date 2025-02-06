import {motion} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {FaBars,FaTimes} from "react-icons/fa";

const Navigation = () => {
  const navRef = useRef(null);

  const showNav=()=>{
    console.log(navRef.current.classList)
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <motion.nav initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{duration: 2,ease:"easeInOut"}} className="navbar">
          <div className='logo'>
              <img  className="logo" src='Logo.png' alt='logo'></img>
          </div>
          <ul ref={navRef} className='nav-items'>
            <li className='li'><Link to='/'>Home</Link></li>
            {/* <li className='li'><Link to='/about'>About</Link></li> */}
            <li className='li'><Link to='/faq'>FAQ's</Link></li>
            <li className='li'><Link to='/ethereum'>Ethereum</Link></li>
            {/* <li className='li'><a href='https://docs.openzeppelin.com/contracts/5.x/erc20'>Guide</a></li> */}
            {/* <li className='li'><a href='#'>BlockChain</a></li> */}
            {/* <li className='li'><a href='#'></a></li> */}
            {/* <li className='li'><a href="#" className="social-icon"><i class='bx bxl-instagram'></i></a></li>
            <li className='li'><a href="#" className="social-icon"><i class='bx bxl-twitter'></i></a></li> */}
            <div className="nav-button"><button id="connectButton"><a className="blockchain1" href="https://www.ibm.com/think/topics/blockchain" target="_blank" rel="noopener noreferrer">Explore BlockChain</a></button></div>
            <button className="nav-btn nav-close-btn" onClick={showNav}><FaTimes /></button>
          </ul>
          <div className="nav-button"><button id="connectButton1"><a className="blockchain" href="https://www.ibm.com/think/topics/blockchain" target="_blank" rel="noopener noreferrer">Explore BlockChain</a></button></div>
          <button className="nav-btn" onClick={showNav}><FaBars /></button>
    </motion.nav>
  );
};

export default Navigation;
