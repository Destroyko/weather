<template>
    <v-app id="inspire" dark>
        <v-navigation-drawer
                v-model="drawer"
                clipped
                fixed
                app
                hide-overlay
        >
            <v-list dense>
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
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout>
                    <v-flex xs12 sm6 offset-sm3>
                        <!--<Autocomplete />-->
                        <v-card class="pa-3" flat height="400px">
                            <google-map @dragEvents="onDragEvents"/>
                        </v-card>
                        <v-card>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                                    <div>Located two hours south of Sydney in the <br>Southern Highlands of New South
                                        Wales, ...
                                    </div>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat color="orange">Share</v-btn>
                                <v-btn flat color="orange">Explore</v-btn>
                            </v-card-actions>
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
    import Autocomplete from './components/GoogleAutoComplete';

    export default {
        data: () => ({
            drawer: false,
            current_location: null,
            user: {
                mapPosition: null,
                mapPositionName: null
            }
        }),
        props: { source: String },
        components: {
            GoogleMap,
            Autocomplete
        },
        methods: {
            //refactoring: needs a controller;
            onDragEvents(position) {
                this.user.mapPosition = position;

                // move to other place;
                this.axios.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.user.mapPosition.lat + ',' + this.user.mapPosition.lng + '&key=AIzaSyC8z6MribxwC44fk_suJ5uP-jrxH23ot6g')
                    .then(response => {
                        // need add auto resize search zone. if not find city;
                        this.user.mapPositionName = this._.find(response.data.results, {'types': ['locality','political']});
                    })
                    .catch(e => {
                        console.table(e)
                    });
            }
        },
        mounted(){
            // auto set place after loading;

           // this.user.mapPosition.lat = GoogleMap.data().dragEvents.lat;
           // this.user.mapPosition.lng = GoogleMap.data().dragEvents.lng;
        },
        watch: {}
    }

</script>