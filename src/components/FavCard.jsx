import React, { useEffect, useState } from "react";
import style from "../styling/favCardStyling.module.css";
import { FaTrash, FaStar } from "react-icons/fa";
import { favorites } from "../pages/Favorite";
import { useAtom } from "jotai";

const FavCard = ({ name, poster, vote, genres, date }) => {
  const [favShows, setFavShows] = useAtom(favorites);
  function removeFavorite() {
    let favList = favShows;
    favList = favList.filter((item) => {
      return item.name != name;
    });
    localStorage.setItem("favShows", JSON.stringify(favList));
    setFavShows(favList);
  }
  useEffect(() => console.log(name, poster, vote, genres, date), []);
  return (
    <div className={style.container}>
      <img src={poster} alt="poster" className={style.image} />
      <FaTrash className={style.deleteBtn} onClick={removeFavorite} />
      <h3 className={style.name}>{name}</h3>
      <p className={style.date}>{date}</p>
      <p className={style.vote}>
        <FaStar style={{ color: "#FFD700", marginRight: "0.4rem" }} />
        {vote}
      </p>
      <ul className={style.genres}>
        {genres?.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavCard;
