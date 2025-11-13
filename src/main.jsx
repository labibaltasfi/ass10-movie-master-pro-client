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
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import MovieDetails from './Pages/MovieDetails.jsx';
import AddMovie from './Pages/AddMoviePage.jsx';
import MyCollection from './Pages/MyCollection.jsx';





const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
        loader: () => fetch("../../public/movies.json"),
      },
      {
        path: "allMovies",
        Component: AllMoviesPage
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "/allMovies/:id",
        loader: ({params}) => fetch(`http://localhost:3000/allMovies/${params.id}`),
        Component: MovieDetails,
      },
      {
        path: "/addMovies",
        Component: AddMovie,
      },
      {
        path: "/myCollection",
        Component: MyCollection,
      },
     
      {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
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
