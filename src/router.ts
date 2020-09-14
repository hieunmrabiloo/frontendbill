import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// @ts-ignore
import RoomsList from './components/RoomsList';
// @ts-ignore
import Room from "./components/Room";
// @ts-ignore
import AddRoom from "./components/AddRoom";
// @ts-ignore
import SearchRooms from "./components/SearchRooms";
// @ts-ignore
import BillsList from "./components/BillsList";
// @ts-ignore
import Login from "./components/Login";
// @ts-ignore
import Signup from "./components/Signup";
// @ts-ignore
import Logout from "./components/Logout";


export default new Router({
    mode: "history",
    routes: [
        {
            path: "/rooms",
            name: "rooms",
            component: RoomsList,
            children: [
                {
                    path: "/room/:id",
                    name: "room",
                    component: Room,
                    props: true,
                },
                {
                    path: "/bill/:id",
                    name: "list-bill",
                    component: BillsList,
                    props: true
                }
            ]
        },
        {
            path: "/addRoom",
            name: "addRoom",
            component: AddRoom
        },
        {
            path: "/searchRoom",
            name: "searchRoom",
            component: SearchRooms
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Signup
        },
        {
            path: "/logout",
            name: "logout",
            component: Logout
        }
    ]
});