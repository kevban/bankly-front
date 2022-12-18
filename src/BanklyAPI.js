import axios from 'axios'

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
        return res
    }

    static async getTransactions() {
        let res = await this.request(`plaid/transactions`, {}, 'get')
        return res
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

}

// username papaya4, password password
BanklyApi.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhcGF5YTQiLCJ1c2VySWQiOiI2MzliYjBkMDhkNTgzYmY1NDFkNDI4ZDkiLCJpYXQiOjE2NzExNDk4ODl9.bN09KBRPV-VxZPlmm0fuzzFAzId8MhSuUvwgO4NSTU4'

export default BanklyApi