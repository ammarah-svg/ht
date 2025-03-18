export const getRedirectURL = () => {
  // Get the URL from environment variable or default to production URL
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  return baseURL;
};

export const getAuthRedirectURL = (path = '/') => {
  const baseURL = getRedirectURL();
  const redirectURL = new URL(path, baseURL);
  return redirectURL.toString();
};