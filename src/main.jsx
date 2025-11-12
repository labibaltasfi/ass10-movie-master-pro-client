import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.jsx'
import RootLayout from './Routes/RootLayout';
import Home from './Pages/Home';
import AllMoviesPage from './Pages/AllMoviesPage.jsx';
import AuthProvider from './context/AuthProvider.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        path:"/",
        Component: Home ,
        loader: () => fetch("../../public/movies.json"),
      },
      {
        path: "allMovies",
        Component: AllMoviesPage
      },
     
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
