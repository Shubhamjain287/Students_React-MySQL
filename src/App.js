import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddStudent from './pages/AddStudent';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddStudent" element={<AddStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
