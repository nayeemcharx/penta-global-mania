import { useState ,useEffect} from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {fetchDataFromApi} from"./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfiguration} from "./store/homeSlice"
import Header from './components/header/header'
import Home from './pages/home/home'
import Query from './pages/Query/Query'
import NotFound from './pages/notFound/notFound'
import Details from "./pages/details/Details"
import WishList from './pages/wishList/WishList'

function App() {
  const dispatch = useDispatch()
  const {url}=useSelector((state)=>state.home)
  console.log(url)
  useEffect(()=>{
    fetchApiConfig();
  },[])
  const fetchApiConfig=() =>{
    fetchDataFromApi('/configuration')
    .then((res)=>{
      // console.log(res)
      const url={
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",

      }
      dispatch(getApiConfiguration(url))
    });
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/query" element={<Query/>} />
          <Route path="/wishlist" element={<WishList/>} />
          <Route path="*" element={<NotFound code={"404"} message={"Page not found!"}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
