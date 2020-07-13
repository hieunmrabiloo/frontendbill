import Vue from "vue";
import Router from "vue-router";
import RoomsList from "./components/RoomsList";
import Room from "./components/Room";
import AddRoom from "./components/AddRoom";
import SearchRooms from "./components/SearchRooms";
import BillsList from "./components/BillsList";

Vue.use(Router);

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
        }
    ]
});