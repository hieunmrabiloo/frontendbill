<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/"><i aria-hidden="true" class="fa fa-home"></i></router-link>
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
      <div class="navbar-nav account-info" v-if="username != null">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <span class="nav-link"><i aria-hidden="true" class="fa fa-user"></i> {{username}}</span>
          </li>
          <li class="nav-item">
            <router-link class="nav-link account-info" to="/logout"><i aria-hidden="true"
                                                                       class="fa fa-sign-out"></i> Log Out
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-nav account-info" v-else>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/login"><i aria-hidden="true" class="fa fa-user"></i> Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link account-info" to="/register"><i aria-hidden="true"
                                                                         class="fa fa-sign-in"></i> Sign Up
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <br/>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "app",
    data: function () {
      return {
        username: '',
      }
    },
    created() {
      this.username = sessionStorage.getItem('username');
    },
    watch: {
      $route(to, from) {
        if (to.path === '/' && from.path === '/login') {
          this.username = sessionStorage.getItem('username');
        } else if (to.path === '/' && from.path === '/logout') {
          this.username = null;
        }
      }
    }
  }
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