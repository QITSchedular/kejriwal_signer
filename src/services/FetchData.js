import axios from "axios";

export const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
export const tokenFetch = async (email, password) => {
  const apiUrl = "http://192.168.0.14:5095/api/Customers/login";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email, password: password }),
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getPdfSignToken = async(formData, token)=>{
  const apiUrl = "http://192.168.0.14:5095/api/DSign/DocSignBinary";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data (${response.status})`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};


export const getSignedPdf = async(fileId, token)=>{
  console.log(fileId, token);
  const apiUrl = `http://192.168.0.14:5095/api/DSign/GetByFileId?dSignFileId=${fileId}`;
  // try {
  //   const response = await fetch(apiUrl, {
  //     method: "GET",
  //     headers: {
  //       Authorization:
  //         `Bearer ${token}`,
  //     },
      
  //   });
  //   return response;
  // // const blob = await response.blob();
  // // const url = URL.createObjectURL(blob);
  // // console.log(url);
  // // return url;

  // } catch (error) {
  //   console.error(`Error fetching data: ${error}`);
  // }
  const axiosConfig = {
    responseType: "arraybuffer",
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
  axios.get(apiUrl, axiosConfig)
  .then((response) => {
    console.log("This is the response of pdf "+ response);
      const url = URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      return url;
    }).catch((error)=>{
      console.log(error);
    })
}
