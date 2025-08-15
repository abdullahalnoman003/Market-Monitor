import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Lottie from 'lottie-react';
import Animation from './ProductNotFound.json';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

const ProductNotFound = () => {
  useDocumentTitle("Product Not Found || Market Monitor");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base text-center px-4">
      <Lottie
        className="shadow-2xl rounded-4xl"
        animationData={Animation}
        loop={true}
      />
      <h1 className="text-5xl font-extrabold mb-2 mt-5 text-yellow-500">Product Not Found</h1>
      <h2 className="text-2xl font-bold text-red-500 mb-4">Sorry! We couldn’t find that product.</h2>
      <p className="mb-6 max-w-md">
        The product you're looking for might have been removed, is out of stock, or never existed. Please try searching again or return to the homepage.
      </p>
      <button className="btn btn-primary font-bold hover:shadow-xl my-3 gap-2 hover:bg-gradient-to-br px-6 py-2 rounded-md text-lg">
        <Link to="/" className="flex gap-2 items-center">
          <FaHome /> Go back to Home
        </Link>
      </button>
    </div>
  );
};

export default ProductNotFound;
