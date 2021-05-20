<template>
    <div class="edit-create-client">
        <h1>Create client</h1>
        <form action="#" method="post" @submit.prevent="save">
            <div class="form-row">
                <label for="name">Name: </label>
                <input type="text" id="name" v-model="clientName" />
                <span class="error" v-if="validationErrors['name']">{{ validationErrors['name'] }}</span>
            </div>
            <div class="form-row">
                <label for="description">Description: </label>
                <textarea id="description" rows="10" v-model="clientDescription"></textarea>
                <span class="error" v-if="validationErrors['description']">{{ validationErrors['description'] }}</span>
            </div>
            <div class="form-row actions">
                <button type="submit" :disabled="saving || hasErrors">Save client</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

    export default {
        name: 'EditClient',
        computed: {
            ...mapState('clientStore', ['client', 'loading', 'saving']),
            ...mapGetters('clientStore', ['validationErrors']),
            clientName: {
                get() {
                    return this.client.name;
                },
                set(value) {
                    this.setClientName(value);
                }
            },
            clientDescription: {
                get() {
                    return this.client.description;
                },
                set(value) {
                    this.setClientDescription(value);
                }
            },
            hasErrors() {
                return this.validationErrors.length > 0;
            }
        },
        methods: {
            ...mapActions('clientStore', ['newClient', 'loadClient', 'storeClient', 'updateClient']),
            ...mapMutations('clientStore', ['setClient', 'setLoading', 'setClientName', 'setClientDescription']),
            async save() {
                if (this.client.id) {
                    await this.updateClient(this.client);
                } else {
                    await this.storeClient(this.client);
                }
                setTimeout(() => {
                    this.$router.push({name: 'Clients'})
                }, 1000);
            }
        },
        mounted() {
            const id = this.$route.params['client'];
            if (id) {
                this.loadClient(id);
            } else {
                this.newClient();
            }
        }
    }
</script>

<style scoped lang="scss">
    .form-row {
        margin: 20px 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        label {
            flex: 0 0 200px;
            text-align: left;
        }
        input, textarea, select {
            flex: 1 1 auto;
            padding: 10px 5px;
        }
        .error {
            flex: 0 0 100%;
            font-size: smaller;
            color: #ff1100;
            padding: 10px 5px;
            text-align: left;
        }
    }
</style>