import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/scss/Home.scss';
import ProductHome from '../Product/ProductHome';

const Home = () => {
    const [carouselProducts, setCarouselProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://apistore.cybersoft.edu.vn/api/Product');
                const productData = response.data.content;
                const shuffledProducts = productData.sort(() => 0.5 - Math.random()).slice(0, 3);
                setCarouselProducts(shuffledProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselProducts.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselProducts.length) % carouselProducts.length);
    };

    return (
        <div>
            <div id="productCarousel" className="carousel slide mt-0" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {carouselProducts.map((product, index) => (
                        <div key={product.id} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
                            <div className="carousel-content">
                                <img src={product.image} className="carousel-img" alt={product.name} />
                                <div className="carousel-text">
                                    <h5>{product.name}</h5>
                                    <p>{product.shortDescription}</p>
                                    <a href="#" className="btn btn-warning">Buy now</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" role="button" onClick={handlePrev}>
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" role="button" onClick={handleNext}>
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </a>
            </div>
            <div className="product-feature">
                <div className="feature-title w-25">Product Feature</div>
                <ProductHome showHeart={true} />
            </div>
        </div>
    );
};

export default Home;
