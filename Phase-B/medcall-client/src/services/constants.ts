const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const loginUrl = `${apiUrl}/users/login`;
export const registerUrl = `${apiUrl}/users/register`;
export const editProfileUrl = `${apiUrl}/users/edit`;
export const requestOtpUrl = `${apiUrl}/users/request-otp`;
export const verifyOtpUrl = `${apiUrl}/users/verify-otp`;
export const resetPasswordUrl = `${apiUrl}/users/reset-password`;
export const getDriversUrl = `${apiUrl}/users/get-drivers`;

export const requestUrl = `${apiUrl}/request`;
export const updateRequestUrl = `${apiUrl}/request`;
