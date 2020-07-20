<template>
    <div class="list row">
        <div class="col-md-4" v-if="this.username">
            <div v-if="!submitted">
                <h4>Name</h4>
                <div class="form-group">
                    <input class="form-control" id="name" name="name" required type="text" v-model="room.name">
                </div>
                <button class="btn btn-success" v-on:click="saveRoom">Save</button>
            </div>
            <div v-else>
                <h4>Save successfully!</h4>
                <button class="btn btn-success" v-on:click="newRoom">Add</button>
            </div>
        </div>
        <div class="alert alert-danger" role="alert" v-else>
            Please login first
        </div>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "AddRoom",
        data() {
            return {
                room: {
                    id: 0,
                    name: "",
                },
                submitted: false,
                username: '',
            };
        },
        created() {
            this.username = sessionStorage.getItem('username');
        },
        methods: {
            /* eslint-disable no-console */
            saveRoom() {
                const config = {
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.token
                    }
                }
                var data = {
                    name: this.room.name,
                };

                http
                    .post("/room", data, config)
                    .then(response => {
                        this.room.id = response.data.id;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            newRoom() {
                this.submitted = false;
                this.room = {};
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
</style>