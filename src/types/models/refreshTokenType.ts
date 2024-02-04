import metaData from './metaData';

interface refreshTokenType extends metaData {
  clientId: string;
  userId: string;
  scopes: string[];
  expiresAt: Date;
}

export default refreshTokenType;
