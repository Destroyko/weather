<template>
    <h6>{{ this.currentWeather.weather.description }}</h6>
</template>

<script>
    export default {
        name: "OpenWeatherMap",
        props: ['positionLatLng'],
        data() {
            return {
                currentPosition: {
                    lat: null,
                    lng: null
                },
                currentWeather: {
                    weather: {
                        description: null
                    }
                }
            };
        },
        mounted() {

        },
        created() {

        },
        methods: {
            onUpdateMap(_lat,_lng) {
                this.currentPosition = {
                    lat: parseFloat(_lat),
                    lng: parseFloat(_lng)
                };
                this.getRemoteWeather();
            },
            getRemoteWeather() {
                this.axios.get('http://api.openweathermap.org/data/2.5/weather?lat='+this.currentPosition.lat+'&lon='+this.currentPosition.lng+'&APPID=d6ed142ac38b1cf64676b767d933c0dc')
                    .then(response => {
                        console.log(response);
                        this.currentWeather = response.data
                    })
                    .catch(e => {
                        console.table(e)
                    });
            }
        }
    }
</script>

<style scoped>

</style>