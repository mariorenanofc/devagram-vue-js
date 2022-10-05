import { defineStore } from "pinia";

export const useAccessTokenStore = defineStore({
    id: 'accessToken',
    state: () => ({
        token: localStorage.getItem('token')
    }),
    getters : {
        estaAutenticado : (state) =>  state.token !== null 
            && state.token !== undefined && state.token.trim() !== ''
    },
    actions: {
        setToken(t : string) {
            this.token = t
        }
    }
})