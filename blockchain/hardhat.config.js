require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, // Used Alchemy for sepolia testnets 
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Used wallet private key
    },
  },
};
