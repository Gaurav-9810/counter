import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShowDetail = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div>
      {user ? (
        <div className='mt-6 font-mono'>
          <h2 className='text-xl font-mono font-bold my-2'>User Details</h2>
          <table className="user-table m">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Username</th>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th>Website</th>
                <td>{user.website}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>
                  <ul>
                    <li>Street: {user.address.street}</li>
                    <li>Suite: {user.address.suite}</li>
                    <li>City: {user.address.city}</li>
                    <li>Zipcode: {user.address.zipcode}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>Company</th>
                <td>
                  <ul>
                    <li>Name: {user.company.name}</li>
                    <li>Catch Phrase: {user.company.catchPhrase}</li>
                    <li>BS: {user.company.bs}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
      <Link to='/'> <div className='bg-green-500 hover:bg-green-600 w-14 text-white text-center py-1 px-2 rounded-lg my-4 cursor-pointer'>back</div></Link>
    </div>
  );
};

export default ShowDetail;
