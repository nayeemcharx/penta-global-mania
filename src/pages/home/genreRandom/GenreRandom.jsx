import React, { useEffect, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";


import useFetch from "../../../hooks/useFetch";

function GenreRandom({genre,pageNum}) {
    
    
    
    const { data, loading } = useFetch(`/discover/movie?with_genres=${genre.id}&page=${pageNum+1}`);
    console.log(data)
    
    return (
        <div className="carouselSection">
            
            <Carousel
                data={data?.results}
                loading={loading}
                title={genre.name}
                endpoint={"movie"}
               
            />
        </div>
    );
};

export default GenreRandom