<template>
    <div class="list row">
        <div class="col-md-4" v-if="this.username">
            <button class="btn btn-primary" type="button">
                <i aria-hidden="true" class="fa fa-list-ul"></i> Room List <span class="badge badge-light">{{rooms.length}}</span>
            </button>
            <ul>
                <li :key="index" v-for="(room, index) in rooms">
                    <span class="badge badge-pill badge-primary">{{room.name}}</span>
                    <div class="custom-div">
                        <router-link :to="{
                        name: 'room',
                        params: {room: room, id: room.id}
                    }">
                            Add Bill
                        </router-link>
                    </div>
                    ||
                    <div class="custom-div">
                        <router-link :to="{
                        name: 'list-bill',
                        params: {room: room, id: room.id}
                        }"
                        >
                            List Bill
                        </router-link>
                    </div>
                </li>
            </ul>
            <button @click="getRoomByRoomId" class="btn btn-primary" type="button">
                My Room
            </button>
            <ul>
                <li>
                    <span class="badge badge-pill badge-primary">{{this.roomName}}</span>
                    <div class="custom-div" v-if="this.roomName">
                        <router-link :to="{
                        name: 'list-bill',
                        params: {id: this.roomId}
                        }"
                        >
                            List Bill
                        </router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="alert alert-danger" role="alert" v-else>
            Please login first
        </div>
        <div class="col-md-7">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "RoomsList",
        data() {
            return {
                selectedRoom: "1",
                rooms: [],
                username: '',
                roomId: 0,
                roomName: '',
            };
        },
        created() {
            this.username = sessionStorage.getItem('username');
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
                const config = {
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.token
                    }
                }
                http
                    .get("/rooms", config)
                    .then(response => {
                        this.rooms = response.data; // JSON are parsed automatically.
                        console.log(response.data);
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
            refreshList() {
                this.retrieveRooms();
            }
            /* eslint-enable no-console */
        }
    }
</script>

<style scoped>
    .list {
        text-align: left;
        max-width: 1000px;
        margin: auto;
    }

    li {
        display: flex;
    }

    .custom-div {
        margin: 0 3px 0px 3px;
    }

    .badge {
        margin-top: 3px;
    }

    .btn-primary {
        margin-bottom: 13px;
        margin-left: 30px;
    }

    .col-md-7 {
        max-width: 650px;
    }
</style>