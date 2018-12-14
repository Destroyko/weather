<template>
    <div id="NearPositionsList">
        <template v-for="(position,index) in positionsList">
            <template v-if="index !== 0">
                <v-btn flat small color="orange" v-on:click="updateLocation(position.lat, position.lng)">{{
                    position.name }}
                </v-btn>
            </template>
        </template>
    </div>
</template>


<script>
    export default {
        name: "NearPositionsList",
        props: ['positionsList'],
        data() {
            return {};
        },
        methods: {
            updateLocation(_lat, _lng) {
                this.$emit('onUpdateMap', _lat, _lng)
            }
        }
    }
</script>

<style scoped>

</style>