<template>
    <!--    <div class="limiter">-->
    <!--        <div class="container-login100">-->
    <!--            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">-->
    <!--					<span class="login100-form-title p-b-33">-->
    <!--						Account SignUp-->
    <!--					</span>-->
    <!--                <div class="wrap-input100">-->
    <!--                    <input class="input100" name="username" placeholder="Username" required type="text"-->
    <!--                           v-model="username">-->
    <!--                    <span class="focus-input100-1"></span>-->
    <!--                    <span class="focus-input100-2"></span>-->
    <!--                </div>-->
    <!--                <div class="wrap-input100 rs1">-->
    <!--                    <input class="input100" name="password" placeholder="Password" required type="password"-->
    <!--                           v-model="password">-->
    <!--                    <span class="focus-input100-1"></span>-->
    <!--                    <span class="focus-input100-2"></span>-->
    <!--                </div>-->
    <!--                <div>-->
    <!--                    <select @change="getRoomByName(roomName)" class="form-control" required v-model="roomName">-->
    <!--                        <option :value="null" disabled selected>Choose your room</option>-->
    <!--                        <option :key="index" v-for="(room,index) in rooms">{{room.name}}</option>-->
    <!--                    </select>-->
    <!--                </div>-->
    <!--                <div class="container-login100-form-btn m-t-20">-->
    <!--                    <button @click="checkSignup" class="login100-form-btn" id="submit" name="submit">-->
    <!--                        Sign up-->
    <!--                    </button>-->
    <!--                </div>-->
    <!--                <div class="text-center">-->
    <!--						<span class="txt1">-->
    <!--							Having account?-->
    <!--						</span>-->
    <!--                    <router-link class="txt2 hov1" to="/login">Login</router-link>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
    <v-app>
        <v-card class="mx-auto mt-5" width="400">
            <v-card-title>
                <h1 class="display-1">Register</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Username" prepend-icon="mdi-account-circle" v-model="username"/>
                    <v-text-field :type="showPassword ? 'text' : 'password'" @click:append="showPassword=!showPassword"
                                  append-icon="mdi-eye-off"
                                  label="Password" prepend-icon="mdi-lock" v-model="password"
                                  v-on:keyup.enter="checkSignup"/>
                    <v-select :items="roomName" @change="getRoomByName(room.name)" @click="getRoomName"
                              label="Choose your room"
                              prepend-icon="mdi-door" v-model="room.name">
                    </v-select>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" href="/login">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="checkSignup" color="info">Sign Up</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
    import http from "../http-common";
    import Swal from "sweetalert2";

    export default {
        name: "Signup",
        data: function () {
            return {
                showPassword: false,
                username: "",
                password: "",
                rooms: [],
                roomName: [],
                room: {
                    id: 0,
                    name: "",
                },
            }
        },
        mounted() {
            this.retrieveRooms();
        },
        methods: {
            checkSignup() {
                var data = {
                    username: this.username,
                    password: this.password,
                    room: this.room,
                };
                http
                    .put("/register", data)
                    .then(response => {
                        this.username = response.data.username;
                        this.password = response.data.password;
                        this.room = response.data.room;
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Your account has been created!',
                        })
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
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
            },
            getRoomName() {
                try {
                    for (let i = 0; i < this.rooms.length; i++) {
                        this.roomName.push(this.rooms[i].name);
                    }
                }catch (e) {
                    console.log(e);
                }
            },
            getRoomByName: function (name) {
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
    }

</script>

<style scoped>

</style>