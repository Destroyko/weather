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
                        <v-card>

                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <!--<Autocomplete />-->

                        <v-card>
                            <v-card-title primary-title>
                                <h3 class="headline mb-0">
                                    <v-icon>my_location</v-icon>
                                    {{ user.mapPositionName }}
                                </h3>
                            </v-card-title>
                        </v-card>
                        <v-card class="pa-3" flat>
                            <google-map ref="gMap" @onUpdateMap="updateTemplateCard"/>
                        </v-card>
                        <v-card>
                            <near-positions-list @onUpdateMap="updateLocation"
                                                 v-bind:positionsList="user.mapNearPositions"/>
                            <br>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app fixed>
            <v-toolbar
                    dense
                    floating
            >
                <v-text-field
                        hide-details
                        prepend-icon="search"
                        single-line
                ></v-text-field>

                <v-btn icon>
                    <v-icon>my_location</v-icon>
                </v-btn>
            </v-toolbar>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
    import GoogleMap from "./components/GoogleMap";
    import NearPositionsList from "./components/NearPositionsList";
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
            GoogleMap
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