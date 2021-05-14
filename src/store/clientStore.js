import { compareStrings } from '../services/compare.js';
import { _axios } from '../plugins/axios.js';
import { apiUrl } from '../services/api.js';

const findSortField = (state, name) => state.sortFields.find(f => f.name === name);

const clientStore = {
    namespaced: true,
    state: () => {
        return {
            clients: [],
            sortFields:[
                {
                    name : 'name',
                    type: 'string',
                    direction: null
                }
            ],
        }
    },
    getters: {
        sortedClients: (state, getters) => {
            const activeField = getters.sortField;
            if (!activeField) {
                return state.clients;
            }

            return [...state.clients].sort((a, b) => {
                const firstField = a[activeField.name];
                const secondField = b[activeField.name];
                let result;
                switch (activeField.type) {
                    default:
                    case 'string': result = compareStrings(firstField, secondField);
                }

                return result * (activeField.direction === 'desc' ? -1 : 1)
            });
        },
        sortField: (state) => {
            return state.sortFields.find(f => f.direction != null);
        },
        namedSortField: (state) => (name) => findSortField(state, name),
        sortedByDesc: (state) => (name) => {
            const sortField = findSortField(state, name);
            return sortField && sortField.direction === 'desc';
        },
        sortedByAsc: (state) => (name) => {
            const sortField = findSortField(state, name);
            return sortField && sortField.direction === 'asc';
        }
    },
    mutations: {
        setClients: (state, value) => state.clients = value,
        setSortField: (state, value) => {
            state.sortFields = state.sortFields.map(f => f.name === value.name ? value : f);
        },
        clearSortFields: (state) => state.sortFields = state.sortFields.map(f => {
            return {...f, direction: null}
        }),
    },
    actions: {
        loadItems: async ({commit}) => {
            const {data} = await _axios.get(apiUrl('/clients'));
            commit('setClients', data);
        },
        updateSortField: ({commit}, value) => {
            commit('clearSortFields');
            commit('setSortField', value);
        }
    }
}

export default clientStore;