import axios from "axios";

export const tokenFetch = async(email, password)=>{
  console.log(email, password);
    const apiUrl = "http://192.168.0.14:5095/api/Customers/login"
    try {
        const response = await axios.post(apiUrl, { Email: email, password: password });
        console.log(response);
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        return error;
      }
}