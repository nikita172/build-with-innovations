import Home from './pages/home/Home';
import Login from './pages/login/Login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Product from './pages/product/Product';
import Cart from './pages/cart/Cart';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "product/:id",
    element: <Product />
  },
  {
    path: "cart",
    element: <Cart />
  }
]);
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
