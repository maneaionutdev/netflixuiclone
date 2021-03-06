import React, { useState, useEffect } from 'react'
import axios from '../../api/axios';
import requests from '../../api/requests';
import './Banner.css'


function Banner({ handleClick }) {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        // Fetching the movies
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            // Setting the banner to be a random movie
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            );
            return request;
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}

        >
            <div className="banner__content">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner__buttons">
                    <button onClick={handleClick} className="banner__button">
                        Play

                    </button>

                    <button className="banner__button">
                        My List

                    </button>
                </div>

                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
                <div className="banner--fadeBottom" />
            </div>
        </header >
    )
}

export default Banner