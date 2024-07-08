export const freeze = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(null), 2000));
};
