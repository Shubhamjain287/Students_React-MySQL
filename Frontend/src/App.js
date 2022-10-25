import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddStudent from './pages/AddStudent';
import Home from './pages/Home';
import ViewStudent from './pages/ViewStudent';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/updatestudent/:userID" element={<AddStudent />} />
          <Route path="/viewstudent/:userID" element={ <ViewStudent /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
