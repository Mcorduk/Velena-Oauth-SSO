import metaData from './metaData';

interface clientType extends metaData {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  name: string;
  description?: string;
}

export default clientType;
