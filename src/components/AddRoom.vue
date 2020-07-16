<template>
    <div>
        <div v-if="this.username" class="submitform">
            <div v-if="!submitted">
                <h4>Name</h4>
                <div class="form-group">
                    <input type="text" class="form-control" id="name" required v-model="room.name" name="name">
                </div>
                <button v-on:click="saveRoom" class="btn btn-success">Save</button>
            </div>
            <div v-else>
                <h4>Save successfully!</h4>
                <button class="btn btn-success" v-on:click="newRoom">Add</button>
            </div>
        </div>
        <div v-else class="alert alert-danger" role="alert">
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
    .submitform {
        max-width: 400px;
        margin: auto;
    }
    .alert{
        max-width: 157.53px;
        margin-left: 86.5px;
        text-align: center;
    }
</style>