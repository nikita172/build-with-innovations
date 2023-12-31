import React, { useEffect, useState } from 'react'
import "./product.css"
import Header from '../../components/header/Header';
import axios from "axios"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
const Product = () => {
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart.cart);
  useEffect(() => {
    const renderProduct = async () => {
      setLoading(true);
      let res = await axios.get(`https://dummyjson.com/products/${params.id}`)
      res = res.data
      setData(res);
      const isDataPresent = cartData.find(i => i.id == params.id);
      if (isDataPresent) {
        setIsAddedToCart(true);
      } else {
        setIsAddedToCart(false)
      }
      setLoading(false);
    }
    renderProduct()
  }, [params.id, cartData])

  const addToCartHandler = (data) => {
    if (quantity == 0) {
      setError("Please select atleast one item")
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000)
    } else {
      dispatch(addToCart({ itemId: data.id, quantity: quantity, title: data.title, thumbnail: data.thumbnail, description: data.description, price: data.price }))
    }
  }
  const navigateToCartHandler = () => {
    console.log("hello")
    navigate("/cart")
  }
  console.log(isAddedToCart)

  return (
    <div className='previewContainer'>
      <Header home={true} />
      {loading ? <div className="loadingStatus">
        <h2>
          Loading...

        </h2>
      </div> :
        <div className="previewProduct">
          <div className='previewProductLeft'>
            <div className="productImages">
              {data && data.images.map((im, index) => (
                <img key={index} className="productImage" alt="productImg" src={im} />
              ))}
            </div>
          </div>
          <div className='previewProductRight'>
            <h2 className='name'>{data && data.title} ({data && data.brand})</h2>
            <p className='productDesc'>
              {data && data.description}
            </p>
            <div className='mrpDiv'>
              <h2 className='productPrice'>$ {data && data.price}</h2>
              <h2 className='discount'>({data && data.discountPercentage} % OFF)</h2>
            </div>
            <p className='taxesInfo'>inclusive of all taxes</p>
            <div>
              <span className='discount'>Rating- {data && data.rating}⭐ </span>
            </div>
            {!isAddedToCart &&
              <div className="quantity-menu">
                <button onClick={() => {

                  setQuantity((q) => q + 1)
                }
                }>+</button>
                <span>{quantity}</span>
                <button onClick={() => {
                  if (quantity > 0) {
                    setQuantity((q) => q - 1)
                  }
                }
                }>-</button>
              </div>
            }
            <div className='addTo'>
              {
                isAddedToCart ?
                  <button className="alreadyAddedToCart" onClick={navigateToCartHandler}>
                    <ShoppingCartIcon className='addToIcon' />
                    ALREADY ADDED TO CART
                  </button> :
                  <button className="alreadyAddedToCart" onClick={() => addToCartHandler(data)}>
                    <ShoppingCartIcon className='addToIcon' />
                    ADD TO CART
                  </button>
              }
            </div>
          </div>
        </div>}
      <div className={`errorMsg ${isError ? "error" : ""} `}>{error} !</div>

    </div>
  )
}

export default Product