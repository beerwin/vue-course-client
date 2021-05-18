<template>
    <span>
        <span v-if="showDate">{{ formattedDate }} </span>
        <span v-if="showTime">{{ formattedTime }} </span>
    </span>
</template>

<script>
    export default {
        name: 'DateTimeDisplay',
        props: {
            date: {
                type: Date,
                default: () => new Date()
            },
            locale: {
                type: String,
                default: 'en-gb'
            },
            showDate: {
                type: Boolean,
                default: true
            },
            showTime: {
                type: Boolean,
                default: true,
            }
        },
        computed: {
            formattedDate() {
                return this.date.toLocaleDateString(this.locale, {day: '2-digit', month: '2-digit', year: 'numeric'});
            },
            formattedTime() {
                return this.date.toLocaleTimeString(this.locale, {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})
            }
        }
    }
</script>

<style scoped>

</style>