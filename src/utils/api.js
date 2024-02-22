import axios from "axios"

const BASE_URL="https://api.themoviedb.org/3"
const TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjViNTBmYjcyNzY4ODE4OWU5ZjFjNjBkMDZlNjFmOCIsInN1YiI6IjY1ZDFmZGJlYTA2NjQ1MDE0YTE5NjRmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-AeBmkMOsQRqCsSYDeb5KqNaCsDDuM6sAQAaaEPDMyM";


const headers={
    Authorization: "bearer "+TMDB_TOKEN,
};

export const fetchDataFromApi = async(url,params)=>{

    try{
        const {data}=await axios.get(BASE_URL+url,{
            headers,
            params
        })
        return data;
    }
    catch (err){
        console.log(err);
        return err;
    }
}