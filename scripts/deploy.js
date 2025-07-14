/**
 * scripts/deploy.js
 *
 * Deploy script for the Crowdfunding contract using Hardhat and ethers v6
 */
//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

const { ethers } = require("hardhat");

async function main() {
  // Retrieve the contract factory
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");

  // Deploy the contract (adjust constructor args if needed)
  const crowdfunding = await Crowdfunding.deploy(
    // Example args:
    // ethers.utils.parseEther("10"),
    // Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
  );

  // Wait for the contract to be deployed
  await crowdfunding.waitForDeployment();

  // Retrieve and log the deployed address
  const address = await crowdfunding.getAddress();
  console.log("Crowdfunding deployed to:", address);
}

// Execute the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
