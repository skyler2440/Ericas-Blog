
import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: 'http://localhost:2019/',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    })
}