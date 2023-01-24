import axios from 'axios'

// const BASE_URL = process.env.REACT_APP_BASE_URL || "https://bankly-backend-production.up.railway.app/api";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api";

class BanklyApi {
    static token;

    /**
     * Send a request to the backend api
     * @param {string} endpoint 
     * @param {object} data 
     * @param {string} method 
     * @returns api data
     */
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { token: BanklyApi.token };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // API routes

    static async createLinkToken() {
        let res = await this.request(`plaid/create-link-token`, {}, 'post');
        return res
    }

    static async setAccessToken(publicToken) {
        let res = await this.request(`plaid/set-access-token`, {public_token: publicToken}, 'post')
        console.log('setting access token', res)
        return res
    }

    // this gets user transaction from database.
    static async getTransactions() {
        await this.request(`plaid/transactions`)
        let userTransactions = await this.request(`user/transactions`)
        return userTransactions
    }

    // this retrieves transaction from connected banks using plaid service
    static async updateTransactions() {
        let userTransactions = await this.request(`plaid/transactions`)
        return userTransactions
    }

    static async login(data) {
        let res = await this.request(`auth/login`, data, 'post')
        this.token = res.token
        return res
    }

    static async register(data) {
        let res = await this.request(`auth/register`, data, 'post')
        this.token = res.token
        return res
    }

    // get the connected institution for the current user
    static async getInstitutions() {
        let res = await this.request(`user/institutions`)
        return res
    }

    // get user information when the app first loads
    static async getUser() {
        let res = await this.request('user')
        return res
    }

    static async addCategory(data) {
        let res = await this.request('user/categories', data, 'post')
        return res
    }

    static async removeCategory(data) {
        let res = await this.request('user/categories', data, 'delete')
        return res
    }

    static async addTag(data) {
        let res = await this.request('user/tags', data, 'post')
        return res
    }

    static async removeTag(data) {
        let res = await this.request('user/tags', data, 'delete')
        return res
    }

    static async addTransaction(data) {
        let res = await this.request('user/transactions', data, 'post')
        return res
    }

    static async editTransaction(data) {
        let res = await this.request('user/transactions', data, 'patch')
        return res
    }

    static async deleteTransaction(data) {
        let res = await this.request('user/transactions', data, 'delete')
        return res
    }

    static async addRule(data) {
        let res = await this.request('user/rules', data, 'post')
        return res
    }

    static async deleteRule(data) {
        let res = await this.request('user/rules', data, 'delete')
        return res
    }
    


    static async logOut() {
        localStorage.clear();
        BanklyApi.token = '';
    }


}

// username papaya4, password password
BanklyApi.token = ''

export default BanklyApi