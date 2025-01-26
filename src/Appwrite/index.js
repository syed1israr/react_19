import { Client, Databases, ID, Query } from "appwrite";

// Environment Variables
const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const CO_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PO_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Initialize Appwrite Client and Database
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PO_ID);

const DB = new Databases(client);

// Function to Update Search Count
export const updateSearchCount = async (searchTerm, movie) => {
    try {


        const result = await DB.listDocuments(DB_ID, CO_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);
     

        if (result.documents.length > 0) {
            const doc = result.documents[0];
       
            await DB.updateDocument(DB_ID, CO_ID, doc.$id, {
                Count: doc.Count + 1
            });
        } else {
       
            await DB.createDocument(DB_ID, CO_ID, ID.unique(), {
                searchTerm: searchTerm,
                Count: 1,
                Movei_id: movie.id,
                Poster_URL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            });
        }


    } catch (error) {
        console.error("Error in updateSearchCount:", error);
    }
};



export const getTrendingMovies = async() =>{
    try {
        const result = await DB.listDocuments(DB_ID,CO_ID,[
            Query.limit(5),
            Query.orderDesc("Count")
        ])
        return result.documents;
        
    } catch (error) {
        console.log(error)
    }
}