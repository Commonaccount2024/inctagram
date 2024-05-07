import { useState } from 'react';
import axios from 'axios';
import { FormFields } from '../components/RegistrationForm/RegistrationForm';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registerUser = async (userData: FormFields) => {
    setLoading(true);
    setError(null);
    try {
      // Convert the userData object to JSON format
      const jsonData = JSON.stringify({
        userName: userData.username,
        email: userData.email,
        password: userData.password,
        baseUrl: "http://localhost:3000" // Assuming this is a fixed value
      });

      // Set the headers to indicate JSON data
      const headers = {
        'Content-Type': 'application/json'
      };

      // Send the JSON data to the server
      const response = await axios.post('https://inctagram.work/api/v1/registration', jsonData, { headers });

      setData(response.data);
    } catch (error: unknown) {
      //@ts-ignore
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, registerUser };
};
