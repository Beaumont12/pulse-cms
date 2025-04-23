import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase'; // ✅ make sure this path matches your setup
import LoadingScreen from './LoadingScreen'; // optional — replace or remove if not using

export default function ProtectedRoute({ children, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const roleSnap = await get(ref(db, `users/${currentUser.uid}/role`));
          const userRole = roleSnap.exists() ? roleSnap.val() : null;
          setRole(userRole);
        } catch (err) {
          console.error('[Error fetching role]', err);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (checking) return <LoadingScreen />; // or return null

  if (!user || !allowedRoles.includes(role)) {
    console.warn('[🚫 Access Denied] Redirecting to login...');
    return <Navigate to="/" />;
  }

  return children;
}
