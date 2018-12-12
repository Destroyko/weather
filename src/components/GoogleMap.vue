<template>
    <div>
        <gmap-map
                :center="center"
                :zoom="10"
                :options="{minZoom: 8, maxZoom: 11,disableDefaultUI: true}"
                style="width:100%;  height: 400px;"
                :disableDefaultUI="true"
                ref="mapRef"
                @dragend="updateCoordinates"
                @drag="updateCirclePosition"
                @zoom="updateCirclePosition"
        >
            <gmap-circle ref="circle"
                         :radius="4000"
                         :center='dragEvents.lat && dragEvents.lng ? dragEvents : center'
            />
        </gmap-map>
    </div>
</template>

<script>
    export default {
        name: "GoogleMap",
        data() {
            return {
                center: { lat: 1, lng: 1 },
                dragEvents: {lat: null, lng: null},
                markers: [],
                places: [],
                currentPlace: null
            };
        },
        mounted() {
            this.geolocate()
        },
        methods: {
            geolocate() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.$emit('mountedPosition', this.center)
                });
            },
            updateCoordinates() {
                this.dragEvents.lat = this.$refs.mapRef.$mapObject.getCenter().lat();
                this.dragEvents.lng = this.$refs.mapRef.$mapObject.getCenter().lng();
                this.$emit('dragEvents', this.dragEvents);
            },
            updateCirclePosition() {
                this.$refs.circle.$circleObject.setCenter({lat: this.$refs.mapRef.$mapObject.getCenter().lat(), lng: this.$refs.mapRef.$mapObject.getCenter().lng()})
            }
        }
    };
</script>