import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SiteWork = () => {
    const svgRef = useRef(null); // Reference for the SVG
    const containerRef = useRef(null); // Reference for the section container

    useEffect(() => {
        const svg = svgRef.current;
        const path = svg.querySelector("path");
        const pathLength = path.getTotalLength();

        // Set initial strokeDasharray and strokeDashoffset
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        // GSAP animation
        const animation = gsap.fromTo(
            path,
            { strokeDashoffset: pathLength },
            {
                strokeDashoffset: 0,
                duration: 3,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current, // Attach ScrollTrigger to the section
                    start: "top top", // Start when the section is at the top of the viewport
                    end: "bottom bottom", // End when the section leaves the viewport
                    scrub: 1, // Smooth sync with scroll
                },
            }
        );

        // Cleanup ScrollTrigger and GSAP animation
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all ScrollTriggers
            animation.kill(); // Kill the animation
        };
    }, []);


    return (
        <section ref={containerRef} className="how-our-site-works">
            <h2 className="whead">How Our Site Works</h2>
            <p className="subwhead">Follow these steps to interact with the ERC20 DAPP platform.</p>

            <div className="lineC">
                {/* SVG for the animated line */}
                {/* <svg
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 4 500"
                    className="animated-line"
                >
                    <path d="M2 0 L2 500" stroke="#000" strokeWidth="2" fill="none" />
                </svg> */}
                <svg ref={svgRef} width="1139" height="821" xmlns="http://www.w3.org/2000/svg" className="animated-line">

                    <path id="svg_1" d="m201.52617,47.1145c-142.12907,33.2217 -332.65585,233.63978 419.36949,142.51623c752.02534,-91.12356 531.47898,234.42792 -124.56265,202.55263c-656.04163,-31.87529 -574.84882,264.08467 119.00906,185.84456c693.85788,-78.24011 611.52048,152.42196 77.6093,190.93985l-459.58178,2.52227" opacity="NaN" stroke="#1a3971" stroke-width="5" fill="none" />
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="steps"
            >
                {/* Step 1 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, scale: 1.25 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="step"
                >
                    <div className="step-content">
                        <img src="verify_organization.png" alt="Step 1" />
                        <h3>Step 1: Verify Organization</h3>
                    </div>
                    <p className="step-description">
                        We verify the organization by taking their PAN number to ensure authenticity.
                    </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, scale: 1.25 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="step"
                >
                    <div className="step-content">
                        <img src="create_token.png" alt="Step 2" />
                        <h3>Step 2: Create Token</h3>
                    </div>
                    <p className="step-description">
                        Once verified, the organization can create their own test token by providing
                        parameters like name, symbol, and total supply.
                    </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, scale: 1.25 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="step"
                >
                    <div className="step-content">
                        <img src="smart_contract.png" alt="Step 3" />
                        <h3>Step 3: Smart Contract Request</h3>
                    </div>
                    <p className="step-description">
                        The request for creating the token is sent to the smart contracts deployed on
                        the Sepolia testnet.
                    </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, scale: 1.25 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="step"
                >
                    <div className="step-content">
                        <img src="transfer_token.png" alt="Step 4" />
                        <h3>Step 4: Transfer Token</h3>
                    </div>
                    <p className="step-description">
                        The organization can transfer the created tokens through their wallets,
                        enabling smooth transactions.
                    </p>
                </motion.div>

                {/* Step 5 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, scale: 1.25 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="step"
                >
                    <div className="step-content">
                        <img src="etherscan_verification.png" alt="Step 5" />
                        <h3>Step 5: Verification and Updates</h3>
                    </div>
                    <p className="step-description">
                        All tokens and transactions are verified and saved on Etherscan for
                        transparency and balance updates.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SiteWork;
