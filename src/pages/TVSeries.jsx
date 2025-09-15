import React from "react";
import Movies from "./Movies";

const TVSeries = ({ genresURL, searchByName, searchByGenre }) => {
  return (
    <div>
      <Movies
        genresURL={genresURL}
        searchByGenre={searchByGenre}
        searchByName={searchByName}
        type="tv"
      />
    </div>
  );
};

export default TVSeries;
