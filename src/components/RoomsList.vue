<template>
    <div id="app">
        <v-overlay :value="true" v-if="!this.username">
            <v-alert prominent type="error">
                <v-row align="center">
                    <v-col class="grow">You must login to take actions
                        <router-link class="text-decoration-none" to="/login">
                            <v-btn>Login</v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-alert>
        </v-overlay>
        <v-app id="inspire" v-else>
            <div>
                <v-row class="ma-2">
                    <v-col md="4">
                        <div class="text-center">
                            <v-menu bottom offset-y open-on-hover origin="center center" rounded="b-xl"
                                    transition="scale-transition">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn :loading="loading" color="primary" dark v-bind="attrs" v-on="on">
                                        <v-badge :content="rooms.length" transition="slide-x-transition">
                                            <v-icon>mdi-format-list-bulleted-type</v-icon>
                                            Rooms
                                        </v-badge>
                                    </v-btn>
                                </template>
                                <v-list width="240">
                                    <v-list-item :key="index" v-for="(room, index) in rooms">
                                        <v-list-item-content>
                                            <router-link :to="{name: 'room',params: {room: room, id: room.id}}"
                                                         class="hvr-icon-pulse text-decoration-none">
                                                <v-icon class="hvr-icon">mdi-plus-box</v-icon>
                                                <v-list-item-title v-text="'Room:'+room.name"></v-list-item-title>
                                            </router-link>
                                        </v-list-item-content>
                                        <v-list-item-content>
                                            <router-link :to="{name: 'list-bill',params: {room: room, id: room.id}}"
                                                         class="hvr-icon-buzz text-decoration-none">
                                                <v-icon class="hvr-icon">mdi-clipboard-list</v-icon>
                                                <v-list-item-title v-text="'Bills: '+room.name"></v-list-item-title>
                                            </router-link>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <v-menu bottom offset-y origin="center center" rounded="b-xl"
                                    transition="scale-transition">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="getRoomByRoomId" color="primary" dark v-bind="attrs" v-on="on">
                                        <v-icon>mdi-door</v-icon>
                                        My Room
                                    </v-btn>
                                </template>
                                <v-list v-if="this.roomName">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <router-link :to="{name: 'list-bill',params: {id: this.roomId}}"
                                                         class="custom-hover text-decoration-none">
                                                <v-list-item-title v-text="'Room: '+this.roomName"></v-list-item-title>
                                            </router-link>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </v-col>
                    <v-col>
                        <v-card class="mx-auto" max-height="600" max-width="750">
                            <router-view/>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-app>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "RoomsList",
        data() {
            return {
                loading: false,
                hover: false,
                selectedRoom: "1",
                rooms: [],
                username: '',
                roomId: 0,
                roomName: '',
            };
        },
        watch: {
            $route() {
                this.retrieveRooms();
            }
        },
        created() {
            this.username = sessionStorage.getItem('username');
            this.retrieveRooms();
        },
        mounted() {
            if (this.username != null) {
                this.retrieveRooms();
                this.getRoomIdByUsername();
            }
        },
        methods: {
            /* eslint-disable no-console */
            retrieveRooms() {
                this.loading = true;
                const config = {
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.token
                    }
                }
                http
                    .get("/rooms", config)
                    .then(response => {
                        this.rooms = response.data; // JSON are parsed automatically.
                        setTimeout(() => (this.loading = false), 1000)
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getRoomIdByUsername() {
                const config = {
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.token
                    }
                }
                http
                    .get("/user/" + this.username, config)
                    .then(response => {
                        this.roomId = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            getRoomByRoomId() {
                const config = {
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.token
                    }
                }
                http
                    .get("/room/user/" + this.roomId, config)
                    .then(response => {
                        this.roomName = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            /* eslint-enable no-console */
        }
    }
</script>

<style scoped>
    @-webkit-keyframes hvr-icon-pulse {
        25% {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }
        75% {
            -webkit-transform: scale(0.8);
            transform: scale(0.8);
        }
    }

    @keyframes hvr-icon-pulse {
        25% {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }
        75% {
            -webkit-transform: scale(0.8);
            transform: scale(0.8);
        }
    }

    .hvr-icon-pulse {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    }

    .hvr-icon-pulse .hvr-icon {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-transition-timing-function: ease-out;
        transition-timing-function: ease-out;
    }

    .hvr-icon-pulse:hover .hvr-icon, .hvr-icon-pulse:focus .hvr-icon, .hvr-icon-pulse:active .hvr-icon {
        -webkit-animation-name: hvr-icon-pulse;
        animation-name: hvr-icon-pulse;
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    @-webkit-keyframes hvr-icon-buzz {
        50% {
            -webkit-transform: translateX(3px) rotate(2deg);
            transform: translateX(3px) rotate(2deg);
        }
        100% {
            -webkit-transform: translateX(-3px) rotate(-2deg);
            transform: translateX(-3px) rotate(-2deg);
        }
    }

    @keyframes hvr-icon-buzz {
        50% {
            -webkit-transform: translateX(3px) rotate(2deg);
            transform: translateX(3px) rotate(2deg);
        }
        100% {
            -webkit-transform: translateX(-3px) rotate(-2deg);
            transform: translateX(-3px) rotate(-2deg);
        }
    }

    .hvr-icon-buzz {
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0);
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
    }

    .hvr-icon-buzz .hvr-icon {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }

    .hvr-icon-buzz:hover .hvr-icon, .hvr-icon-buzz:focus .hvr-icon, .hvr-icon-buzz:active .hvr-icon {
        -webkit-animation-name: hvr-icon-buzz;
        animation-name: hvr-icon-buzz;
        -webkit-animation-duration: 0.15s;
        animation-duration: 0.15s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

</style>