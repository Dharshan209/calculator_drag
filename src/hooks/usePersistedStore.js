import { useEffect } from 'react';

const usePersistedStore = (store, key) => {
  // Load persisted state on mount
  useEffect(() => {
    const persistedState = localStorage.getItem(key);
    if (persistedState) {
      store.setState(JSON.parse(persistedState));
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      localStorage.setItem(key, JSON.stringify(state));
    });

    return () => unsubscribe();
  }, []);

  return store;
};

export default usePersistedStore;