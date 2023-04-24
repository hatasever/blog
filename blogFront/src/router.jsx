import { Navigate, createBrowserRouter } from "react-router-dom";
import  Login  from "./views/auth/login";
import  Register  from "./views/auth/register";
import DefaultLayout from "./component/defaultLayout";
import { Children } from "react";
import Dashboard from "./views/dashboard";
import GuestLayout from "./component/guestLayout";
import NotFound from "./views/errors/notFound";
import Contentmanagement from "./views/contentmanagement";
import Users from "./views/users";
import Bloked from "./views/auth/bloked";
import NotPermition from "./views/errors/notPermition";
import FormContent from "./views/formContent";
import Contents from "./views/contents";
import Contentdetails from "./views/contentdetails";

const router = createBrowserRouter([

    {
        path: '/',
        element: <DefaultLayout/>,
        children:[
            {
                path:'/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/contentmanagement',
                element : <Contentmanagement />
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path:'/contents',
                element: <Contents />
            },
            {
                path: '/formContent/new',
                element: <FormContent key="newContent" />
            },
            {
                path: '/formContent/:id',
                element: <FormContent key="updateContent" />
            },
            {
                path: '/contentdetails/:id',
                element: <Contentdetails />
            }

        ]
    },
    {
        path:'/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/bloked',
                element: <Bloked />
            }
        ]
    },{
        path: '/permitiondenied',
        element: <NotPermition />
    },
    {
        path:'*',
        element:<NotFound/>
    }


]);

export default router;
