import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import { Search, Shield, ShieldCheck,Package, AlertTriangle, QrCode, Barcode } from 'lucide-react';
import { ethers } from "ethers";
import ProductRegistry from "../blockchain/artifacts/contracts/ProductRegistry.sol/ProductRegistry.json";
const contractAddress = "0x197bD0164D698c0f5A5691ab05E61Ddccffba835"; // Update this if needed

function App() {
  const [productId, setProductId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerificationResult(null);

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ProductRegistry.abi, signer);

        // 🔍 **Log all stored product IDs before verification**
        const productIds = await contract.getAllProductIds();
        console.log("Stored Product IDs in blockchain:", productIds);

        // **Now, attempt to fetch the specific product**
        const product = await contract.getProduct(productId);
        const [id, name, manufacturer, date, batchNo, exists] = product;

        if (exists) {
            setVerificationResult({
                isAuthentic: true,
                productId: id,
                productName: name,
                manufacturer,
                date,
                batchNumber: batchNo,
            });
        } else {
            setVerificationResult({ isAuthentic: false });
        }
    } catch (err) {
        console.error("Verification failed:", err);
        setVerificationResult({ isAuthentic: false });
    }

    setIsVerifying(false);
};

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-200">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto">

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-indigo-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Blockchain Product Verification
              </h1>
              <p className="text-lg text-gray-600">
                Verify the authenticity of your products using blockchain technology
              </p>
            </div>

            {/* Verification Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 w-225 ms-75">
              <form onSubmit={handleVerification} className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-2">
                      Product ID or Serial Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="productId"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter product ID..."
                      />
                      <div className="absolute right-3 top-2.5 text-gray-400">
                        <QrCode className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isVerifying || !productId.trim()}
                    className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isVerifying ? (
                      <span className="flex items-center">
                        <Search className="animate-spin h-5 w-5 mr-2" />
                        Verifying...
                      </span>
                    ) : (
                      'Verify Product'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Verification Result */}
            {verificationResult && (
              <div className="bg-white rounded-xl shadow-lg p-8 w-225 ms-75">
                <div className="flex items-center mb-6">
                  {verificationResult.isAuthentic ? (
                    <div className="flex items-center text-green-600">
                      <ShieldCheck className="h-8 w-8 mr-2" />
                      <h2 className="text-2xl font-semibold">Authentic Product</h2>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="h-8 w-8 mr-2" />
                      <h2 className="text-2xl font-semibold">Potential Counterfeit</h2>
                    </div>
                  )}
                </div>

                {verificationResult.isAuthentic ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Product Name</label>
                        <p className="text-lg font-medium">{verificationResult.productName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Manufacturer</label>
                        <p className="text-lg font-medium">{verificationResult.manufacturer}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Manufacturing Date</label>
                        <p className="text-lg font-medium">{verificationResult.date}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Batch Number</label>
                        <p className="text-lg font-medium">{verificationResult.batchNumber}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <p className="text-red-700">
                      Warning: This product could not be verified in our blockchain records.
                      It may be counterfeit or tampered with. Please contact customer support
                      for assistance.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/*Features*/}
            <div className="flex flex-row gap-6 mt-12 ms-75">
            <div className="bg-white p-6 rounded-xl shadow-md w-71">
              <div className="text-indigo-600 mb-4">
                <Package className="h-10 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Product Tracking</h3>
              <p className="text-gray-600">
                Track your product's journey from manufacturer to consumer
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md w-71">
              <div className="text-indigo-600 mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Verification</h3>
              <p className="text-gray-600">
                Verify product authenticity in seconds using blockchain
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md w-71">
              <div className="text-indigo-600 mb-4">
                <Barcode className='h-8 w-8'/>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Product ID</h3>
              <p className="text-gray-600">
              Unique blockchain-registered IDs prevent duplication.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;