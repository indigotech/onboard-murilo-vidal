export const authConfig = {
  secret: String(process.env.JWT_SECRET),
  expires: '1h',
};
