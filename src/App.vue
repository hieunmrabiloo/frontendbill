<template>
    <div id="app" class="container-fluid">
        <div class="site-info">
            <h3>Room Management</h3>
        </div>
        <nav>
            <router-link class="btn btn-primary" to="/rooms">Rooms</router-link>
            <router-link class="btn btn-primary" to="/addRoom">Add Room</router-link>
            <router-link class="btn btn-primary" to="/searchRoom">Search Room</router-link>
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

    .btn-primary{
        margin-right: 5px;
    }

    .container-fluid {
        text-align: center;
    }
</style>