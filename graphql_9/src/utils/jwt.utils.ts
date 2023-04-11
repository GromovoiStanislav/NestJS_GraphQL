import jwt from "jsonwebtoken";

export function signJwt(payload) {
  return jwt.sign(payload, 'secret-key', { algorithm: "HS256" });
}

export function decode(token: string) {
  if (!token) return null;

  try {
    return jwt.verify(token, 'secret-key');

  } catch (error) {
    console.error(`error`, error);
    return null;
  }
}