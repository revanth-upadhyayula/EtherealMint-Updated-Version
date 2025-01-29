const Features = () => {
    return (
        <section className="features">
            <img className="puz" src="features.png" alt="Ethereum Features" />
            
            {/* Feature Heading */}

            <div className="bigbox">
                <div className="f">
                    <h2 className="f1">Features of</h2>
                    <h2 className="f2">Ethereum</h2>
                </div>

                <div className="cards1">
                    {/* Card 1 */}
                    <div className="lsideb">
                        <div className="feature-card">
                            <div className="feature-img">
                                <img className="smart-contracts" src="smart-contracts.png" alt="Smart Contracts" />
                            </div>
                            <div className="feature-heading">
                                <h3>Smart Contracts</h3>
                            </div>
                            <div className="feature-content">
                                <p className="description">Ethereum enables the creation of decentralized applications via smart contracts.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="sidecard">
                        <div className="rsides1">
                            <div className="feature-card">
                                <div className="feature-img">
                                    <img className="defi" src="defi.png" alt="DeFi" />
                                </div>
                                <div className="feature-heading">
                                    <h3>Decentralized Finance (DeFi)</h3>
                                </div>
                                <div className="feature-content">
                                    <p className="description">Ethereum is the backbone of DeFi, offering financial services without intermediaries.</p>
                                </div>
                            </div>
                        </div>
                        <div className="rsides2">
                            <div className="feature-card">
                                <div className="feature-img">
                                    <img className="ethereum-2" src="ethereum-2.0.png" alt="Ethereum 2.0" />
                                </div>
                                <div className="feature-heading">
                                    <h3>Ethereum 2.0 (Proof of Stake)</h3>
                                </div>
                                <div className="feature-content">
                                    <p className="description">Ethereum is shifting to Proof of Stake to increase scalability and reduce energy consumption.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cards2">
                    {/* Card 3 */}
                    <div className="sidecard2">
                        <div className="lsides1">
                            <div className="feature-card">
                                <div className="feature-img">
                                    <img className="security" src="security.png" alt="Security" />
                                </div>
                                <div className="feature-heading">
                                    <h3>Security</h3>
                                </div>
                                <div className="feature-content">
                                    <p className="description">Ethereum offers robust security, making it a trusted platform for decentralized apps.</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="lsides2">
                            <div className="feature-card">
                                <div className="feature-img">
                                    <img className="dao" src="dao.png" alt="DAO" />
                                </div>
                                <div className="feature-heading">
                                    <h3>Decentralized Autonomous Organizations (DAOs)</h3>
                                </div>
                                <div className="feature-content">
                                    <p className="description">Ethereum facilitates the creation of DAOs, enabling decentralized governance.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="rsideb">
                        <div className="feature-card">
                            <div className="feature-img">
                                <img className="interoperability" src="interoperability.png" alt="Interoperability" />
                            </div>
                            <div className="feature-heading">
                                <h3>Interoperability</h3>
                            </div>
                            <div className="feature-content">
                                <p className="description">Ethereum enables interaction with other blockchain networks for greater flexibility.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img className="puz" src="featuresi.png" alt="Ethereum Features" />
        </section>
    );
}

export default Features;
