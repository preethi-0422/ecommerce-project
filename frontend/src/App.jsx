import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;