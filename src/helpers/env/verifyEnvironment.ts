export const verifyEnvironment = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  const envName = process.env.NODE_ENV;

  return {
    isDevelopment,
    isProduction,
    envName,
  };
};
