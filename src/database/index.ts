import {DB_URL, postgresConfig} from'../config';
import { Pool } from "pg"; 
 
// export const pool = new Pool({
//     connectionString: DB_URL,
// });
export const pool = new Pool(postgresConfig);

pool.query("SELECT NOW()")
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection failed:", err));

  export default pool;