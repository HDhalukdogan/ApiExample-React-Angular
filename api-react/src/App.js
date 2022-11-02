import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import UserCard from './UserCard';
import { Container } from '@mui/material';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ListComponent from './ListComponent';
import FileUpload from './FileUpload';
import Work from './Work';
//https://laratutorials.com/react-datatables-dynamic-data-example/
function App() {
  const [users, setUsers] = useState([]);
  const [entities, setEntities] = useState([]);


  useEffect(() => {

    axios.get("http://localhost:5065/api/SampleEntities").then((response) => {
      setEntities(response.data);
    });
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:5065/api/Account/getAllUser");
    setUsers(response.data);
  }


  if (users == null) {
    return <div><h1>Users cannot fecth</h1></div>
  }
  return (
    <div className="App">
      <Work/>
      <Container>
        {entities.length > 0 && <ListComponent data={entities} />}
        <h1>Users</h1>
        {users.map((user) => (
          <UserCard key={user.id} userName={user.userName} email={user.email} />
        ))}
      </Container>
      <FileUpload/>
    </div>
  );
}

export default App;
