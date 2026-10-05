// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
 const environment=process.env.NODE_ENV;
 const PORT=process.env.PORT;
 const DB_URL=process.env.DATABASE_URL;
 const corsUrl = process.env.CORS_URL;
 const SECRET=process.env.SECRET;
 const JWT_ACCESS_SECRET=process.env.JWT_ACCESS_SECRET || "";
 const JWT_REFRESH_SECRET=process.env.JWT_REFRESH_SECRET || "";

 const tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};
//  config.ts
const firebaseConfig = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};  

export const postgresConfig = {
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5432'),
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
};


export { environment, PORT, DB_URL, corsUrl, SECRET, tokenInfo, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, firebaseConfig };

