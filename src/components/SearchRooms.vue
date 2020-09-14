<template>
    <div id="app">
        <v-card class="mx-auto ma-2" max-width="300">
            <v-card-title>
                <h3>Find By Name</h3>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="RoomEntity Name" v-model="name"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="searchRooms" color="success">Search</v-btn>
            </v-card-actions>
        </v-card>
        <v-col class="mx-auto" v-if="this.submitted">
            <div class="text-center">
                <v-menu bottom offset-y open-on-hover origin="center center" rounded="b-xl"
                        transition="scale-transition">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            <v-icon>mdi-format-list-bulleted-type</v-icon>
                            Rooms
                        </v-btn>
                    </template>
                    <v-list width="240">
                        <v-list-item :key="index" v-for="(room, index) in rooms">
                            <v-list-item-content>
                                <router-link :to="{name: 'room',params: {room: room, id: room.id}}"
                                             class="v-card--hover text-decoration-none">
                                    <v-icon>mdi-plus-box</v-icon>
                                    <v-list-item-title v-text="'RoomEntity:'+room.name"></v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                            <v-list-item-content>
                                <router-link :to="{name: 'list-bill',params: {room: room, id: room.id}}"
                                             class="v-card--hover text-decoration-none">
                                    <v-icon>mdi-clipboard-list</v-icon>
                                    <v-list-item-title v-text="'Bills: '+room.name"></v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-col>
    </div>
</template>

<script lang="ts">
    import http from "../http-common";
    import {Component, Vue} from "vue-property-decorator";
    // eslint-disable-next-line no-unused-vars
    import RoomEntity from "@/types/RoomEntity";

    @Component
    export default class SearchRooms extends Vue {
        submitted: boolean = false;
        name: string = '';
        rooms: Array<RoomEntity> = [];

        searchRooms(): void {
            http
                .get("/room/search/" + this.name)
                .then(response => {
                    this.rooms = response.data; // JSON are parsed automatically.
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            this.submitted = true;
        }

    }
</script>

<style scoped>

</style>