import SignIn from "./Components/Forms/SignIn";
import {Routes, Route} from "react-router-dom"
import PdfForm from './Components/Forms/SendToSign/PdfForm';
import PageContext from './Context/PageContext';
import { useState } from 'react';
import Loader from './Components/Loader/Loader';
import "./css/index.css";
import Banner from "./Pages/BannerPaper";
import Navbar from "./Pages/Nabvar";
import Homepage from "./Pages/Homepage";
import PdfLists from "./Components/PdfLists/PdfLists";

function App() {
  const [token, setToken] = useState('');
  const isLoggedIn = token !== '';
  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <PageContext.Provider value={{ token, setToken }}>
      
      <Routes>
        <Route exact path='/' element={<SignIn />} />
        <Route path="/home" element={<Homepage />} />
        <Route path='/sendpdf' element={<PdfForm />} />
        <Route path='/loader' element={<Loader />} />
        <Route path='/banner' element={<Banner />} />
        <Route path='/pdflists' element={<PdfLists />} />
      </Routes>
        
      </PageContext.Provider>
    </div>
  );
}

export default App;
