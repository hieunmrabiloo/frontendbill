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
    import Swal from "sweetalert2";

    export default {
        name: "Logout",
        created() {
            sessionStorage.removeItem('username');
            sessionStorage.token = '';
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Logged out!',
            })
            this.$router.push("/")
        }
    }
</script>

<style scoped>

</style>