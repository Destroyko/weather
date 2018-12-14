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
                user: {
                    mapPosition: {},
                    mapPositionName: null,
                    mapNearPositions: null,
                    oldCoordinates: {}
                }
            };
        },
        mounted() {
            this.geolocate();
        },
        methods: {
            geolocate() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.user.mapPosition = this.user.oldCoordinates = {
                        lat: parseFloat(position.coords.latitude),
                        lng: parseFloat(position.coords.longitude)
                    };
                    this.onUpdateMap()
                });
            },
            onUpdateMap(_lat, _lng) {
                if (_lat && _lng) {
                    this.$refs.mapRef.$mapObject.setCenter({lat: parseFloat(_lat), lng: parseFloat(_lng)});
                    this.user.mapPosition = {
                        lat: parseFloat(_lat),
                        lng: parseFloat(_lng)
                    };
                    this.updateCirclePosition()
                }
                // get user current position from map and save to data;
                this.getRemotePlace()
                // find near places and save to data;
                this.getRemoteNearPlaces()
                this.$emit('onUpdateMap', this.user)
            },
            getRemotePlace() {
                this.axios.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.user.mapPosition.lat) + ',' + parseFloat(this.user.mapPosition.lng) + '&key=AIzaSyC8z6MribxwC44fk_suJ5uP-jrxH23ot6g')
                    .then(response => {
                        return this.setPlace(response.data.results)
                    })
                    .catch(e => {
                        console.table(e)
                    });
            },
            getRemoteNearPlaces() {
                this.axios.post('http://api.geonames.org/findNearbyPlaceNameJSON?lat=' + this.user.mapPosition.lat + '&lng=' + this.user.mapPosition.lng + '&style=short&radius=5&cities=cities4500&maxRows=10&username=mr.destroyko')
                    .then(response => {
                        if (this._.size(response.data.geonames) >= 0)
                            this.user.mapNearPositions = response.data.geonames
                    })
                    .catch(e => {
                        console.table(e)
                    });
            },
            setPlace(place) {
                let _place, _name;
                if (!_place) {
                    _place = this._.find(place, {'types': ['locality', 'political']});
                    if (_place = this._.get(_place, 'address_components')) {
                        let _level1, _level2, _level3;
                        if (_level1 = this._.find(_place, {'types': ['locality', 'political']}))
                            _level1 = _level1['long_name'];
                        else
                            _level1 = '';
                        if (_level2 = this._.find(_place, {'types': ['administrative_area_level_1', 'political']}))
                            if (_level2.long_name)
                                _level2 = _level2.long_name;
                        if (_level3 = this._.find(_place, {'types': ['country', 'political']}))
                            if (_level3.long_name)
                                _level3 = _level3.long_name;
                        _name = _level1 + ', ' + _level2 + ', ' + _level3
                    }
                }
                if (!_place) {
                    if (_place = this._.find(place, {'types': ['route']})) {
                        if (_place = this._.get(_place, 'address_components')) {
                            let _level1, _level2, _level3;
                            if (_level1 = this._.find(_place, {'types': ['locality', 'political']}))
                                _level1 = _level1['long_name'];
                            if (!_level1) {
                                if (_level1 = this._.find(_place, {'types': ['administrative_area_level_2', 'political']}))
                                    _level1 = _level1['short_name'];
                            }
                            if (_level2 = this._.find(_place, {'types': ['administrative_area_level_1', 'political']}))
                                if (_level2.long_name)
                                    _level2 = _level2.long_name;
                            if (_level3 = this._.find(_place, {'types': ['country', 'political']}))
                                if (_level3.long_name)
                                    _level3 = _level3.long_name;
                            _name = _level1 + ', ' + _level2 + ', ' + _level3
                        }
                    }
                }
                if (!_place) {
                    _place = this._.find(place, {'types': ['administrative_area_level_2', 'political']});
                    _name = this._.get(_place, 'formatted_address')
                }
                this.user.mapPositionName = _name
            },

            // ---------------------
            updateCoordinates() {
                this.user.mapPosition.lat = parseFloat(this.$refs.mapRef.$mapObject.getCenter().lat());
                this.user.mapPosition.lng = parseFloat(this.$refs.mapRef.$mapObject.getCenter().lng());
                this.onUpdateMap();

            },
            updateCirclePosition() {
                this.$refs.circle.$circleObject.setCenter({
                    lat: parseFloat(this.$refs.mapRef.$mapObject.getCenter().lat()),
                    lng: parseFloat(this.$refs.mapRef.$mapObject.getCenter().lng())
                })
            },
        }
    };
</script>