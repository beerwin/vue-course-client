import {_axios} from '../plugins/axios';
import { apiUrl } from '../services/api.js';

const clientStore = {
    namespaced: true,
    state() {
        return {
            client: {
                id: null,
                name: '',
                description: '',
                createdAt: null
            },
            loading: false,
            saving: false,
        }
    },
    getters: {
        validationErrors: (state) => {
            const errors = {length: 0};
            if (!state.client.name) {
                errors['name'] = 'The name field is required';
                ++errors.length;
            }
            if (!state.client.description) {
                errors['description'] = 'The description field is required';
                ++errors.length;
            }

            return errors;
        }
    },
    mutations: {
        setClient: (state, value) => state.client = value,
        setLoading: (state, value) => state.loading = value,
        setSaving: (state, value) => state.saving = value,
        setClientName: (state, value) => state.client.name = value,
        setClientDescription: (state, value) => state.client.description = value,
    },
    actions: {
        loadClient: async ({commit}, id) => {
            commit('setLoading', true);
            const response = await _axios.get(apiUrl(`/clients/${id}`));
            commit ('setClient', response.data);
            commit ('setLoading', false);
        },
        storeClient: async ({commit}, payload) => {
            commit('setSaving', true);
            const response = await _axios.post(apiUrl('/clients'), payload);
            commit('setSaving', false);
            return response.data.id;
        },
        updateClient: async ({commit}, payload) => {
            commit('setSaving', true);
            await _axios.put(apiUrl(`/clients/${payload.id}`), payload);
            commit('setSaving', false);
        },
        newClient: ({commit}) => {
            commit('setClient', {
                id: null,
                name: '',
                description: '',
                createdAt: null,
            })
        }
    }
}

export default clientStore;