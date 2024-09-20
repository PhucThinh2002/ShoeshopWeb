import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/scss/ProductDetail.scss';

const ProductDetail = ({ product, showHeart = true }) => {
    const navigate = useNavigate();

    const handleClick = (productId) => {
        navigate(`/detail/${productId}`);
    };

    return (
        <div className="card">
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title">{product.name}</h5>
                    {showHeart && (
                        <button className="heart-btn">
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </button>
                    )}
                </div>
                <p className="card-text">{product.shortDescription}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <a href="#" className="btn btn-success" onClick={() => handleClick(product.id)}>Buy now</a>
                    <p className="price">${product.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
