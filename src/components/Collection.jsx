import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Card from "../components/Card";
import styling from "../styling/collectionStyling.module.css";
import { Link } from "react-router-dom";

const Collection = ({ title, url, type }) => {
  //to move cards left and right
  const [counter, setCounter] = useState(0);
  // data array that store needed movies/TV
  const [data, setData] = useState([]);
  const flag = type == "tv" ? true : false;
  function moveLeft() {
    setCounter((pre) => {
      if (pre == 0) return 15;
      return pre - 1;
    });
  }
  function moveRight() {
    setCounter((pre) => {
      if (pre == 15) return 0;
      return pre + 1;
    });
  }
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.results.forEach((result) => {
          setData((pre) => {
            return [
              ...pre,
              {
                poster: `https://image.tmdb.org/t/p/w200/${result.poster_path}`,
                id: result.id,
                name: result.title ?? result.name,
                // if its movie it will the first one if its tv series it will return the second one
              },
            ];
          });
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styling.container}>
      <h2>{title}</h2>
      {flag ? (
        <Link to="/tvseries" className={styling.moreBtn}>
          view more
        </Link>
      ) : (
        <Link to="/movies" className={styling.moreBtn}>
          view more
        </Link>
      )}
      <div className={styling.cards}>
        <div onClick={moveLeft} className={styling.prevBtn}>
          <FaArrowLeft />
        </div>
        <Card
          name={data[counter]?.name}
          posterSrc={data[counter]?.poster}
          type={type}
          showId={data[counter]?.id}
        />
        <Card
          type={type}
          name={data[counter + 1]?.name}
          posterSrc={data[counter + 1]?.poster}
          showId={data[counter + 1]?.id}
        />
        <Card
          type={type}
          name={data[counter + 2]?.name}
          posterSrc={data[counter + 2]?.poster}
          showId={data[counter + 2]?.id}
        />
        <Card
          type={type}
          name={data[counter + 3]?.name}
          posterSrc={data[counter + 3]?.poster}
          showId={data[counter + 3]?.id}
        />
        <Card
          type={type}
          name={data[counter + 4]?.name}
          posterSrc={data[counter + 4]?.poster}
          showId={data[counter + 4]?.id}
        />
        <div className={styling.nextBtn} onClick={moveRight}>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Collection;
