<template>
    <v-app>
        <v-card class="mx-auto mt-5" width="400">
            <v-card-title>
                <h1 class="display-1">Login</h1>
            </v-card-title>
            <v-card-text>
                <v-form lazy-validation ref="form" v-model="valid">
                    <v-text-field :rules="nameRules" label="Username" prepend-icon="mdi-account-circle"
                                  required v-model="username"/>
                    <v-text-field :rules="passRules" :type="showPassword ? 'text' : 'password'"
                                  @click:append="showPassword=!showPassword"
                                  append-icon="mdi-eye-off" label="Password" prepend-icon="mdi-lock"
                                  required v-model="password" v-on:keyup.enter="checkLogin"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" href="/register">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="checkLogin" color="info">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>

<script lang="ts">
    import http from "../http-common";
    import Swal from 'sweetalert2';
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Login extends Vue {
        valid: boolean = true;
        showPassword: boolean = false;
        username: string = "";
        nameRules: ((v) => boolean | string)[] = [v => !!v || 'Name is required'];
        password: string = "";
        passRules: ((v) => boolean | string)[] = [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6 && v.length <= 18) || 'Password must be between 6-18 characters'
        ];

        checkLogin(): void {
            const data = {
                username: this.username,
                password: this.password
            }
            this.$refs.form.validate();
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
                    if (e.response.status === 400 && this.valid === true) {
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
</script>

<style scoped>

</style>