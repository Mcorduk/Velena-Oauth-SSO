import metaData from './metaData';

interface clientType extends metaData {
  id: {
    type: String;
    unique: true;
  };
  name: string;
  secret: string;
  redirectUrl: string;
}

export default clientType;
