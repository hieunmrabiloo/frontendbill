<template>
    <v-app>
        <v-card class="mx-auto mt-5" width="400">
            <v-card-title>
                <h1 class="display-1">Register</h1>
            </v-card-title>
            <v-card-text>
                <v-form lazy-validation ref="form" v-model="valid">
                    <v-text-field :rules="nameRules" label="Username" prepend-icon="mdi-account-circle"
                                  required v-model="username"/>
                    <v-text-field :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  :rules="passRules"
                                  :type="showPassword ? 'text' : 'password'"
                                  @click:append="showPassword=!showPassword" label="Password" prepend-icon="mdi-lock"
                                  required v-model="password" v-on:keyup.enter="checkSignup"/>
                    <v-select :items="roomName" :rules="[v => !!v || 'Item is required']"
                              @change="getRoomByName(room.name)"
                              @click="getRoomName"
                              label="Choose your room" prepend-icon="mdi-door" required
                              v-model="room.name">
                    </v-select>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" href="/login">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="checkSignup" color="info">Sign Up</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script lang="ts">
    import http from "../http-common";
    import Swal from "sweetalert2";
    import {Vue, Component} from "vue-property-decorator";
    // eslint-disable-next-line no-unused-vars
    import RoomEntity from "@/types/RoomEntity";

    @Component
    export default class Signup extends Vue {
        valid: boolean = true;
        showPassword: boolean = false;
        username: "";
        nameRules: ((v) => boolean | string)[] = [v => !!v || 'Name is required'];
        password: "";
        passRules: ((v) => boolean | string)[] = [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6 && v.length <= 18) || 'Password must be between 6-18 characters',
        ];
        rooms: Array<any> = [];
        roomName: Array<any> = [];
        room: RoomEntity = {id: "", name: "",};

        mounted() {
            this.retrieveRooms();
        }

        checkSignup() {
            var data = {
                username: this.username,
                password: this.password,
                room: this.room,
            };
            this.$refs.form.validate();
            http
                .put("/register", data)
                .then(response => {
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Your account has been created!',
                    })
                })
                .catch(e => {
                    console.log(e);
                });
        }

        retrieveRooms() {
            http
                .get("/user/rooms")
                .then(response => {
                    this.rooms = response.data; // JSON are parsed automatically.
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        getRoomName() {
            try {
                for (let i = 0; i < this.rooms.length; i++) {
                    this.roomName.push(this.rooms[i].name);
                }
            } catch (e) {
                console.log(e);
            }
        }

        getRoomByName(name) {
            http
                .get("/room/" + name)
                .then(response => {
                    this.room = response.data; // JSON are parsed automatically.
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
</script>

<style scoped>

</style>