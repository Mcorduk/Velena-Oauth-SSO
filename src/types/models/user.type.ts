import metaData from './metaData';

interface userType extends metaData {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}
export default userType;
