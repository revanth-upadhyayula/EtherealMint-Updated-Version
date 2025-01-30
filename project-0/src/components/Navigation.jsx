import {motion} from "framer-motion";
const Navigation = () => {
  return (
    <motion.nav initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{duration: 2,ease:"easeInOut"}} class="navbar">
          <div className='logo'>
              <img  className="logo" src='Logo.png' alt='logo'></img>
          </div>
          <ul className='nav-items'>
            <li className='li'><a href='#'>About</a></li>
            <li className='li'><a href='#'>FAQ's</a></li>
            <li className='li'><a href='#'>Guide</a></li>
            <li className='li'><a href='#'>BlockChain</a></li>
            {/* <li className='li'><a href='#'></a></li> */}
            {/* <li className='li'><a href="#" className="social-icon"><i class='bx bxl-instagram'></i></a></li>
            <li className='li'><a href="#" className="social-icon"><i class='bx bxl-twitter'></i></a></li> */}
          </ul>
          <div className="nav-button"><button id="connectButton">Connect to MetaMask</button></div>
    </motion.nav>
  );
};

export default Navigation;
