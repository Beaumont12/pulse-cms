import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, db } from '../firebase';

export default function ProtectedRoute({ children, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const roleSnap = await get(ref(db, `users/${user.uid}/role`));
        setRole(roleSnap.exists() ? roleSnap.val() : null);
      }
      setChecking(false);
    });

    return () => unsub();
  }, []);

  if (checking) return <p>Checking auth...</p>;

  if (!user) return <Navigate to="/" />;

  if (!allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
}
