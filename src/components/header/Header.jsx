import React from 'react'
import "./header.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetCart } from '../../store/slices/cartSlice';
export default function Header({ login, home }) {
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(resetCart())
    navigate("/login");
  }
  return (
    <div className="header">
      <h3 className='companyTitle'>Build With Innovations</h3>
      {login && <button className='registerBtn' > Wanna Register ?</button>}
      {home &&
        <div className='cartLogOut'>
          <Link to="/cart">
            <div className="cartDiv">
              <button className='cartIcon'><ShoppingCartIcon /></button>
              <span className='cartCount'>{quantity}</span>

            </div>
          </Link>
          <button className='registerBtn' onClick={logoutHandler}> Logout</button>
        </div>}
    </div>
  )
}
