<template>
    <v-btn v-on:click="show()">click</v-btn>
</template>

<script>
    export default {
        name: "OpenWeatherMap",
        props: ['positionLatLng'],
        data() {
            return {

            };
        },
        mounted() {

            // this.getRemoteWeather()
            // console.log(this.positionLatLng);
        },
        created() {

        },
        methods: {
            getRemoteWeather() {
                this.axios.get('http://api.openweathermap.org/data/2.5/find?lat='+this.positionLatLng.lat+'&lon='+this.positionLatLng.lng+'&cnt=10&APPID=d6ed142ac38b1cf64676b767d933c0dc')
                    .then(response => {
                        console.log(response);
                    })
                    .catch(e => {
                        console.table(e)
                    });
            },
            show() {
                console.log('test',this.positionLatLng);
            }
        }
    }
</script>

<style scoped>

</style>