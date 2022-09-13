import { BrowserRouter, Route, Routes } from "react-router-dom";
import SampleDetails from './features/sample/SampleDetails';
import Sample from './features/sample/Sample';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Sample />} />
          <Route path='/details/:id'  element={<SampleDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
