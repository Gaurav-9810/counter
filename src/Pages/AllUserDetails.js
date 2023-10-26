import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AllUserDetails = () => {
      const [users, setUsers] = useState([]);
      const [searchusers, setSearchUsers] = useState([]);
      const [found, setFound] = useState(true);
      const [searchTerm, setSearchTerm] = useState('');
      const [pastSearches, setPastSearches] = useState([]);
      const [showPastSearches, setShowPastSearches] = useState(false);
    
      useEffect(() => {
        // Fetch user data and update the state
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json())
          .then((data) => {
            setUsers(data);
            setSearchUsers(data); // Set searchusers to the initial user data
          })
          .catch((error) => console.error('Error fetching user data:', error));
      
        // Retrieve past searches from local storage
        const storedSearches = localStorage.getItem('pastSearches');
        if (storedSearches) {
          setPastSearches(JSON.parse(storedSearches)); // Parse the stored JSON string
        } else {
          setPastSearches([]); // Initialize with an empty array if not found in local storage
        }
      }, []);
    
      // Save past searches to local storage when they change
    
      // Function to handle user search
      const handleSearch = () => {
        if (searchTerm.length === 0) {
          setSearchUsers(users);
          setFound(true);
        }
        if (searchTerm.length > 0) {
          // Filter the users based on the search term
          const filteredUsers = users.filter((user) =>
            user.name.toLowerCase() === searchTerm.toLowerCase()
          );
    
          if (filteredUsers.length === 0) {
            // No users found, display a message
            setFound(false);
            setSearchUsers([]);
          } else {
            // Users found, update the user list
            setFound(true);
            setSearchUsers(filteredUsers);
          }
    
          // Update pastSearches in the state first
          setPastSearches([...pastSearches, searchTerm]);
    
          // Then save it to local storage
          localStorage.setItem('pastSearches', JSON.stringify([...pastSearches, searchTerm]));
        }
      };
    
      // Function to sort users by name
      const handleSort = (order) => {
        const sortedUsers = [...searchusers]; // Sort the filtered list
        sortedUsers.sort((a, b) =>
          order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        setSearchUsers(sortedUsers);
      };
    
    const handleshow=(data)=>{
       localStorage.setItem('user',JSON.stringify(data))
    }
    
      return (
        <div className=' my-6 font-mono ' >
          <h1 className='text-xl font-mono font-bold'>User Search</h1>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Search</button>

          {found ? (
           <table className="user-table m">
           <thead>
             <tr>
               <th>Name</th>
               <th>Username</th>
               <th>Email</th>
               <th>Phone</th>
               <th></th>
             </tr>
           </thead>
           <tbody>
             {searchusers.map((user) => (
               <tr key={user.id}>
                 <td>{user.name}</td>
                 <td>{user.username}</td>
                 <td>{user.email}</td>
                 <td>{user.phone}</td>
                 <Link to="/show"><td className='bg-green-400 hover:bg-green-500 rounded-lg  ' onClick={()=>handleshow(user)} >Show more</td></Link>
               </tr>
             ))}
           </tbody>
         </table>
          ) : (
            <h1>No User found</h1>
          )}
          <div>
            <button onClick={() => handleSort('asc')}>Sort A-Z</button>
            <button onClick={() => handleSort('desc')}>Sort Z-A</button>
          </div>
          <div>
            <button onClick={() => setShowPastSearches(!showPastSearches)}>
              {showPastSearches ? 'Hide Past Searches' : 'Show Past Searches'}
            </button>
            {showPastSearches && (
              <div>
                <h2>Past Searches:</h2>
                <ul>
                  {pastSearches.map((search, index) => (
                    <li key={index}>{search}</li>
                  ))} {/* Missing closing parenthesis for map */}
                </ul>
              </div>
            )}
          </div>
        </div>
      );
}

export default AllUserDetails