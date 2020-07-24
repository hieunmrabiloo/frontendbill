<template>
    <div id="app">
        <v-app id="inspire">
            <v-card height="100%">
                <v-app-bar color="#0099ff" dark>
                    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                    <v-toolbar-title v-if="this.$route.path === '/'">Home</v-toolbar-title>
                    <v-toolbar-title v-if="this.$route.path === '/rooms'">Rooms</v-toolbar-title>
                    <v-toolbar-title v-if="this.$route.path === '/addRoom'">Add Room</v-toolbar-title>
                    <v-toolbar-title v-if="this.$route.path === '/searchRoom'">Search</v-toolbar-title>
                    <v-toolbar-title v-if="this.$route.path === '/login'">Login</v-toolbar-title>
                    <v-toolbar-title v-if="this.$route.path === '/register'">Sign Up</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <router-link class="text-decoration-none" to="/searchRoom">
                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </router-link>

                    <router-link class="text-decoration-none" to="/register" v-if="username == null">
                        <v-btn icon>
                            <v-icon>mdi-account-plus</v-icon>
                        </v-btn>
                    </router-link>
                    <v-btn v-else>{{username}}</v-btn>

                    <router-link class="text-decoration-none" to="/login" v-if="username == null">
                        <v-btn icon>
                            <v-icon>mdi-login</v-icon>
                        </v-btn>
                    </router-link>
                    <router-link class="text-decoration-none" to="/logout" v-else>
                        <v-btn icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-btn>
                    </router-link>
                </v-app-bar>
                <v-navigation-drawer absolute src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                                     v-model="drawer"
                                     width="300">
                    <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                        <v-row align="end" class="white--text pa-2 fill-height">
                            <v-col>
                                <h2 class="heading">{{this.username}}</h2>
                            </v-col>
                        </v-row>
                    </v-img>
                    <v-list nav>
                        <v-list-item-group active-class="deep-purple--text text--accent-4">
                            <router-link class="text-decoration-none" to="/">
                                <v-list-item >
                                    <v-list-item-action>
                                        <v-icon>mdi-home</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-title>Home</v-list-item-title>
                                </v-list-item>
                            </router-link>
                            <v-divider></v-divider>
                            <router-link class="text-decoration-none" to="/rooms">
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-icon>mdi-bed-empty</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-title>Rooms</v-list-item-title>
                                </v-list-item>
                            </router-link>
                            <router-link class="text-decoration-none" to="/addRoom">
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-icon>mdi-home-plus</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-title>Add Room</v-list-item-title>
                                </v-list-item>
                            </router-link>
                        </v-list-item-group>
                    </v-list>
                    <template v-if="this.username" v-slot:append>
                        <div class="pa-2">
                            <router-link class="text-decoration-none" to="/logout">
                                <v-btn block>Logout</v-btn>
                            </router-link>
                        </div>
                    </template>
                    <template v-else v-slot:append>
                        <div class="pa-2">
                            <router-link class="text-decoration-none" to="/login">
                                <v-btn block>Login</v-btn>
                            </router-link>
                        </div>
                    </template>
                </v-navigation-drawer>
                <router-view/>
            </v-card>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "app",
        data: function () {
            return {
                drawer: false,
                username: '',
            }
        },
        created() {
            this.username = sessionStorage.getItem('username');
        },
        watch: {
            $route(to, from) {
                if (to.path === '/' && from.path === '/login') {
                    this.username = sessionStorage.getItem('username');
                } else if (to.path === '/' && from.path === '/logout') {
                    this.username = null;
                }
            }
        }
    }
</script>

<style>

</style>