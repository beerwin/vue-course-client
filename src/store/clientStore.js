const clientStore = {
    namespaced: true,
    state: () => {
        return {
            clients: [],
            sortFields:[
                {
                    name : 'name',
                    direction: null
                }
            ],
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
        loadItems: ({commit}) => {
            // TODO: implement Ajax request (install axios)
            commit('setClients', []);
        }
    }
}

export default clientStore;