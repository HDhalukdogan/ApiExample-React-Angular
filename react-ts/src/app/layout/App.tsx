import {  Route, Routes } from "react-router-dom";
import SampleDetails from '../../features/sample/SampleDetails';
import Sample from '../../features/sample/Sample';
import Header from "./Header";
import SampleCreate from "../../features/sample/SampleCreate";
import SampleEdit from "../../features/sample/SampleEdit";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";

function App() {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Sample />} />
        <Route path='/details/:id' element={<SampleDetails />} />
        <Route path='/create' element={<SampleCreate />} />
        <Route path='/edit/:id' element={<SampleEdit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
