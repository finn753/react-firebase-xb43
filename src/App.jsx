import { useEffect, useState } from "react";
import "./App.css";
import AuthComp from "./components/AuthComp";
import { db } from "./config/firebase.js";
import { getDocs, collection, addDoc } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieRelease, setNewMovieRelease] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieRelease,
        receivedAnOscar: newMovieOscar,
      });

      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <AuthComp />

      <div>
        <input
          placeholder="Title"
          onChange={(e) => {
            setNewMovieTitle(e.target.value);
          }}
        />
        <input
          placeholder="Released"
          type="number"
          onChange={(e) => {
            setNewMovieRelease(Number(e.target.value));
          }}
        />
        <input
          type="checkbox"
          checked={newMovieOscar}
          onChange={(e) => {
            setNewMovieOscar(e.target.checked);
          }}
        />
        <label>Recieved an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <p>Release: {movie.releaseDate}</p>

            {movie.receivedAnOscar ? (
              <p>Has received an Oscar</p>
            ) : (
              <p>Has not received an Oscar</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
