import './App.css';
import { Outlet } from 'react-router';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks';

function App() {
  useQueryParamsStoreInit();

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
