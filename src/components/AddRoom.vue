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
        <div v-else>
            <v-card class="mx-auto ma-2" max-width="300" v-if="!submitted">
                <v-card-title>
                    <h3>Add Room</h3>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Room Name" v-model="room.name"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="saveRoom" color="success">Add</v-btn>
                </v-card-actions>
            </v-card>
            <v-card class="mx-auto ma-2" max-width="300" v-else>
                <v-alert m type="success">Submit Successfully</v-alert>
                <v-btn @click="newRoom" class="float-lg-right" color="info">Add more</v-btn>
            </v-card>
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