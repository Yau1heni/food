import './App.css';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import rootStore from 'store/RootStore';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks';

function App() {
  useQueryParamsStoreInit();

  useEffect(() => {
    rootStore.favorites.getFavorites();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
