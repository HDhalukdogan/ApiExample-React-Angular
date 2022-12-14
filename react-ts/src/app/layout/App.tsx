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
import { Button } from "react-bootstrap";
import agent from "../api/agent";
import HubStore from "../store/hubStore";

function App() {

  const dispatch = useDispatch()
  const hubStore = new HubStore();
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser() as any)
    } catch (error) {
      console.log(error);
    }
    hubStore.createHubConnection()
  }, [dispatch])
  useEffect(() => {
    initApp()
  }, [initApp])

  const fetchError=()=>{
    agent.Sample.list().then(res=>console.log(res.length)).catch(err=>alert(err.response.data))
  }
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Button onClick={fetchError}>Test error</Button>
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
