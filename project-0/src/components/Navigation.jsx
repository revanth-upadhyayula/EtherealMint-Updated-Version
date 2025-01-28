const Navigation = () => {
  return (
    <nav class="navbar">
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
    </nav>
  );
};

export default Navigation;
