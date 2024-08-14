export const handleResponse = (res, success, message, data = null, status = 200) => {
   res.status(status).json({ success, message, data });
};