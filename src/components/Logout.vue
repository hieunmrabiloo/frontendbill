<template>
    <div>
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link class="nav-link account-info" to="/logout"><i aria-hidden="true" class="fa fa-sign-out"></i> Log Out
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "Logout",
        created() {
            sessionStorage.removeItem('username');
            sessionStorage.token = '';
            this.$router.push("/")
        }
    }
</script>

<style scoped>

</style>