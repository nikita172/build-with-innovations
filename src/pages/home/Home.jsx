import React, { useEffect, useRef, useState } from 'react'
import "./home.css"
import Header from '../../components/header/Header'
import { useNavigate, Link } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [priceFilter, setPriceFilter] = useState("filterPrice")
  const [isSort, setIsSort] = useState(true);
  const input = useRef();
  const storage = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchProducts = async () => {
      if (!storage) {
        navigate("/login");
        setLoading(false);
      } else {
        try {
          const response = await fetch('https://dummyjson.com/products', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
          });
          const result = await response.json();
          setProducts(result.products);
          setFilteredProducts(result.products)
          setLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      }
    }
    fetchProducts();
  }, []);

  const inputHandler = () => {
    if (input.current.value) {
      setFilteredProducts(() => products.filter(i => i.title.toLowerCase().startsWith(input.current.value.toLowerCase())))
      if (priceFilter == "lowToHigh") {
        setIsSort(!isSort);
        setFilteredProducts((filteredProduct) => {
          const item = filteredProduct.sort((a, b) => {
            return a.price - b.price;
          })
          return item
        })

      }
      if (priceFilter == "highToLow") {
        setIsSort(!isSort);
        setFilteredProducts((filteredProduct) => {
          const item = filteredProduct.sort((a, b) => {
            return b.price - a.price;
          })
          return item
        })

      }
    } else {
      setFilteredProducts(products);
      if (priceFilter == "lowToHigh") {
        setIsSort(!isSort);
        setFilteredProducts((filteredProduct) => {
          const item = filteredProduct.sort((a, b) => {
            return a.price - b.price;
          })
          return item
        })

      }
      if (priceFilter == "highToLow") {
        setIsSort(!isSort);
        setFilteredProducts((filteredProduct) => {
          const item = filteredProduct.sort((a, b) => {
            return b.price - a.price;
          })
          return item
        })

      }

    }
  }

  useEffect(() => {
    if (priceFilter == "lowToHigh") {
      setIsSort(!isSort);
      setFilteredProducts((filteredProduct) => {
        const item = filteredProduct.sort((a, b) => {
          return a.price - b.price;
        })
        return item
      })

    }
    if (priceFilter == "highToLow") {
      setIsSort(!isSort);
      setFilteredProducts((filteredProduct) => {
        const item = filteredProduct.sort((a, b) => {
          return b.price - a.price;
        })
        return item
      })

    }

  }, [priceFilter])
  return (
    <div className='homeContainer'>
      <Header home={true} />
      {loading ? <div className="loadingStatus">
        <h2>
          Loading...

        </h2>
      </div> :
        <>

          <div className="searchContainer">
            <input placeholder='Search' type='text' ref={input} onKeyUp={inputHandler} />
            <select className='selectFilter' name='filter' defaultValue={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="filterPrice" disabled>Filter by Price</option>
              <option value="lowToHigh" >Low to high</option>
              <option value="highToLow" >high to low</option>
            </select>
          </div>
          <div className="cards">

            {filteredProducts && filteredProducts.map(item => (
              <div key={item.id}>
                <Link className="linkRouter" to={`/product/${item.id}`}>
                  <div className="card" >
                    <img alt="" src={item.thumbnail} className='product-thumbnail' />
                    <div className="card-header">
                      <div className='card-header-left'>
                        <h3>{item.title}</h3>
                        <span className="price">Only {item.price} $</span>
                        <span>Discount: {item.discountPercentage}%</span>
                        {item.stock > 0 ? <span>In stock</span> : <span>Out of stock</span>}
                      </div>

                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      }


    </div >
  )
}

export default Home