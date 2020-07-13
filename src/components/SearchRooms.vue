<template>
    <div class="search-form">
        <h4>Find by Name</h4>
        <div class="form-group">
            <input type="text" class="form-control" id="name" required v-model="name" name="name">
        </div>

        <div class="btn-group">
            <button v-on:click="searchRooms" class="btn btn-success">Search</button>
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
    .search-form {
        max-width: 400px;
        margin: auto;
    }
    .search-result {
        margin-top: 20px;
        text-align: left;
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
</style>