<template>
    <div class="list row">
        <div class="col-md-6">
            <button type="button" class="btn btn-primary">
                Room List <span class="badge badge-light">{{rooms.length}}</span>
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
                    }">
                            List Bill
                        </router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
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
                rooms: []
            };
        },
        methods: {
            /* eslint-disable no-console */
            retrieveRooms() {
                http
                    .get("/rooms")
                    .then(response => {
                        this.rooms = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveRooms();
            }
            /* eslint-enable no-console */
        },
        mounted() {
            this.retrieveRooms();
        }
    }
</script>

<style scoped>
    .list {
        text-align: left;
        max-width: 600px;
        margin: auto;
    }
    li{
        display: flex;
    }
    .custom-div{
        margin:0 3px 0px 3px;
    }
    .badge{
        margin-top: 3px;
    }
    .btn-primary{
        margin-bottom: 13px;
    }
</style>