const { randomBytes, scryptSync, timingSafeEqual } = require('crypto');

function signup(email, password) {
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');

  const user = { email, password: `${salt}:${hashedPassword}` };
}

function login(email, password) {
  const user = users.find((v) => v.email === email);

  const [salt, key] = user.password.split(':');
  const hashedBuffer = scryptSync(password, salt, 64);
  // Buffering data against timing attacks
  const keyBuffer = Buffer.from(key, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  if (match) {
    return 'login successful!';
  } else {
    return 'login fail';
  }
}