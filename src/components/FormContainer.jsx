import { assets } from '../assets/assets';  
import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  
import { API_ENDPOINT } from './Api.jsx';  
import { Form, Button } from 'react-bootstrap';  

const FormContainer = () => {  
  const navigate = useNavigate();  
  const [username, setusername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  

  // Verify if User Is In Session in LocalStorage  
  useEffect(() => {  
    const fetchUser = async () => {  
      const token = localStorage.getItem('token');  
      if (token) {  
        try {  
          const response = JSON.parse(token); // Assuming your token has a .data property  
          if (response && response.data) {  
            navigate('/dashboard');  // Navigate to dashboard if token is valid  
          } else {  
            // Invalid token, do nothing (stay on login)  
          }  
        } catch (error) {  
          // If parsing fails or token is invalid  
          console.error("Error fetching user from local storage:", error);  
        }  
      }  
    };  

    fetchUser();  
  }, [navigate]);  // Depend on navigate to avoid warnings and re-renders  

  // Handle Form Submission  
  const handleSubmit = async (e) => {  
    e.preventDefault();  

    try {  
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, { username, password });  
      localStorage.setItem("token", JSON.stringify(response)); // Save response token  
      setError('');  // Clear any previous error messages  
      navigate('/dashboard');  // Redirect to dashboard after successful login  
    } catch (error) {  
      setError('Invalid username or password');  // Display error on failed login  
    }  
  };  

  return (  
    <div className='bg-gradient-to-b from-customDark1 to-customDark2 h-screen w-[100%]'>  
      <div className='flex justify-center h-full '>  
        <div className='bg-gradient-to-t from-customDark1 to-customDark2 lg:w-[40%] rounded-md mt-9 p-6'>  
          <div className='flex flex-col items-center w-full'>  
            <br></br>
            <br></br>
            <div className='mt-6 flex flex-col items-center'>  
              <button className='flex px-10 flex-row w-fit border-2 border-gray-600 text-white py-3 rounded-3xl font-semibold mb-2 hover:border-white items-center gap-5'>  
                <img className='w-6' src={assets.google} alt="Google"/>   
                Continue with Google  
              </button>  
              <br></br>
              <button className='flex flex-row w-fit border-2 border-gray-600 text-white py-3 px-10 rounded-3xl font-semibold mb-2 hover:border-white items-center gap-5'>  
                <img className='w-6' src={assets.facebook} alt="Facebook"/>   
                Continue with Facebook  
              </button> 
              <br></br>
              <button className='flex flex-row w-fit border-2 border-gray-600 text-white py-3 px-10 rounded-3xl font-semibold mb-5 hover:border-white items-center gap-5'>  
                <img className='w-6' src={assets.tweet} alt="Twitter"/>   
                Continue with Twitter  
              </button>  
            </div>  

            <hr className='opacity-20 my-3' style={{ border: '1px solid gray', width: '70%' }} />  

            <Form onSubmit={handleSubmit}>  
              <Form.Group controlId="formusername">  
                <Form.Label className='text-white mb-3 '> Username: </Form.Label>  
                <Form.Control className="w-full p-2 mb-2 rounded-md"  
                  type="username"  // Changed to username for better validation  
                  placeholder="Enter username"  
                  value={username}  
                  onChange={(e) => setusername(e.target.value)} required />  
              </Form.Group>  

              <Form.Group controlId="formPassword">  
                <Form.Label className='text-white mb-3'> Password: </Form.Label>  
                <Form.Control className='w-full p-2 mb-2 rounded-md'  
                  type="password"  
                  placeholder="Enter Password"  
                  value={password}  
                  onChange={(e) => setPassword(e.target.value)} required />  
              </Form.Group>  

              <Form.Group controlId="formButton">  
                {error && <p style={{ color: 'red' }}>{error}</p>}  
                <Button variant="success" className='w-full bg-green-600 text-white p-2 rounded-md' size="sm" type="submit">Login</Button>   
              </Form.Group>  
            </Form>   

            <p className='mt-2 text-center text-white'>  
              Forgot your password?  
            </p>  
          </div>  
        </div> 
      </div>
    </div> 
  );  
};  

export default FormContainer;
