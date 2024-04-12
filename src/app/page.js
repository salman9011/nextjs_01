'use client'
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';


export default function HomePage() {
  const router = useRouter();

  const [users,setUsers] = useState([
    {id: 1, name: 'Salman', email: 'salman123@gmail.com', contact: '9999123498'},
    {id: 2, name: 'John', email: 'john.doe@example.com', contact: '1234567890'},
    {id: 3, name: 'Emily', email: 'emily.smith@example.com', contact: '9876543210'},
    {id: 4, name: 'Michael', email: 'michael87@gmail.com', contact: '5555555555'},
    {id: 5, name: 'Sara', email: 'sara.miller@example.com', contact: '7777777777'},
    {id: 6, name: 'Ahmed', email: 'ahmed_22@hotmail.com', contact: '3333333333'},
    {id: 7, name: 'Sophia', email: 'sophia.jackson@example.com', contact: '2222222222'},
    {id: 8, name: 'David', email: 'david.smith@example.com', contact: '6666666666'}
  ]);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [isOnline, setIsOnline] = useState(true); // Default to online

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleEdit = (id) => {
    setEditId(id);
    setEditName(users.find(user => user.id === id).name);
  };

  const handleSave = (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, name: editName };
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditId(null);
    setTimeout(() => {
      router.push('/display?message=Edit operation successful');
    }, 0); // Push the route after the state is updated
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setTimeout(() => {
      router.push('/display?message=Delete operation successful');
    }, 0); // Push the route after the state is updated
  };

  return (
    <div className="container">
      <div style={{ position: 'fixed', top: 0, width: '100%', background: 'white', padding: '10px', textAlign: 'center' }}>
        {isOnline ? 'Online ' : 'Offline '}
        {isOnline ? '🟢' : '🔴'}
      </div>
      <h1 className="heading" style={{ marginTop: '50px' }}>Data Listing</h1>
      <Table striped border hover style={{ width: '80%', margin: 'auto', marginTop: '100px' }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email, contact }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>
                {editId === id ? (
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                ) : (
                  name
                )}
              </td>
              <td>{email}</td>
              <td>{contact}</td>
              <td>
                {editId === id ? (
                  <Button variant="success" onClick={() => handleSave(id)}>Save</Button>
                ) : (
                  <Button variant="primary" onClick={() => handleEdit(id)}>Edit</Button>
                )}
                <Button variant="danger" onClick={() => handleDelete(id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}