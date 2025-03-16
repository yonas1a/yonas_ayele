import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

export async function fetchProjects() {
    try {
        await client.connect();
        const db = client.db("mydb");
        const myCollection = db.collection("mycollection");
        const documents = await myCollection.find({}, { 
            projection: { project_name: 1, project_text: 1, _id: 0 } 
        }).toArray();

        return documents;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    } finally {
        await client.close();
    }
}
