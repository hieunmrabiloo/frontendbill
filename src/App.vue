<template>
    <div id="app" class="container-fluid">
        <div class="site-info">
            <h3>Room Management</h3>
        </div>
        <nav>
            <router-link class="btn btn-primary" to="/rooms"><i class="fa fa-bed" aria-hidden="true"></i> Rooms</router-link>
            <router-link class="btn btn-success" to="/addRoom"><i class="fa fa-plus-circle" aria-hidden="true"></i> Add Room</router-link>
            <router-link class="btn btn-dark" to="/searchRoom"><i class="fa fa-search" aria-hidden="true"></i> Search Room</router-link>
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
    .site-info {
        color: #4d2bff;
        margin-bottom: 20px;
    }

    .btn{
        margin-right: 5px;
    }

    .container-fluid {
        text-align: center;
    }
</style>