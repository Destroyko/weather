<template>
    <div>
        <gmap-map
                :center="center"
                :zoom="12"
                style="width:100%;  height: 400px;"
                :disableDefaultUI="true"
                ref="mapRef"
                @dragend="updateCoordinates"
        >
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center=m.position"
                    @drag=""
            ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
    export default {
        name: "GoogleMap",
        data() {
            return {
                center: { lat: 45.508, lng: 12.587 },
                dragEvents: {lat: null, lng: null},
                markers: [],
                places: [],
                currentPlace: null
            };
        },
        mounted() {
            this.geolocate();
        },

        methods: {
            addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                }
            },
            geolocate() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            },
            updateCoordinates() {
                this.dragEvents.lat = this.$refs.mapRef.$mapObject.getCenter().lat();
                this.dragEvents.lng = this.$refs.mapRef.$mapObject.getCenter().lng();
                this.$emit('dragEvents', this.dragEvents);
            }
        }
    };
</script>