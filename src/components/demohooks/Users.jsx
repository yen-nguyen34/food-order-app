import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error(`HTTP Response Status ${response.status}`);
      } else {
        const resData = await response.json();
        setUsers(resData);
        console.log("sucessfully", resData);
      }
    };
    // Call the function
    loadUsers();
  }, []);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>User Name: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Address:</p>
            <ul>
              <li>
                <p>Street: {user.address.street}</p>
                <p>Suite: {user.address.suite}</p>
                <p>City: {user.address.city}</p>
                <p>Zipcode: {user.address.zipcode}</p>
              </li>
            </ul>

            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>

            <p>Company:</p>
            <ul>
              <li>
                <p>Company Name: {user.company.name}</p>
                <p>Company catch phrase: {user.company.catchPhrase}</p>
                <p>Target Model: {user.company.bs}</p>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
