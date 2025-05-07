import React, { useState } from 'react';
import { ethers } from 'ethers';
import Navbar from './Navbar';
import ProductRegistry from "../../blockchain/artifacts/contracts/ProductRegistry.sol/ProductRegistry.json";

const contractAddress = "0x197bD0164D698c0f5A5691ab05E61Ddccffba835";

const AdminPage = () => {
    const [product, setProduct] = useState({
        productId: '',
        name: '',
        manufacturer: '',
        date: '',
        batchNo: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async () => {
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask');
                return;
            }

            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ProductRegistry.abi, signer);

            const tx = await contract.addProduct(
                product.productId,
                product.name,
                product.manufacturer,
                product.date,
                product.batchNo
            );

            setStatus('Transaction sent... waiting for confirmation');
            await tx.wait();

            setStatus('✅ Product added successfully!');
        } catch (error) {
            console.error(error);
            setStatus('❌ Error: ' + error.message);
        }
    };

    return (
        <>
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-200'>
                <Navbar />
                <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-xl mt-12">
                    <h2 className="text-2xl font-bold mb-4">Admin - Add Product</h2>
                    <div className="space-y-4">
                    {['productId', 'name', 'manufacturer', 'date', 'batchNo'].map((field) => (
  <div key={field}>
    <label className="block mb-1 capitalize font-medium">{field}</label>
    <input
      type={field === 'date' ? 'date' : 'text'}
      name={field}
      value={product[field] || ''}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded"
    />
  </div>
))}


                        <button
                            onClick={handleAddProduct}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                        >
                            Add Product
                        </button>
                        {status && <p className="mt-2 text-sm">{status}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPage;