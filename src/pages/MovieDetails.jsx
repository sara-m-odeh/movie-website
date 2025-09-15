import React, { useEffect, useState } from "react";
import style from "../styling/movieDetailsStyling.module.css";
import Card from "../components/Card";
import { useParams } from "react-router-dom";

const MovieDetails = ({}) => {
  const { id, type } = useParams();
  const [data, setData] = useState({});
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showGenres, setShowGenres] = useState("");
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=28032ef08452e11c517b303b00b355f3`
    )
      .then((res) => res.json())
      .then((data) => {
        setData({
          poster: `https://image.tmdb.org/t/p/w300/${data.poster_path}`,
          backDrop: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`,
          tagLine: data.tagline,
          title: data.name ?? data.title,
          overview: data.overview,
          genres: data.genres,
          seasons: data.seasons,
        });
      });
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=28032ef08452e11c517b303b00b355f3`
    )
      .then((res) => res.json())
      .then((data) => {
        for (let index = 0; index < 5; index++) {
          setCast((pre) => {
            return [
              ...pre,
              {
                img: `https://image.tmdb.org/t/p/w200/${data.cast[index]?.profile_path}`,
                name: data.cast[index]?.name,
              },
            ];
          });
        }
      });
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=28032ef08452e11c517b303b00b355f3`
    )
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((video, index) => {
          //to only show at most 10 videos of this show
          if (index < 10)
            setVideos((pre) => {
              return [
                ...pre,
                {
                  id: video.key,
                  name: video.name,
                },
              ];
            });
        });
      });
  }, []);
  useEffect(() => {
    data.genres?.forEach((genre) => {
      setShowGenres((pre) => `${pre}&with_genres=${genre.id}`);
    });
  }, [data]);
  useEffect(() => console.log(showGenres));
  return (
    <div className={style.container}>
      <img className={style.backImg} src={data.backDrop} />
      <div className={style.content}>
        <img className={style.poster} src={data.poster} />
        <div className={style.data}>
          <p className={style.title}>{data.title}</p>
          <p className={style.tagLine}>{data.tagLine}</p>
          {data.genres?.map((genre, index) => (
            <li key={index} className={style.genre}>
              {genre.name}
            </li>
          ))}
          <p className={style.desc}>{data.overview}</p>
          <p style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Casts</p>
          <div className={style.cast}>
            {cast.map((person, index) => (
              <div className={style.card} key={index}>
                <img
                  src={person.img}
                  alt="profile image"
                  className={style.img}
                />
                <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
                  {person.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {videos?.map((video, index) => (
        <div className={style.videos} key={index}>
          <h3 style={{ margin: "1rem" }}>{video.name}</h3>
          <iframe
            width="90%"
            height="600"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=0&controls=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ margin: "3rem", marginTop: "auto" }}
          ></iframe>
        </div>
      ))}
      {data.seasons ? (
        <div className={style.padding}>
          <p className={style.head}>Seasons </p>
          <div className={style.collection}>
            {data.seasons?.map((season, index) =>
              index < 4 ? (
                <Card
                  posterSrc={`https://image.tmdb.org/t/p/w300/${season.poster_path}`}
                  type="tv"
                  name={season.name}
                  key={index}
                  showId={season.id}
                  urlSeason={
                    "https://api.themoviedb.org/3/tv/96648/season/1?api_key=28032ef08452e11c517b303b00b355f3&page=1"
                  }
                />
              ) : (
                <></>
              )
            )}
            {data.seasons.length > 4 && (
              <div className={style.moreSeasons}>...</div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MovieDetails;
