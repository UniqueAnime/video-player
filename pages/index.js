import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a specific anime episode page, e.g., anime-id-episode-2
    router.replace('/anime-id-episode-2');
  }, [router]);

  return null; // or some loading indicator
};

export default Home;
