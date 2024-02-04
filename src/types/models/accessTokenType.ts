import metaData from './metaData';

interface accessTokenType extends metaData {
  clientId: string;
  userId: string;
  scopes: string[];
  expiresAt: Date;
}

export default accessTokenType;
