const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmail = (email: string): email is string & { '@': string } => {
  return emailRegex.test(email);
};

export default isEmail;
