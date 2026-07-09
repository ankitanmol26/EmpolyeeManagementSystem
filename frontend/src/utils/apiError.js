export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error?.response) {
    return "Backend is unavailable. Check your connection and try again.";
  }

  return error.response.data?.message || fallback;
}
