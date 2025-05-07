require("dotenv").config();
const hre = require("hardhat");


async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const registry = await hre.ethers.getContractAt("ProductRegistry", contractAddress);

  const tx = await registry.addProduct(
    "123456789",                     // productId
    "Premium Headphones X1",         // name
    "TechCorp Industries",           // manufacturer
    "15-02-24",                      // manufacturingDate (format: dd-mm-yy)
    "BTH2024-001"                    // batchNo
  );

  console.log("⏳ Adding product...");
  await tx.wait();
  console.log("✅ Product added to blockchain.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
