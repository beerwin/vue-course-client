<template>
    <div class="clients">
        <h1>Clients</h1>
        <div class="crud-list" v-if="!loading">
            <div class="crud-list-header">
                <div class="crud-main" @click="updateSortField('name')">
                    Name
                    <span v-if="sortedByAsc('name')">&uparrow;</span>
                    <span v-if="sortedByDesc('name')">&downarrow;</span>
                </div>
            </div>
            <div class="crud-list-content">
                <div class="crud-list-item" v-for="client in sortedClients" :key="client.id">
                    <div class="crud-main">
                        {{ client.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="loader" v-else>Loading...</div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';

    export default {
        name: 'Clients',
        data() {
            return {
                loading: false
            }
        },
        computed: {
            ...mapGetters('clientStore', ['sortedClients', 'sortField', 'namedSortField', 'sortedByAsc', 'sortedByDesc']),
        },
        methods: {
            ...mapActions('clientStore', ['loadItems']),
            ...mapMutations('clientStore', ['setSortField']),
            async loadClients() {
                this.loading = false;
                await this.loadItems();
                this.loading = false;
            },
            updateSortField(name) {
                const sortField = this.namedSortField(name);
                if (!sortField) {
                    throw new Error(`Invalid sort field: ${name}`);
                }
                if (!sortField.direction) {
                    sortField.direction = 'asc';
                } else {
                    sortField.direction = sortField.direction === 'asc' ? 'desc' : 'asc'
                }
                this.setSortField(sortField);
            }
        },
        mounted() {
            this.loadClients();
        }
    }
</script>

<style scoped lang="scss">
    .crud-list {
        .crud-list-header, .crud-list-item {
            display: flex;
            flex-direction: row;
            .crud-main {
                flex: 0 0 400px;
                padding: 5px 10px;
            }
        }
        .crud-list-header {
            border-bottom: 2px solid gray;
            user-select: none;
            font-weight: bold;
        }

        .crud-list-content {
            border-bottom: 2px solid gray;
        }
    }
</style>