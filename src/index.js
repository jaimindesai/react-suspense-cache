import React, { useState, Suspense } from "react";
import ReactDOM from "react-dom";
import { unstable_createResource as createResource } from "react-cache";
import fetchMovies from "./fetch-movies";
const myMovie = createResource(fetchMovies);
function MovieInfo({ moiveName }) {
  const movie = myMovie.read(moiveName);
  return <pre>{JSON.stringify(movie || "Unknown", null, 2)}</pre>;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <input
        placeholder="Search Movie"
        onChange={e => setSearchTerm(e.target.value)}
      />
      {searchTerm ? (
        <Suspense fallback={<div>loading...</div>}>
          <MovieInfo moiveName={searchTerm} />
        </Suspense>
      ) : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
