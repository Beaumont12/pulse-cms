import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';
import LoadingScreen from './LoadingScreen';

export default function ProtectedRoute({ children, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      console.log('[AuthState] currentUser:', currentUser);
  
      if (currentUser) {
        setUser(currentUser);
        const roleSnap = await get(ref(db, `users/${currentUser.uid}/role`));
        const userRole = roleSnap.exists() ? roleSnap.val() : null;
        console.log('[Role] from Firebase:', userRole);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setChecking(false);
    });
  

    return () => unsub();
  }, []);

  if (checking) return <LoadingScreen />;

  if (!user || !allowedRoles.includes(role)) {
    console.warn('[🚫] Access Denied — Redirecting');
    return <Navigate to="/" />;
  }

  return children;
}
