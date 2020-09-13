import React, { useState, useEffect } from "react";
import axios from 'axios';

function Home() {
  const [products, setproducts] = useState(null);

  useEffect(() => {
    if(!products) {
      getProducts();
    }
  })

  const getAll = async () => {
    let res = await axios.get('/api/perf_metrics');
    return res.data || [];
  }

  const getProducts = async () => {
    let res = {};//await getAll();
    console.log(res);
    setproducts(res);
  }

  const renderProduct = product => {
    return (
      <li key={product._id} className="list__item product">
        <h3 className="product__name">{product.id}</h3>
        <p className="product__description">{product.url}</p>
      </li>
    );
  };

  return (
    <div className="home">
      <ul className="list">
        {(products && products.length > 0) ? (
          products.map(product => renderProduct(product))
        ) : (
          <p>No products found</p>
        )}
      </ul>
    </div>
  );
}

export default Home;
