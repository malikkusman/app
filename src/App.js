import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div className="movie-form">
        <h2>Add a New Movie</h2>
        <input
          className="input-field"
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <label className="checkbox-label">
          Received an Oscar
          <input
            className="checkbox-field"
            type="checkbox"
            checked={isNewMovieOscar}
            onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          />
        </label>
        <button className="submit-button" onClick={onSubmitMovie}>
          Submit Movie
        </button>
      </div>

      <div className="movie-list">
        <h2>Movie List</h2>
        {movieList.map((movie) => (
          <div className="movie-item" key={movie.id}>
            <h3 className={movie.receivedAnOscar ? "green" : "red"}>
              {movie.title}
            </h3>
            <p>Release Date: {movie.releaseDate}</p>
            <button
              className="delete-button"
              onClick={() => deleteMovie(movie.id)}
            >
              Delete Movie
            </button>
            <div className="update-title">
              <input
                className="input-field"
                placeholder="New title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button
                className="update-button"
                onClick={() => updateMovieTitle(movie.id)}
              >
                Update Title
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="file-upload">
        <h2>Upload File</h2>
        <input
          type="file"
          className="file-input"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button className="upload-button" onClick={uploadFile}>
          Upload File
        </button>
      </div>
    </div>
  );
}

export default App;
