import React, { useState, useEffect } from "react";

function SongSearchResult({ songName }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Make API call to search for the song using the `songName`
    fetch(
      `https://sound-scribe.vercel.app/name/${encodeURIComponent(songName)}`
    )
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error("Error fetching API:", error));
  }, [songName]);

  if (searchResults.length > 0) {
    return (
      <a
        href={`https://sound-scribe.vercel.app/musicplayer/${searchResults[0].youtubeId}`}
        target="_blank"
        rel="noopener noreferrer">
        Play "{searchResults[0].title}" by {searchResults[0].artists[0].name}
      </a>
    );
  } else {
    return null; // Render nothing if no search results
  }
}

export default SongSearchResult;
