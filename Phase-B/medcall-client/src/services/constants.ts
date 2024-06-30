const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log("🚀 ~ apiUrl:", apiUrl);

export const loginUrl = `${apiUrl}/users/login`;
export const registerUrl = `${apiUrl}/users/register`;


export const postRequestUrl = `${apiUrl}/request`;