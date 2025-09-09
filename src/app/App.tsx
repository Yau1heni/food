import './App.css';
import { Outlet } from 'react-router';

function App() {
  return (
    <div>
      <Outlet />
      App
    </div>
  );
}

export default App;
