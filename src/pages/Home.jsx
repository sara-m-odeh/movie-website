import React from "react";
import HeroSection from "../components/HeroSection";
import Card from "../components/Card";
import Collection from "../components/Collection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Collection
        title="Trending Movies"
        type="movie"
        url="https://api.themoviedb.org/3/trending/movie/week?api_key=28032ef08452e11c517b303b00b355f3&language=en-US&region=JO"
      />
      <Collection
        title="Top Rated Movies"
        type="movie"
        url="https://api.themoviedb.org/3/movie/top_rated?api_key=28032ef08452e11c517b303b00b355f3&language=en-US&page=1&region=JO"
      />
      <Collection
        title="Trending TV"
        type="tv"
        url="https://api.themoviedb.org/3/trending/tv/week?api_key=28032ef08452e11c517b303b00b355f3&language=en-US&page=1&region=JO"
      />
      <Collection
        title="Top Rated TV"
        type="tv"
        url="https://api.themoviedb.org/3/tv/top_rated?api_key=28032ef08452e11c517b303b00b355f3&language=en-US&page=1&region=JO"
      />
    </div>
  );
};

export default Home;
