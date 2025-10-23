import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import ResetPassword from '../pages/resetPassword'
import PurchaseCancel from '../pages/purchaseCancel'
import PurchaseSuccessPage from '../pages/purchaseSuccess'
import UserPanel from '../pages/UserPanel'
import UserProfile from '../pages/UserProfile'
import PurchaseHistory from '../pages/PurchaseHistory'
import AnalyticsTab from '../pages/AnalyticsTab'
import AllOrders from '../pages/AllOrders'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "reset-password/:token",
                element : <ResetPassword/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "purchase-cancel",
                element : <PurchaseCancel/>
            },
            {
                path : "purchase-success",
                element : <PurchaseSuccessPage/>

            },
            

            
           
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },{
                        path : "total-sales",
                        element : <AnalyticsTab/>
                    },{
                        path : "add-orders",
                        element : <AllOrders/>
                    }
                ]
            },
            {
                path:"user-panel",
                element:<UserPanel/>,
                children:[
                    {
                        path:"my-profile",
                        element:<UserProfile/>
                
                    },
                    {
                        path:"purchase-history",
                        element:<PurchaseHistory/>
                    }
                ]
            },
        ]
    }
])


export default router