import React, { useEffect, useState } from "react";
import styling from "../styling/cardStyling.module.css";
import { FaHeart, FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import { favorites } from "../pages/Favorite";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import movieBig from "../images/movieBig.png";

const Card = ({ posterSrc, name, type, showId, urlSeason }) => {
  const [favShows, setFavShows] = useAtom(favorites);
  const [movement, setMovement] = useState(false);
  const [favoriteClicked, setFavoriteClicked] = useState(false);
  useEffect(() => {
    for (let show of JSON.parse(localStorage.getItem("favShows")) ?? []) {
      if (name == show.name) {
        setFavoriteClicked(true);
        break;
      }
    }
  });
  function editLocalStorge() {
    let favList = favShows ?? [];
    let flag = false;
    favList.forEach((item) => {
      if (item.id == showId) flag = true;
    });
    if (flag) {
      //remove from local storage
      favList = favList.filter((item) => {
        return item.id != showId;
      });
      localStorage.setItem("favShows", JSON.stringify(favList));
      setFavShows(favList);
      toast.success(`Removed "${name}" from favorites.`);
    } else {
      //add to local storage
      fetch(
        urlSeason
          ? urlSeason
          : `https://api.themoviedb.org/3/${type}/${showId}?api_key=28032ef08452e11c517b303b00b355f3&page=1`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let favShow = {
            name: data.name ?? data.title,
            poster: data.poster_path
              ? `https://image.tmdb.org/t/p/w200/${data.poster_path}`
              : movie,
            date:
              data.release_date?.substring(0, 4) ||
              data.last_air_date?.substring(0, 4),
            vote: data.vote_average,
            genresArray: data?.genres,
          };
          console.log(showId);
          favList.push(favShow);
          localStorage.setItem("favShows", JSON.stringify(favList));
          setFavShows(favList);
          toast.success(`"${name}" saved to favorites! ❤️`);
        })
        .catch((err) => console.log(err));
    }
  }

  return movement ? (
    <div className={styling.hovring} onMouseLeave={() => setMovement(false)}>
      <img
        src={posterSrc?.includes("null") ? movieBig : posterSrc}
        alt="poster"
        className={styling.hoveredImage}
      />
      <button
        type="button"
        className={favoriteClicked ? styling.favedShow : styling.favBtn}
        onClick={() => {
          editLocalStorge();
          setFavoriteClicked((pre) => !pre);
        }}
      >
        <FaHeart />
      </button>
      <Link className={styling.watchBtn} to={`/moviedetail/${type}/${showId}`}>
        <FaPlay />
      </Link>
      <h3>{name}</h3>
    </div>
  ) : (
    <div className={styling.container} onMouseMove={() => setMovement(true)}>
      <img
        src={posterSrc?.includes("null") ? movieBig : posterSrc}
        alt="poster"
        className={styling.image}
      />
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
