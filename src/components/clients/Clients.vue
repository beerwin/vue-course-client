<template>
    <div class="clients">
        <h1>Clients</h1>
        <div class="toolbar">
            <div class="toolbar-main">
                <input type="text" v-model="internalSearchText" placeholder="Search" />
            </div>
            <div class="toolbar-right">
                <router-link :to="{name: 'CreateClient'}">Create</router-link>
            </div>
        </div>
        <div class="crud-list" v-if="!loading">
            <div class="crud-list-header">
                <div class="crud-list-header-item crud-main" @click="updateSortField('name')">
                    Name
                    <span v-if="sortedByAsc('name')">&uparrow;</span>
                    <span v-if="sortedByDesc('name')">&downarrow;</span>
                </div>
                <div class="crud-list-header-item crud-date" @click="updateSortField('createdAt')">
                    Created at
                    <span v-if="sortedByAsc('createdAt')">&uparrow;</span>
                    <span v-if="sortedByDesc('createdAt')">&downarrow;</span>
                </div>
                <div class="crud-list-header-item crud-actions">
                    Actions
                </div>
            </div>
            <div class="crud-list-content">
                <div class="crud-list-item" v-for="client in sortedClients" :key="client.id">
                    <div class="crud-main">
                        {{ client.name }}
                    </div>
                    <div class="crud-date">
                        <date-time-display :date="new Date(client.createdAt)" />
                    </div>
                    <div class="crud-actions">
                        Edit, Delete
                    </div>
                </div>
            </div>
        </div>
        <div class="loader" v-else>Loading...</div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
    import DateTimeDisplay from '../controls/DateTimeDisplay';

    export default {
        name: 'Clients',
        components: {DateTimeDisplay},
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapState('clientListStore', ['searchText']),
            ...mapGetters('clientListStore', ['sortedClients', 'sortField', 'namedSortField', 'sortedByAsc', 'sortedByDesc']),
            internalSearchText: {
                get() {
                    return this.searchText;
                },
                set(value) {
                    this.setSearchText(value);
                }
            }
        },
        methods: {
            ...mapActions('clientListStore', ['loadItems']),
            ...mapMutations('clientListStore', ['setSortField', 'setSearchText']),
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
            },
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
                & > div {
                    padding: 10px;
                    text-align: left;
                }
            .crud-main {
                flex: 0 0 400px;
            }
            .crud-date {
                flex: 0 0 150px;
            }
            .crud-actions {
                  align-self: flex-end;
                  flex: 1 1 auto;
                  text-align: right;
            }
        }
        .crud-list-header {
            border-bottom: 2px solid gray;
            user-select: none;
            font-weight: bold;
            .crud-list-header-item {
                cursor: pointer;
            }
        }

        .crud-list-content {
            border-bottom: 2px solid gray;
            .crud-list-item {
                &:nth-child(odd) {
                    background-color: rgba(0,0,0,0.1);
                }
                &:nth-child(even) {
                    background-color: transparent;
                }
            }
        }
    }

    .toolbar {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #cccccc;
        padding-bottom: 10px;
        margin-bottom: 5px;
        .toolbar-main {
            flex: 1 1 0;
            text-align: left;
        }
        .toolbar-right {
            flex: 1 0 auto;
            text-align: right;
        }
    }
</style>