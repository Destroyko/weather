<template>
    <v-app id="inspire" dark>
        <v-navigation-drawer
                v-model="drawer"
                clipped
                fixed
                app
                hide-overlay
        >
            <!--<v-list dense>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Dashboard</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Settings</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>-->
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Weather</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout>
                    <v-flex xs12 sm7 offset-sm1>
                        <v-card class="pa-3" flat>
                            <v-card-title class="mt-0 pt-0 pl-0" primary-title>
                                <h3 class="headline mb-0">
                                    <v-icon>my_location</v-icon>
                                    {{ user.mapPositionName }}
                                </h3>
                            </v-card-title>

                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm3 class="ml-3">
                        <v-card class="pa-3" flat>
                            <google-map ref="gMap" @onUpdateMap="updateTemplateCard"/>
                        </v-card>
                        <v-card class="pb-2">
                            <near-positions-list @onUpdateMap="updateLocation"
                                                 v-bind:positionsList="user.mapNearPositions"/>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
    import GoogleMap from "./components/GoogleMap";
    import NearPositionsList from "./components/NearPositionsList";
    import OpenWeatherMap from './components/OpenWeatherMap';
    // import Autocomplete from './components/GoogleAutoComplete';

    export default {
        data: () => ({
            drawer: false,
            user: {
                mapPosition: {},
                mapPositionName: null,
                mapNearPositions: null
            }
        }),
        props: {source: String},
        components: {
            NearPositionsList,
            GoogleMap,
            OpenWeatherMap
        },
        methods: {
            updateLocation(_lat, _lng) {
                this.$refs.gMap.onUpdateMap(_lat, _lng);
            },
            updateTemplateCard(_event) {
                this.user = _event
            }
        },
        mounted() {

        },
        watch: {}
    }

</script>