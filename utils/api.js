export const isRequestSuccess = (response) => {
  const statusCode = [1, "1", true, "true"];
  if (response.status && statusCode.includes(response.status)) return true;
  if (response.success && statusCode.includes(response.success)) return true;
  if (response.found && statusCode.includes(response.found)) return true;
};
