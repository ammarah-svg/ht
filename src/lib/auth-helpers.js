export const getRedirectURL = () => {
  // Get the URL from environment variable or default to production URL
  let baseURL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  
  // Ensure the URL has a protocol
  if (!baseURL.startsWith('http://') && !baseURL.startsWith('https://')) {
    baseURL = `https://${baseURL}`;
  }
  
  return baseURL;
};

export const getAuthRedirectURL = (path = '/') => {
  const baseURL = getRedirectURL();
  try {
    const redirectURL = new URL(path, baseURL);
    return redirectURL.toString();
  } catch (error) {
    console.error('Error constructing redirect URL:', error);
    return baseURL + path;
  }
};