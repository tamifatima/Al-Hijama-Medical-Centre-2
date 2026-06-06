import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const AppContext = createContext();

const ADMIN_USER = { id: 'admin-001', name: 'Admin', email: 'admin@alhijama.com', password: 'Admin@123', role: 'admin' };

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : null;
          if (userData) {
            const currentUser = {
              id: firebaseUser.uid,
              name: userData.name,
              email: userData.email,
              role: userData.role || 'user',
            };
            setUser(currentUser);
            await loadBookings(currentUser);
          } else {
            setUser(null);
            setBookings([]);
          }
        } catch (error) {
          console.error('Firebase auth state failed:', error);
          setUser(null);
          setBookings([]);
        }
      } else {
        setUser(null);
        setBookings([]);
      }
    });

    return unsubscribe;
  }, []);

  const loadBookings = async (currentUser) => {
    if (!currentUser) {
      setBookings([]);
      return;
    }

    try {
      const bookingsQuery = currentUser.role === 'admin'
        ? query(collection(db, 'bookings'))
        : query(collection(db, 'bookings'), where('userId', '==', currentUser.id));
      const snapshot = await getDocs(bookingsQuery);
      setBookings(snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() })));
    } catch (error) {
      console.error('Failed to load bookings:', error);
      setBookings([]);
    }
  };

  const parseAuthError = (error) => {
    const code = error?.code || '';
    switch (code) {
      case 'auth/invalid-credential':
        return 'Invalid authentication credential. Please retry or clear browser cache.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
        return 'No account found with that email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Contact support if needed.';
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try signing in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Use at least 6 characters.';
      case 'auth/network-request-failed':
        return 'Network request failed. Check your internet connection and try again.';
      default:
        return error?.message || 'Authentication failed. Please try again.';
    }
  };

  const createAdminUserDoc = async (firebaseUser) => {
    const adminData = {
      name: ADMIN_USER.name,
      email: ADMIN_USER.email,
      role: ADMIN_USER.role,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', firebaseUser.uid), adminData);
    return adminData;
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const login = async (email, password) => {
    const normalizedEmail = email.trim();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
      const firebaseUser = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      if (!userData) {
        if (normalizedEmail === ADMIN_USER.email) {
          const adminData = await createAdminUserDoc(firebaseUser);
          const currentUser = {
            id: firebaseUser.uid,
            name: adminData.name,
            email: adminData.email,
            role: adminData.role,
          };
          setUser(currentUser);
          await loadBookings(currentUser);
          return { success: true, role: currentUser.role };
        }

        return { success: false, error: 'User record not found in Firebase' };
      }

      const currentUser = {
        id: firebaseUser.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user',
      };
      setUser(currentUser);
      await loadBookings(currentUser);
      return { success: true, role: currentUser.role };
    } catch (error) {
      console.error('Login failed:', error.code, error.message);
      const shouldCreateAdmin = normalizedEmail === ADMIN_USER.email && password === ADMIN_USER.password;
      const canAutoCreateAdmin = error.code === 'auth/user-not-found';
      if (shouldCreateAdmin && canAutoCreateAdmin) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
          const firebaseUser = userCredential.user;
          const adminData = await createAdminUserDoc(firebaseUser);
          const currentUser = {
            id: firebaseUser.uid,
            name: adminData.name,
            email: adminData.email,
            role: adminData.role,
          };
          setUser(currentUser);
          await loadBookings(currentUser);
          return { success: true, role: currentUser.role };
        } catch (createError) {
          console.error('Admin creation failed:', createError.code, createError.message);
          return { success: false, error: parseAuthError(createError) };
        }
      }

      return { success: false, error: parseAuthError(error) };
    }
  };

  const register = async (name, email, password) => {
    try {
      const role = email === ADMIN_USER.email ? ADMIN_USER.role : 'user';
      if (role === ADMIN_USER.role && password !== ADMIN_USER.password) {
        return { success: false, error: 'Admin password is not correct.' };
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const newUser = {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);

      const currentUser = { id: firebaseUser.uid, name, email, role };
      setUser(currentUser);
      await loadBookings(currentUser);
      return { success: true };
    } catch (error) {
      console.error('Register failed:', error.code, error.message);
      return { success: false, error: parseAuthError(error) };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
    setBookings([]);
  };

  const addBooking = async (data) => {
    const bookingData = {
      ...data,
      userId: user?.id,
      userName: user?.name || data.fullName,
      createdAt: new Date().toISOString(),
      isApproved: false,
    };
    const docRef = await addDoc(collection(db, 'bookings'), bookingData);
    const newBooking = { id: docRef.id, ...bookingData };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const approveBooking = async (id) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { isApproved: true });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, isApproved: true } : b));
      showToast('Booking approved successfully!');
    } catch (error) {
      console.error('Approve booking failed:', error);
      showToast('Unable to approve booking.', 'error');
    }
  };

  const deleteBooking = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      setBookings(prev => prev.filter(b => b.id !== id));
      showToast('Booking deleted.', 'warning');
    } catch (error) {
      console.error('Delete booking failed:', error);
      showToast('Unable to delete booking.', 'error');
    }
  };

  const getUserBookings = () => {
    if (!user) return [];
    return bookings.filter(b => b.userId === user.id);
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      register,
      logout,
      bookings,
      addBooking,
      approveBooking,
      deleteBooking,
      getUserBookings,
      toast,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() { return useContext(AppContext); }
