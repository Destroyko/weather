<template>
    <div>
        <gmap-map
                :center="user.mapPosition"
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
                         :center='user.mapPosition'
            />

        </gmap-map>
    </div>

</template>

<script>
    export default {
        name: "GoogleMap",
        data() {
            return {
                newCoordinates: {lat: null, lng: null},
                user: {
                    mapPosition: {},
                    mapPositionName: null,
                    mapNearPositions: null
                },
                places: [],
                currentPlace: null
            };
        },
        mounted() {
            this.geolocate();

        },
        methods: {
            geolocate() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.user.mapPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.onDragEvents()
                });
            },
            onDragEvents() {
                // get user current position from map and save to data;
                this.getRemotePlace()
                // find near places and save to data;
                this.getRemoteNearPlaces()
                // console.log(this.user.mapPositionName)
                // console.log(this.user.mapNearPositions)
                this.$emit('dragEvents', this.user)
            },
            getRemotePlace() {
                this.axios.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.user.mapPosition.lat + ',' + this.user.mapPosition.lng + '&key=AIzaSyC8z6MribxwC44fk_suJ5uP-jrxH23ot6g')
                    .then(response => {
                        return this.setPlace(response.data.results) })
                    .catch(e => {console.table(e)});
            },
            getRemoteNearPlaces() {
                this.axios.post('http://api.geonames.org/findNearbyPlaceNameJSON?lat='+ this.user.mapPosition.lat +'&lng='+ this.user.mapPosition.lng +'&style=short&radius=5&cities=cities4500&maxRows=10&username=mr.destroyko')
                    .then(response => {
                        if (this._.size(response.data.geonames) >= 0)
                            this.user.mapNearPositions = response.data.geonames
                    })
                    .catch(e => {console.table(e)});
            },
            setPlace(place) {
                let _place
                // need add auto resize search zone. if not find city;
                _place = this._.find(place, {'types': ['locality','political']});
                if (!_place) {
                    _place = this._.find(place, {'types': ['administrative_area_level_2','political']});
                }
                // console.log(this._.get(_place, 'formatted_address'))
                this.user.mapPositionName = this._.get(_place, 'formatted_address')
                console.log(this.user.mapPositionName);
            },

            // ---------------------
            updateCoordinates() {
                this.user.mapPosition.lat = this.$refs.mapRef.$mapObject.getCenter().lat();
                this.user.mapPosition.lng = this.$refs.mapRef.$mapObject.getCenter().lng();
                this.onDragEvents();
            },
            updateCirclePosition() {
                this.$refs.circle.$circleObject.setCenter({lat: this.$refs.mapRef.$mapObject.getCenter().lat(), lng: this.$refs.mapRef.$mapObject.getCenter().lng()})
            },
        }
    };
</script>