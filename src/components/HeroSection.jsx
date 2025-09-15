import React, { useEffect, useState } from "react";
import styling from "../styling/heroSectionStyling.module.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [filmInfo, setFilmInfo] = useState({});
  const [arrayCounter, setArrayCounter] = useState(0);
  const [trailer, setTrailer] = useState("");
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=28032ef08452e11c517b303b00b355f3"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFilmInfo({
          id: data.results[arrayCounter].id,
          title: data.results[arrayCounter].title,
          overview: data.results[arrayCounter].overview,
          backDrop: `https://image.tmdb.org/t/p/w500/${data.results[arrayCounter].backdrop_path}`,
          poster: `https://image.tmdb.org/t/p/w300/${data.results[arrayCounter].poster_path}`,
        });
      })
      .catch((err) => console.log(err));
  }, [arrayCounter]);
  // fetch trailer
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${filmInfo.id}/videos?api_key=28032ef08452e11c517b303b00b355f3`
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((video) => {
          if (video.type == "Trailer") setTrailer(video.key);
        });
      });
  }, [filmInfo]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setArrayCounter((prev) => {
        if (prev == 19) return 0;
        else return prev + 1;
      });
    }, 5000);
    return () => clearTimeout(timer);
  });
  return (
    <div
      className={styling.container}
      style={{ backgroundImage: `url(${filmInfo.backDrop})` }}
    >
      <div className={styling.data}>
        <h2 className={styling.flimName}>{filmInfo.title}</h2>
        <p className={styling.overview}>{filmInfo.overview}</p>
        <Link
          className={styling.watchBtn}
          to={`/moviedetail/movie/${filmInfo.id}`}
        >
          Watch now
        </Link>
        <Link
          className={styling.watchTrailerBtn}
          to={`https://www.youtube.com/embed/${trailer}?autoplay=0&controls=1`}
          target="_blank"
        >
          Watch trailer
        </Link>
      </div>
      <img src={filmInfo.poster} alt="poster" className={styling.poster} />
    </div>
  );
};

export default HeroSection;
