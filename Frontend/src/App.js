import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddStudent from './pages/AddStudent';
import Home from './pages/Home';
import ViewStudent from './pages/ViewStudent';
import './App.css';
import Navbar from './pages/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/updatestudent/:enrollmentID" element={<AddStudent />} />
          <Route path="/viewstudent/:enrollmentID" element={ <ViewStudent /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
