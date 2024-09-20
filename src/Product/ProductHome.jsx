import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductDetail';
import '../assets/scss/ProductHome.scss';

const ProductHome = ({ showHeart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsApi = async () => {
            try {
                const response = await axios.get('https://apistore.cybersoft.edu.vn/api/Product');
                const productData = response.data.content;
                setProducts(productData.slice(0, 6));
            } catch (error) {
                console.error('Error', error);
            }
        };

        productsApi();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-3" key={product.id}>
                        <ProductCard product={product} showHeart={showHeart} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductHome;
