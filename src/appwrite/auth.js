// ye hm isliye bna rhe h agr in future me appwrite se agr  services ht jati h 
// to isme hm yha pr class bnate h jisme ki uske objectect k throungh kisi 
// ka bhi acess le skte h 

import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js';

export class AuthService {
    // ab isme hm ek client banayege
    client = new Client();
    Account;
    constructor() {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
            .setProject(import.meta.env.VITE_PROJECT_ID);

        // now ab hm account bnayenge
        this.account = new Account(this.client);
    }
    // noww hmne account bna liya h ab jb bhi kuch chahiye hme hm isme sse use kr lenge future me 
    //to iske liye hm ab ek methood banayenge

    async createAccount({ email, password, name }) {
        // agr hm asyn ka use kr rhe h to hme try and catch ka use to krna hi pedga
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // to hm yha logn ka option de skte h 
            }
            else {
                return userAccount 
            }
        }
        catch (error) {
            throw error
        }

    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
         catch (error) {
            return null;
            // console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }


}

const authService = new AuthService()

export default authService