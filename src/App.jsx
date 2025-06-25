import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import Link from "./pages/Link"
import Redirect from "./pages/Redirect"
import UrlProvider from "./context"
import RequireAuth from "./components/RequireAuth"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import ContactUs from "./pages/ContactUs"

const router = createBrowserRouter([
   {
        path: "/:id",
        element: <Redirect/>
      },
  {
    path: "/",
    element: <AppLayout/>,
    children:[
      {
        path: "",
        element: <LandingPage/>
      },
      {
        path: "/dashboard",
        element: (
            <Dashboard/>   
        )
      },
      {
        path: "/auth",
        element: <Auth/>
      },
      {
        path: "/link/:id",
        element: (
        <Link/>
        )
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy/>
      },
       {
        path: "/contact-us",
        element: <ContactUs/>
      },
    ]
  }
])

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}


export default App
