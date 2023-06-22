// REMOVE FOR PRODUCTION
export const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const API_INSTANCE = {
  BASE_URL: "http://localhost:8080",
};
