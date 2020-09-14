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
            <v-card class="mx-auto ma-2" max-width="300" v-if="!snackbar">
                <v-card-title>
                    <h3>Add RoomEntity</h3>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="RoomEntity Name" v-model="room.name"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="saveRoom" color="success">Add</v-btn>
                </v-card-actions>
            </v-card>
            <v-snackbar timeout="4000" v-model="snackbar">
                Add successfully!!!
                <template v-slot:action="{ attrs }">
                    <v-btn @click="newRoom" color="blue" text v-bind="attrs">
                        Add more
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </div>
</template>

<script lang="ts">
    import http from "../http-common";
    import {Component, Vue} from "vue-property-decorator";
    // eslint-disable-next-line no-unused-vars
    import RoomEntity from "../types/RoomEntity";

    @Component
    export default class AddRoom extends Vue {
        // name: "AddRoom";
        snackbar: boolean = false;
        room: RoomEntity = {id: 0, name: ""};
        username: string = "";

        created() {
            this.username = sessionStorage.getItem('username');
        }

        // get snackBar(): boolean {
        //     return this.snackbar;
        // }

        private saveRoom(): void {
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
            this.snackbar = true;
        }

        private newRoom(): void {
            this.snackbar = false;
            this.room = {id: 0, name: ""}
        }
    }
</script>

<style scoped>

</style>