import { useEffect, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'; // Import Plyr styles

const Watch = ({ sources }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (sources.length > 0) {
      const plyr = new Plyr('#player');
      setPlayer(plyr);
    }
  }, [sources]);

  return (
    <div id="anime-player" style={styles.playerContainer}>
      {sources.length > 0 ? (
        <video id="player" controls style={styles.video}>
          <source src={sources[0].file} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No anime found or invalid data format.</p>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { animeId, episode } = context.query;
  let sources = [];

  if (animeId && episode) {
    const apiUrl = `https://anime-api-opal.vercel.app/vidcdn/watch/${animeId}/${episode}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.sources) {
      sources = data.sources;
    }
  }

  return {
    props: { sources },
  };
}

const styles = {
  playerContainer: {
    maxWidth: '100%',
    margin: '0 auto',
    background: '#000',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    padding: '0',
    textAlign: 'center',
  },
  video: {
    maxWidth: '100%',
  },
};

export default Watch;
  
