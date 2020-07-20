<template>
    <div class="list row">
        <div class="col-md-4">
            <h4>Find by Name</h4>
            <div class="form-group">
                <input class="form-control" id="name" name="name" required type="text" v-model="name">
            </div>

            <div class="btn-group">
                <button class="btn btn-success" v-on:click="searchRooms">Search</button>
            </div>

            <ul class="search-result">
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
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "SearchRooms",
        data() {
            return {
                name: '',
                rooms: []
            };
        },
        methods: {
            /* eslint-disable no-console */
            searchRooms() {
                http
                    .get("/room/search/" + this.name)
                    .then(response => {
                        this.rooms = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
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

    .search-result {
        margin-top: 20px;
        text-align: left;
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
</style>