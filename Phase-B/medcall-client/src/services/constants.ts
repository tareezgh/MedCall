const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const loginUrl = `${apiUrl}/users/login`;
export const registerUrl = `${apiUrl}/users/register`;
export const userUpdateUrl = `${apiUrl}/users`;
export const driverUpdateUrl = `${apiUrl}/users/drivers`;
export const deleteUserUrl = `${apiUrl}/users/drivers`;
export const requestOtpUrl = `${apiUrl}/users/otp/request`;
export const verifyOtpUrl = `${apiUrl}/users/otp/verify`;
export const resetPasswordUrl = `${apiUrl}/users/password/reset`;
export const getDriversUrl = `${apiUrl}/users/drivers`;
export const getPendingDriversUrl = `${apiUrl}/users/drivers/pending`;

export const requestUrl = `${apiUrl}/request`;
export const activeRequestUrl = `${apiUrl}/request/active-request`;
export const guestRequestUrl = `${apiUrl}/request/guest-request`;
export const updateRequestUrl = `${apiUrl}/request`;

export const conversationUrl = `${apiUrl}/conversation`;

export const getMessagesUrl = `${apiUrl}/conversation/messages`;
