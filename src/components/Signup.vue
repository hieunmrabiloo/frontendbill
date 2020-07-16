<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
					<span class="login100-form-title p-b-33">
						Account SignUp
					</span>
                    <div class="wrap-input100">
                        <input class="input100" name="username" placeholder="Username" required type="text" v-model="username">
                        <span class="focus-input100-1"></span>
                        <span class="focus-input100-2"></span>
                    </div>
                    <div class="wrap-input100 rs1">
                        <input class="input100" name="password" placeholder="Password" required type="password" v-model="password">
                        <span class="focus-input100-1"></span>
                        <span class="focus-input100-2"></span>
                    </div>
                    <div>
                        <select class="form-control" v-model="roomName" @change="getRoomByName(roomName)" required>
                            <option :value="null" selected disabled>Choose your room</option>
                            <option :key="index" v-for="(room,index) in rooms">{{room.name}}</option>
                        </select>
                    </div>
                    <div class="container-login100-form-btn m-t-20">
                        <button class="login100-form-btn" id="submit" name="submit" @click="checkSignup">
                            Sign up
                        </button>
                    </div>
                    <div class="text-center">
						<span class="txt1">
							Having account?
						</span>
                        <a class="txt2 hov1" href="/login">
                            Login
                        </a>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "Signup",
        data: function () {
            return {
                roomName: "",
                username: "",
                password: "",
                rooms: [],
                room: {},
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
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            retrieveRooms() {
                http
                    .get("/rooms")
                    .then(response => {
                        this.rooms = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getRoomByName:function(name) {
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
    @font-face {
        font-family: OpenSans-Regular;
    }

    /*//////////////////////////////////////////////////////////////////
    [ RESTYLE TAG ]*/

    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
        font-family: OpenSans-Regular, sans-serif;
    }

    /*---------------------------------------------*/
    a {
        font-size: 14px;
        line-height: 1.7;
        color: #666666;
        margin: 0px;
        transition: all 0.4s;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
    }

    a:focus {
        outline: none !important;
    }

    a:hover {
        text-decoration: none;
    }

    /*---------------------------------------------*/
    h1, h2, h3, h4, h5, h6 {
        margin: 0px;
    }

    p {
        font-size: 14px;
        line-height: 1.7;
        color: #666666;
        margin: 0px;
    }

    ul, li {
        margin: 0px;
        list-style-type: none;
    }


    /*---------------------------------------------*/
    input {
        outline: none;
        border: none;
    }

    textarea {
        outline: none;
        border: none;
    }

    textarea:focus, input:focus {
        border-color: transparent !important;
    }

    input::-webkit-input-placeholder {
        color: #666666;
    }

    input:-moz-placeholder {
        color: #666666;
    }

    input::-moz-placeholder {
        color: #666666;
    }

    input:-ms-input-placeholder {
        color: #666666;
    }

    textarea::-webkit-input-placeholder {
        color: #666666;
    }

    textarea:-moz-placeholder {
        color: #666666;
    }

    textarea::-moz-placeholder {
        color: #666666;
    }

    textarea:-ms-input-placeholder {
        color: #666666;
    }

    /*---------------------------------------------*/
    button {
        outline: none !important;
        border: none;
        background: transparent;
    }

    button:hover {
        cursor: pointer;
    }

    iframe {
        border: none !important;
    }

    /*//////////////////////////////////////////////////////////////////
    [ Utility ]*/
    .txt1 {
        font-size: 15px;
        line-height: 1.4;
        color: #999999;
    }

    .txt2 {
        font-size: 15px;
        line-height: 1.4;
        color: #4272d7;
    }

    .hov1:hover {
        text-decoration: underline;
    }


    /*//////////////////////////////////////////////////////////////////
    [ login ]*/

    .limiter {
        width: 100%;
        margin: 0 auto;
    }

    .container-login100 {
        width: 100%;
        min-height: 80vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 15px;
    }

    .wrap-login100 {
        width: 500px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;

        box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
        -o-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
        -ms-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    }


    /*==================================================================
    [ Form ]*/

    .login100-form {
        width: 100%;
    }

    .login100-form-title {
        display: block;
        font-size: 30px;
        color: #555555;
        line-height: 1.2;
        text-align: center;
    }

    /*------------------------------------------------------------------
    [ Input ]*/

    .wrap-input100 {
        width: 100%;
        position: relative;
        background-color: #fff;
        border: 1px solid #e6e6e6;
    }

    .wrap-input100.rs1 {
        border-top: none;
    }

    .input100 {
        display: block;
        width: 100%;
        background: transparent;
        font-size: 15px;
        color: #666666;
        line-height: 1.2;
    }


    /*---------------------------------------------*/
    input.input100 {
        height: 68px;
        padding: 0 25px 0 25px;
    }

    /*------------------------------------------------------------------
    [ Focus Input ]*/

    .focus-input100-1,
    .focus-input100-2 {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    .focus-input100-1::before,
    .focus-input100-2::before {
        content: "";
        display: block;
        position: absolute;
        width: 0;
        height: 1px;
        background-color: #4272d7;
    }

    .focus-input100-1::before {
        top: -1px;
        left: 0;
    }

    .focus-input100-2::before {
        bottom: -1px;
        right: 0;
    }

    .focus-input100-1::after,
    .focus-input100-2::after {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        height: 0;
        background-color: #4272d7;
    }

    .focus-input100-1::after {
        top: 0;
        right: -1px;
    }

    .focus-input100-2::after {
        bottom: 0;
        left: -1px;
    }

    .input100:focus + .focus-input100-1::before {
        -webkit-animation: full-w 0.2s linear 0s;
        animation: full-w 0.2s linear 0s;
        animation-fill-mode: both;
        -webkit-animation-fill-mode: both;
    }

    .input100:focus + .focus-input100-1::after {
        -webkit-animation: full-h 0.1s linear 0.2s;
        animation: full-h 0.1s linear 0.2s;
        animation-fill-mode: both;
        -webkit-animation-fill-mode: both;
    }

    .input100:focus + .focus-input100-1 + .focus-input100-2::before {
        -webkit-animation: full-w 0.2s linear 0.3s;
        animation: full-w 0.2s linear 0.3s;
        animation-fill-mode: both;
        -webkit-animation-fill-mode: both;
    }

    .input100:focus + .focus-input100-1 + .focus-input100-2::after {
        -webkit-animation: full-h 0.1s linear 0.5s;
        animation: full-h 0.1s linear 0.5s;
        animation-fill-mode: both;
        -webkit-animation-fill-mode: both;
    }


    @keyframes full-w {
        to {
            width: calc(100% + 1px);
        }
    }

    @keyframes full-h {
        to {
            height: calc(100% + 1px);
        }
    }


    /*------------------------------------------------------------------
    [ Button ]*/
    .container-login100-form-btn {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
    }

    .login100-form-btn {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        width: 100%;
        height: 60px;
        background-color: #4272d7;

        font-size: 14px;
        color: #fff;
        line-height: 1.2;
        text-transform: uppercase;

        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }

    .login100-form-btn:hover {
        background-color: #333333;
    }


    /*------------------------------------------------------------------
    [ Alert validate ]*/

    .validate-input {
        position: relative;
    }

    @media (max-width: 992px) {
        .alert-validate::before {
            visibility: visible;
            opacity: 1;
        }
    }
</style>