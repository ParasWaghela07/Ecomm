import React, { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';

const Homepage = () => {
  // Get user and logout function from context
  const { user, logout } = useContext(FirebaseContext);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {user ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          
          <div className="space-y-4">
            {user.photoURL && (
              <div className="flex justify-center">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">
                {user.displayName || 'Not provided'}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="font-medium">
                {new Date(user.metadata.creationTime).toLocaleString()}
              </p>
            </div>
            
            <button
              onClick={logout}
              className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">No user is currently signed in</p>
          <p className="text-gray-500 mt-2">
            Please login to view your profile information
          </p>
        </div>
      )}
    </div>
  );
};

export default Homepage;