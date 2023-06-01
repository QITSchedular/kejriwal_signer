// At kejriwal server
// export const REACT_APP_API_URL = "http://192.168.0.14:5095";

//User Registration
export const registerUser = async (data) => {
  const firstName = data.get("firstName");
  const lastName = data.get("lastName");
  const userName = data.get("userName");
  const email = data.get("email");
  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");
  const ts = new Date().toISOString();

  const apiUrl = "http://192.168.0.14:5095/api/Customers/signup";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        ts: "2022-12-14T08:41:07.540Z",
      }),
    });

    const data = await response.json();
    console.log("Signup api response", data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
//login the user and then redirect;
export const tokenFetch = async (email, password) => {
  // const apiUrl = "/api/Customers/login";
  // production
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

export const getPdfSignToken = async (formData, token) => {
  // console.log(formData,token);
  // const apiUrl = "/api/DSign/DocSignBinary";
  const apiUrl = "http://192.168.0.14:5095/api/DSign/DocSignBinary";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data (${response.status})`);
    }

    const data = await response.json();

    const fileId = data.fileId;
    return fileId;
    // const data2 = await response.json();
    // console.log(data2)
    // return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

// export const getSignedPdf = async(dSignFileId, token)=>{
//   const apiUrl = `/api/DSign/GetByFileId?dSignFileId=${dSignFileId}`;
//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         Authorization:
//           `Bearer ${token}`,
//       },

//     });
//   const blob = await response.blob();
//   const url = URL.createObjectURL(blob);
//     console.log(url);
//     return url;

//   } catch (error) {
//     console.error(`Error fetching data: ${error}`);
//   }
// }
export const getSignedPdf = async (dSignFileId, token) => {
  const apiUrl = `http://192.168.0.14:5095/api/DSign/GetByFileId`;
  // http://192.168.0.14:5095/api/DSign/GetByFileId
  console.log(typeof dSignFileId);
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        FileId: dSignFileId,
      },
    });
    console.log(response);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    console.log(url);
    return url;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};
