
import { ethers } from 'ethers';
import ProductRegistryABI from './abi/ProductRegistry.json';

const CONTRACT_ADDRESS = "0x197bD0164D698c0f5A5691ab05E61Ddccffba835";

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ProductRegistryABI, signer);
};
