import metaData from './metaData';

interface userType extends metaData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}
export default userType;
