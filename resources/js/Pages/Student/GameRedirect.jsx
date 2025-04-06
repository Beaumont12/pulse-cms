import { useEffect } from 'react';

export default function GameRedirect() {
  useEffect(() => {
    window.location.href = 'https://your-unity-game-link.com'; // Replace this
  }, []);

  return <p>Redirecting you to the Unity Game...</p>;
}
