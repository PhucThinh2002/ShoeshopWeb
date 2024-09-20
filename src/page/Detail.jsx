import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import '../assets/scss/Detail.scss';
import ProductHome from '../Product/ProductHome';
import { addProductAction } from '../Redux/reducers/cartReducer';

const Detail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); 
    const [transformValue, setTransformValue] = useState('rotate(0deg)');
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`https://apistore.cybersoft.edu.vn/api/Product/getbyid?id=${productId}`);
                    setProduct(response.data.content);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };

            fetchProduct();
        } else {
            console.error('Product ID is missing');
        }
    }, [productId]);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        if (product) {
            dispatch(addProductAction({ ...product, quantity }));
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <div className="container">
                <div className="detail-left">
                    <img style={{ transform: transformValue }} src={product.image} alt='...' className='w-100' />

                    <div className='row'>
                        {product.detaildetailedImages.map((deg, index) => {
                            return <div className='col-3' key={index}>
                                <img onClick={() => {
                                    setTransformValue(deg);
                                }} src={product.image} style={{ transform: deg, border: `1px solid ${deg === transformValue ? 'orange' : '#EEE'}`, cursor: 'pointer' }} className='w-100 p-2' />
                            </div>

                        })}
                    </div>
                </div>
                <div className="detail-right mt-4 p-2">
                    <h2 className="prod-name">{product.name}</h2>
                    <p className="prod-desc">{product.shortDescription}</p>
                    <div className="size">
                        <h3>Available Sizes</h3>
                        {product.size && product.size.length > 0 ? (
                            <div id="size-buttons">
                                {product.size.map(size => (
                                    <button key={size} className="size-button" data-size={size}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p>No sizes available</p>
                        )}
                    </div>
                    <h3 className="prod-price">Price: ${product.price}</h3>
                    <div className="quantity">
                        <button className="btn-dec" onClick={() => handleQuantityChange(-1)}>-</button>
                        <input type="number" value={quantity} readOnly />
                        <button className="btn-inc" onClick={() => handleQuantityChange(1)}>+</button>
                    </div>
                    <button className="btn-buy btncart" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
            <div className="related-products">
                <h2>Related Products</h2>
                <ProductHome showHeart={false} />
            </div>
        </div>
    );
};

export default Detail;
