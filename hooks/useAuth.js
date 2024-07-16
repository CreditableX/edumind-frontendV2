import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AuthContext = createContext({
})

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null); // Authentication token

  // signup function
  const signup = async (username, password, name, email) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/students/register', {
        username,
        password,
        name,
        email
      });

      if (response.status === 201) {
        // Assuming the API returns the user data upon successful signup
        // do nothing for now
        return true;
      } else {
        throw new Error('Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  // login function
  const studentLogin = async (username, password) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/students/login', {
        username,
        password
      });
      console.log(response.data.student)
      if (response.status === 200) {
        console.log("login successful");
        // Assuming the API returns user data upon successful login
        // console.log(response.data.token);
        
        setName(response.data.student.name);
        setUsername(response.data.student.username);
        setToken(response.data.token);
        setEmail(response.data.student.email);
        setUserId(response.data.student.student_id);
        console.log(response.data);
        console.log("login name is " + name);
        console.log("login username is "  + username);
        console.log("login email is " + email);
        console.log("token is " + token);
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {

      setError(err.response?.data?.message || err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // logout function
  const logout = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('https://edumind-3587039ec3f2.herokuapp.com/v1/logout');
      if (response.status === 200) {
        setUsername(null);
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };


return (
  <AuthContext.Provider
    value={{
      username,
      name,
      loading,
      error,
      token,
      email,
      userId,
      signup,
      studentLogin,
      logout,
    }}
  >
    {children}
  </AuthContext.Provider>
)
}

export default function useAuth() {
  return useContext(AuthContext);
}