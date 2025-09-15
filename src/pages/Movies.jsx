import React, { useEffect, useState, useRef } from "react";
import Card from "../components/Card";
import styling from "../styling/moviesStyling.module.css";

const Movies = ({ genresURL, searchByName, searchByGenre, type = "movie" }) => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userGenre, setUserGenre] = useState("");
  const [pageCounter, setPageCounter] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const viewMoreBtn = useRef();

  //to show the user input if its not found
  const previousUserInput = useRef("");
  function getData(url) {
    fetch(`${url}&page=${pageCounter}&include_adult=false`)
      .then((res) => res.json())
      .then((data) => {
        if (pageCounter === data.total_pages) {
          viewMoreBtn.current.style.display = "none";
        }
        if (data.results?.length == 0) setNotFound(true);
        else
          data.results?.forEach((result) => {
            setData((pre) => {
              return [
                ...pre,
                {
                  poster: `https://image.tmdb.org/t/p/w200/${result.poster_path}`,
                  name: result.title ?? result.name,
                  id: result.id,
                },
              ];
            });
          });
      })
      .catch((err) => console.error(err));
  }

  function getGneres() {
    fetch(genresURL)
      .then((res) => res.json())
      .then((data) => {
        data.genres.forEach((item) => {
          setGenres((pre) => {
            return [
              ...pre,
              {
                id: item.id,
                name: item.name,
              },
            ];
          });
        });
      })
      .catch((err) => console.error(err));
  }

  function searchUserInput() {
    if (userInput == "") {
      alert("enter the name of movie/TV first");
    } else {
      setData([]);
      getData(`${searchByName}=${encodeURIComponent(userInput)}`);
      previousUserInput.current = userInput;
      setUserInput("");
    }
  }

  useEffect(() => getGneres(), []);
  useEffect(() => {
    console.log("use effect of the user genre");
    setData([]);
    getData(`${searchByGenre}=${userGenre}&language=en-US`);
  }, [userGenre]);
  return (
    <div className={styling.container}>
      <input
        type="text"
        placeholder="Type your movie name"
        className={styling.searchBar}
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
      />
      <button className={styling.searchBtn} onClick={searchUserInput}>
        Search
      </button>
      <span className={styling.gnereSearch}>
        <label htmlFor="genre-search" className={styling.genreLabel}>
          Search by Genre:
        </label>
        <select
          name="geners"
          id="genre-search"
          className={styling.genreList}
          onChange={(e) => {
            setUserGenre(e.target.value);
          }}
        >
          {genres.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </span>
      {notFound ? (
        <p className={styling.notFoundText}>
          "No results found for ' {previousUserInput.current} '. <br />
          Please check the spelling or try a different title."
        </p>
      ) : (
        <>
          <ul className={styling.items}>
            {data.map((movie, index) => (
              <li key={index}>
                <Card
                  name={movie.name}
                  posterSrc={movie.poster}
                  type={type}
                  showId={movie.id}
                />
              </li>
            ))}
          </ul>
          <button className={styling.viewMoreBtn} ref={viewMoreBtn}>
            view more
          </button>
        </>
      )}
    </div>
  );
};

export default Movies;
