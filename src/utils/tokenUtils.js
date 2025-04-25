export const isTokenValid = () => {
  const token = localStorage.getItem("Bearer");
  const tokenCreatedAt = localStorage.getItem("tokenCreatedAt");

  if (!token || !tokenCreatedAt) return false;

  const createdAt = parseInt(tokenCreatedAt, 10);
  const now = Date.now();
  const expiry = 1 * 60 * 60 * 1000; 

  if (now - createdAt > expiry) {
    return false;
  }

  return true;
};
