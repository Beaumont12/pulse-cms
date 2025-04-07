import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';
import LoadingScreen from './LoadingScreen'; // make sure the path is correct!

export default function ProtectedRoute({ children, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const roleSnap = await get(ref(db, `users/${currentUser.uid}/role`));
        setRole(roleSnap.exists() ? roleSnap.val() : null);
      } else {
        setUser(null);
        setRole(null);
      }
      setChecking(false);
    });

    return () => unsub();
  }, []);

  if (checking) return <LoadingScreen />;

  if (!user || !allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
}
