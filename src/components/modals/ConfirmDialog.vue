<template>
    <div class="confirm-overlay" v-if="isOpen">
        <div class="confirm-dialog">
            <div class="confirm-dialog-title">
                <slot name="title"></slot>
            </div>
            <div class="confirm-dialog-content">
                <slot></slot>
            </div>
            <div class="confirm-dialog-actions">
                <div class="confirm-dialog-action-secondary">
                    <slot name="secondary"></slot>
                </div>
                <div class="spacer"></div>
                <div class="action-buttons">
                    <button @click="confirmDialog">Yes</button>
                    <button @click="cancelDialog">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ConfirmDialog',
        data() {
            return {
                resolve: null,
                isOpen: false,
            }
        },
        methods: {
            open() {
                this.isOpen = true;
                return new Promise (resolve => {
                    this.resolve = resolve;
                });
            },
            confirmDialog() {
                this.isOpen = false;
                this.resolve(true);
            },
            cancelDialog() {
                this.isOpen = false;
                this.resolve(false);
            }
        }
    }
</script>

<style scoped lang="scss">
    .confirm-overlay {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.6);
        justify-content: space-around;
        align-items: center;
        align-content: center;
        display: flex;
        .confirm-dialog {
            text-align: left;
            background-color: #ffffff;
            box-shadow: 0 0 10px #000000;
            width: 700px;
            display: flex;
            flex-direction: column;
            .confirm-dialog-title {
                display: flex;
                flex: 1 0 auto;
                padding: 10px;
                border-bottom: 1px solid #cccccc;
            }
            .confirm-dialog-content {
                flex: 1 1 0;
                padding: 10px;
                min-height: 100px;
            }
            .confirm-dialog-actions {
                border-top: 1px solid #cccccc;
                display: flex;
                flex-direction: row;
                padding: 10px;
                .confirm-dialog-action-secondary {
                    flex: 0 0 auto;
                }
                .spacer {
                    flex: 1 1 0;
                }
                .action-buttons {
                    flex: 0 0 auto;
                    button {
                        margin: 5px;
                    }
                }
            }
        }
    }
</style>