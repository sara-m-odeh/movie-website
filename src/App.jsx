import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import NotFound from "./pages/NotFound";
import MainLayout from "./pages/MainLayout";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  const routing = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/movies"
          element={
            <Movies
              genresURL="https://api.themoviedb.org/3/genre/movie/list?api_key=28032ef08452e11c517b303b00b355f3&language=en-US"
              searchByName="https://api.themoviedb.org/3/search/movie?api_key=28032ef08452e11c517b303b00b355f3&query"
              searchByGenre="https://api.themoviedb.org/3/discover/movie?api_key=28032ef08452e11c517b303b00b355f3&with_genres"
            />
          }
        />
        <Route index element={<Home />} />
        <Route
          path="/tvseries"
          element={
            <TVSeries
              genresURL="https://api.themoviedb.org/3/genre/tv/list?api_key=28032ef08452e11c517b303b00b355f3&language=en-US"
              searchByName="https://api.themoviedb.org/3/search/tv?api_key=28032ef08452e11c517b303b00b355f3&query"
              searchByGenre="https://api.themoviedb.org/3/discover/tv?api_key=28032ef08452e11c517b303b00b355f3&with_genres"
            />
          }
        />
        <Route path="/moviedetail/:type/:id" element={<MovieDetails />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={routing} />;
};

export default App;
