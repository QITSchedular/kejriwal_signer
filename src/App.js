import { FileUpload } from '@mui/icons-material';
import 'devextreme/dist/css/dx.light.css';
import SignerForm from './Components/Forms/FileUpload';
import SignIn from "./Components/Forms/SignIn";
import {Routes, Route} from "react-router-dom"


function App() {
  return (
    <div className="App">
      {/* <SignIn /> */}
      <Routes>
        <Route exact path='/' element={<SignerForm />} />
        <Route exact path='/signin' element={<SignIn />} />
      </Routes>
      
    </div>
  );
}

export default App;
