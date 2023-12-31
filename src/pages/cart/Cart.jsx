import React, { useEffect, useState } from 'react'
import "./cart.css"
import Header from '../../components/header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../store/slices/cartSlice'
import { Link } from 'react-router-dom'
const Cart = () => {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const removeItemsFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className='wishListConTainer'>
      <Header home={true} />
      <div className='wishlistWrapper'>
        {cart && cart.map(item => (

          <div className="wishListProducts" key={item.id}>
            <img className='wishListProductImg' alt="productImg" src={item.thumbnail} />
            <button className='removeBtn' onClick={() => removeItemsFromCart(item.id)}>X</button>
            <p className="wishListDesc">
              {item.title}
            </p>
            <p className='wishListPrice'>$ {item.price}</p>
            <p className='wishListPrice'>Quantity: {item.quantity}</p>
            <button className='movetobagBtn' onClick={() => removeItemsFromCart(item.id)}>Remove from cart</button>
          </div>
        ))}
      </div>
      <div className='goToHomeBtn'>
        <Link to="/">
          <button>Go to Home</button>
        </Link>

      </div>
    </div>
  )
}

export default Cart