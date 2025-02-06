const FAQ = () => {
    return (
        <>
        <div className="faq-he">
            <h2 className="faq-h2">FAQ's</h2>
        </div>
        <section id="faq" className="faq-section">
            <div className="faq-content">
                <div className="faq-question">
                    <h3>What is Ethereum?</h3>
                    <p>Ethereum is a decentralized, open-source blockchain system that features smart contract functionality.</p>
                </div>
                <div className="faq-question">
                    <h3>What are ERC-20 tokens?</h3>
                    <p>ERC-20 tokens are fungible tokens on the Ethereum blockchain that follow a specific set of rules.</p>
                </div>
                <div className="faq-question">
                    <h3>How does an ERC20 token generator work?</h3>
                    <p>Typically, users provide details such as token name, symbol, supply, and other parameters, and the generator creates the corresponding smart contract code for the token.
                    </p>
                </div>
                <div className="faq-question">
                    <h3>Is it safe to use an ERC20 token generator?</h3>
                    <p>The safety depends on the reputation and security measures implemented by the specific generator.</p>
                </div>
                <div className="faq-question">
                    <h3>What are the advantages of using an ERC20 token generator?</h3>
                    <p>It provides an easy and quick way to create custom tokens without requiring extensive coding knowledge. </p>
                </div>
                <div className="faq-question">
                    <h3>What are the gas fees for deploying an ERC-20 token?</h3>
                    <p>The gas fees depend on network congestion and the complexity of the smart contract. Fees can fluctuate, so checking the Ethereum gas tracker before deployment is recommended.</p>
                </div>
                <div className="faq-question">
                    <h3>Can I modify an ERC-20 token after deployment?</h3>
                    <p>Once a token is deployed on the Ethereum blockchain, its code is immutable. However, some tokens include upgradeable features through proxy contracts.</p>
                </div>
                <div className="faq-question">
                    <h3>What is the difference between ERC-20 and ERC-721 tokens?</h3>
                    <p>ERC-20 tokens are fungible and interchangeable, while ERC-721 tokens are non-fungible and unique, commonly used for NFTs.</p>
                </div>
                <div className="faq-question">
                    <h3>What are testnet ERC-20 tokens?</h3>
                    <p>Testnet ERC-20 tokens are tokens deployed on Ethereum test networks like Goerli, Sepolia, or Rinkeby. They are used for development and testing purposes without real monetary value.</p>
                </div>
                <div className="faq-question">
                    <h3>How do I deploy an ERC-20 token on a testnet?</h3>
                    <p>You can deploy a test ERC-20 token using a testnet like Goerli or Sepolia by using a smart contract deployment tool like Remix, Hardhat, or Truffle.</p>
                </div>
            </div>

        </section>
        </>
    )
}

export default FAQ;