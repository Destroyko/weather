<template>
    <div class="card text-white bg-dark mb-4 shadow-sm">
        <div class="card-header">
            <h4 class="my-0 font-weight-normal">User info</h4>
        </div>
        <div class="card-body">
            <button class="btn btn-info" v-on:click="getLocation">count</button>
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
                lat: null,
                lng: null
            }
        }
    },
    methods: {
        getLocation() {
            let that = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                that.guest.lat = position.coords.latitude;
                that.guest.lng = position.coords.longitude;
            });
        }
    }
}
</script>

<style scoped>

</style>