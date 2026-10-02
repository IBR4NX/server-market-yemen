//  mongodb+srv://thrivq_db_ibovd:OFmfyK8Ddpa06ukX@ibovsdb.coaq32q.mongodb.net/?appName=ibovsDB
// mongoose.connect('mongodb+srv://thrivq_db_ibovd:OFmfyK8Ddpa06ukX@ibovsdb.coaq32q.mongodb.net/?appName=ibovsDB')
// const databaseurl =`mongodb+srv://Ibrahim:Ibr.714339227@cluster0.utsd0uz.mongodb.net/?appName=Cluster0`;
// const uri ="mongodb+srv://ibovstest:ibovs12345@ibr4nx.sjth1pb.mongodb.net/?appName=ibr4nx";
import {DB_URL} from'../config';
import { Pool } from "pg";

export const db = new Pool({
    connectionString: DB_URL,
});
db.query("SELECT NOW()")
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection failed:", err));

  export default db;