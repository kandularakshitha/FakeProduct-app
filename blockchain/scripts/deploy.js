const hre = require("hardhat");

async function main() {
  const ProductRegistry = await hre.ethers.getContractFactory("ProductRegistry");
  const registry = await ProductRegistry.deploy();

  // Wait for the contract to be deployed
  console.log("Waiting for deployment to be mined...");
  await registry.waitForDeployment();  // ✅ Updated for Hardhat v6+

  console.log("✅ Contract deployed to:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
