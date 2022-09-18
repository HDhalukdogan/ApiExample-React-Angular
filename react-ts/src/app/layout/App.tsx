import {  Route, Routes } from "react-router-dom";
import SampleDetails from '../../features/sample/SampleDetails';
import Sample from '../../features/sample/Sample';
import Header from "./Header";
import SampleCreate from "../../features/sample/SampleCreate";
import SampleEdit from "../../features/sample/SampleEdit";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {

  const dispatch = useDispatch()

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser() as any)
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])
  useEffect(() => {
    initApp()
  }, [initApp])
  return (
    <div className="App">
      <Header />
      <div className="container">
      <Routes>
        <Route path='/' element={<Sample />} />
        <Route path='/details/:id' element={<SampleDetails />} />
        <Route path='/create' element={<SampleCreate />} />
        <Route path='/edit/:id' element={<SampleEdit />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
