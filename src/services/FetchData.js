export const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
export const tokenFetch = async (email, password) => {
  const apiUrl = "/api/Customers/login";
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
  const apiUrl = "/api/DSign/DocSignBinary";
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
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};


export const getSignedPdf = async(dSignFileId, token)=>{
  const apiUrl = `/api/DSign/GetByFileId?dSignFileId=${dSignFileId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
      
    });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
    console.log(url);
    return url;

  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}
