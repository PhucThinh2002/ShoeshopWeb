import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../assets/scss/Search.scss';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [priceOrder, setPriceOrder] = useState('none');
  const [search, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const valueKeyword = search.get('k') || keyword;

  const fetchProducts = async () => {
    if (valueKeyword) {
      try {
        const response = await fetch(`https://apistore.cybersoft.edu.vn/api/Product?keyword=${valueKeyword}`);
        const data = await response.json();
        setProducts(data.content || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (valueKeyword) {
      fetchProducts();
    }
  }, [valueKeyword]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setSearchParams({ k: e.target.value }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ k: keyword }); 
  };

  const handlePriceFilterChange = (e) => {
    setPriceOrder(e.target.value);
  };

  const handleClick = (productId) => {
    navigate(`/detail/${productId}`);
  }

  const sortedProducts = _.orderBy(products, ['price'], [priceOrder === 'asc' ? 'asc' : 'desc']);

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h3 className='mt-2'>Search Product</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Input product name"
            aria-label="Product name"
            aria-describedby="basic-addon2"
            value={keyword}
            onChange={handleSearchChange}
          />
          <button
            type='submit'
            className="input-group-text"
            id="basic-addon2"
            style={{ cursor: 'pointer' }}
          >
            Search
          </button>
        </div>
      </form>

      <h3 className='search-results mt-2'>Search Results</h3>
      <div className="mb-3">
        <label htmlFor="price-filter" className="form-label">Price:</label>
        <select
          id="price-filter"
          className="form-select"
          value={priceOrder}
          onChange={handlePriceFilterChange}
        >
          <option value="none">None</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="row">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card product-card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.shortDescription}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-success" onClick={() => handleClick(product.id)}>Buy Now</button>
                    <p className="price">${product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
