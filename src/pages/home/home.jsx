import React, { useState } from "react";
import "./style.scss";
import GenreRandom from "./genreRandom/GenreRandom";
import useFetch from "../../hooks/useFetch";


const Home = () => {

    const { data: genresData } = useFetch(`/genre/movie/list`);

    return (
        <div className="homePage">
            {genresData?.genres?.map((item) => {
              return(
                <GenreRandom 
                  genre={item}
                  pageNum={Math.floor(Math.random() * 100)}
                />
              );
              
            })}
        </div>
    );
};

export default Home;
