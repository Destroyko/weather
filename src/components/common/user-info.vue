<template>
    <div class="card mb-4 shadow-sm">
        <div class="card-header">
            <h4 class="my-0 font-weight-normal">User info</h4>
        </div>
        <div class="card-body">
            <button class="btn btn-info" v-on:click="countLng">count</button>

            <ul class="list-unstyled mt-3 mb-4" v-for="item of guest">
                <li>{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user-info",
        data() {
            return {
                guest: {
                    country: 'UA',
                    city: 'Rivne',
                    lat: -50000,
                    lng: 50000
                }
            }
        },
        methods: {
            countLng() {
                return this.guest.lng++;
            }
        }
    }
</script>

<style scoped>

</style>