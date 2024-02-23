import React, { useState ,useEffect} from "react";
import "./style.css";
import {useNavigate} from "react-router-dom"
import {auth,db} from "../../config/firebase";
import {getDocs,collection,deleteDoc,doc} from "firebase/firestore"
import {useAuthState} from "react-firebase-hooks/auth"
import NotFound from "../notFound/notFound";
const WishList = () => {
    const navigate=useNavigate();
    const [user]=useAuthState(auth)
    const[movieList,setMovieList]=useState([])
    const movieCollectionRef=collection(db,`${auth?.currentUser?.uid}`)
    const getMovieList = async()=>{
      try{
        const wishdata = await getDocs(movieCollectionRef);
        const filteredData = wishdata.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
       }
       catch(err){
         console.log(err)
         console.log(auth?.currentUser?.uid)
       }
       
   }
    useEffect(()=>{
      
      getMovieList();
      console.log("test")
    },[user])
    const deleteMovie = async (id) =>{
      const movieDoc=doc(db,`${auth?.currentUser?.uid}`,id)
      await deleteDoc(movieDoc)
      getMovieList();
    }
    return (
        
        <div className="wish-list"  >
            {user ? (<ul>
            {movieList.map((item, index) => (
                <div>
                <li key={index}>
                <h3>{item.title}</h3>
                <p>{item.overview}</p>
                <div className="buttons">
                    <button className="button-62" onClick={() => deleteMovie(item.id)}>remove from watchlist</button>
                    <button className="button-62" onClick={() => navigate(`/movie/${item.movie_id}`)}>go to movie page</button>
                </div>
                </li>
                </div>
            ))}
            </ul>):<NotFound
                code={"Please sign in to continue"}
                message={""}
            />}
        </div>
        
        
    );
};

export default WishList;
