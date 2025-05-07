import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-1 text-xl font-bold">
        <span>FakeGuard</span>
        <ShieldCheck/>
        </div>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 transition font-medium"
          >
            Verify Product
          </Link>
          <Link
            to="/admin"
            className="text-gray-700 hover:text-indigo-600 transition font-medium"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
