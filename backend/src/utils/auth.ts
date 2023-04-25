import JWT from 'jsonwebtoken';
const { JWT_SECRET } = process.env;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');

export const generateToken = (payload: object) => {
  return JWT.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string) => {
  return JWT.verify(token, JWT_SECRET);
};

export default { generateToken, verifyToken };
