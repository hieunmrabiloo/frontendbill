<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <router-link class="navbar-brand" to="/home"><i aria-hidden="true" class="fa fa-home"></i></router-link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/rooms"><i aria-hidden="true" class="fa fa-bed"></i> Rooms
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/addRoom"><i aria-hidden="true" class="fa fa-plus-circle"></i>
                            Add Room
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/searchRoom"><i aria-hidden="true" class="fa fa-search"></i>
                            Search Room
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="navbar-nav account-info">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login"><i aria-hidden="true" class="fa fa-user"></i> Login
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link account-info" to="/register"><i aria-hidden="true" class="fa fa-sign-in"></i> Sign Up
                        </router-link>
                    </li>
                </ul>
                <!--                    <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true"-->
                <!--                       aria-expanded="false">-->
                <!--                        Tên-->
                <!--                    </a>-->
                <!--                    <div class="dropdown-menu bg-dark">-->
                <!--                        <a class="dropdown-item" href="">-->
                <!--                            <i class="fa fa-sign-out"></i>-->
                <!--                            Log out</a>-->
                <!--                        <a class="dropdown-item" style="color: red" href="">-->
                <!--                            <i class="fa fa-trash-o"></i>-->
                <!--                            Delete Account</a>-->
                <!--                    </div>-->
            </div>
        </nav>
        <br/>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "app"
    };
</script>

<style>
    .account-info {
        color: white;
        margin-right: 30px;
    }

    .navbar-brand {
        font-size: x-large;
    }
</style>