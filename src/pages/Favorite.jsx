import { useState } from "react";
import FavCard from "../components/FavCard";
import styling from "../styling/favoriteStyling.module.css";
import { atom, useAtom } from "jotai";
import React from "react";

export const favorites = atom(
  JSON.parse(localStorage.getItem("favShows")) || []
);

const Favorite = () => {
  const [favShows, setFavShows] = useAtom(favorites);
  return favShows.length == 0 ? (
    <div className={styling.emptyMessage}>
      No favorites yet! Tap the ❤️ icon on any movie to add it here.
    </div>
  ) : (
    <div className={styling.container}>
      <ul className={styling.items}>
        {favShows.map((show, index) => (
          <li key={index}>
            <FavCard
              name={show.name}
              poster={show.poster}
              vote={show.vote}
              date={show.date}
              genres={show.genresArray}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;
