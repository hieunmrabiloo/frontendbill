<template>
    <!--    <div class="limiter">-->
    <!--        <div class="container-login100">-->
    <!--            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">-->
    <!--					<span class="login100-form-title p-b-33">-->
    <!--						Account Login-->
    <!--					</span>-->
    <!--                <div class="wrap-input100 validate-input">-->
    <!--                    <input class="input100" name="username" placeholder="Username" required type="text"-->
    <!--                           v-model="username">-->
    <!--                    <span class="focus-input100-1"></span>-->
    <!--                    <span class="focus-input100-2"></span>-->
    <!--                </div>-->
    <!--                <div class="wrap-input100 rs1 validate-input">-->
    <!--                    <input class="input100" name="password" placeholder="Password" required type="password"-->
    <!--                           v-model="password" v-on:keyup.enter="checkLogin">-->
    <!--                    <span class="focus-input100-1"></span>-->
    <!--                    <span class="focus-input100-2"></span>-->
    <!--                </div>-->
    <!--                <div class="container-login100-form-btn m-t-20">-->
    <!--                    <button @click="checkLogin" class="login100-form-btn">-->
    <!--                        Sign in-->
    <!--                    </button>-->
    <!--                </div>-->
    <!--                <div class="text-center">-->
    <!--						<span class="txt1">-->
    <!--							Create an account?-->
    <!--						</span>-->
    <!--                    <router-link class="txt2 hov1" to="/register">Sign Up</router-link>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
    <v-app>
        <v-card class="mx-auto mt-5" width="400">
            <v-card-title>
                <h1 class="display-1">Login</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="Username" prepend-icon="mdi-account-circle" v-model="username"/>
                    <v-text-field :type="showPassword ? 'text' : 'password'" @click:append="showPassword=!showPassword"
                                  append-icon="mdi-eye-off"
                                  label="Password" prepend-icon="mdi-lock" v-model="password" v-on:keyup.enter="checkLogin"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" href="/register">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="checkLogin" color="info">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script>
    import http from "../http-common";
    import Swal from 'sweetalert2'

    export default {
        name: "login",
        data: function () {
            return {
                showPassword: false,
                username: "",
                password: "",
            }
        },
        methods: {
            checkLogin() {
                const data = {
                    username: this.username,
                    password: this.password
                }
                http
                    .post("/login", data)
                    .then(response => {
                            sessionStorage.token = response.data;
                            sessionStorage.setItem('username', this.username);
                            console.log(response.data);
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Login Successfully!!!',
                            })
                            this.$router.push('/');
                        }
                    )
                    .catch(e => {
                        if (e.response.status == 400) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Username or password incorrect!',
                            })
                        }
                        console.log(e);
                    });
            }
        }
    }

</script>

<style scoped>

</style>