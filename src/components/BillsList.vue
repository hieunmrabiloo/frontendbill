<template>
    <div id="app">
        <v-card>
            <v-card-title>
                Room {{this.selectedRoom.name}}
                <v-spacer></v-spacer>
                <v-text-field append-icon="mdi-magnify" hide-details label="Search" single-line v-model="search"/>
            </v-card-title>
            <v-data-table :headers="headers" :items="bills" :items-per-page="itemsPerPage" :page.sync="page"
                          :search="search"
                          :single-select="singleSelect" @page-count="pageCount = $event" class="elevation-1"
                          hide-default-footer item-key="id" show-select v-if="!loading" v-model="selected">
                <template v-slot:no-data>
                    <v-alert :value="true" color="#F44336" icon="warning">
                        Sorry, nothing to display here :(
                    </v-alert>
                </template>
                <template v-if="!loading" v-slot:top>
                    <v-switch label="Single select" v-model="singleSelect"></v-switch>
                </template>
                <template v-slot:item.totalPrice="{ item }">
                    <v-chip :color="getColor(item.totalPrice)" dark>
                        {{ item.totalPrice }}
                    </v-chip>
                </template>
            </v-data-table>
            <v-card-actions v-if="!loading">
                <v-pagination :length="pageCount" circle class="mx-16" v-model="page"/>
                <v-spacer/>
                <v-text-field :value="itemsPerPage" @input="itemsPerPage = parseInt($event, 10)"
                              label="Items per page" max="15" min="-1" type="number">
                </v-text-field>
            </v-card-actions>
            <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom/>
            <v-btn :loading="delLoading" @click="deleteBill" class="float-lg-right white--text" color="#F44336">
                <v-icon color="white">mdi-delete</v-icon>
                Delete
            </v-btn>
        </v-card>
    </div>
</template>
<script>
    import http from "../http-common";
    import Swal from "sweetalert2";

    export default {
        name: "BillsList",
        data: function () {
            return {
                loading: false,
                delLoading: false,
                page: 1,
                pageCount: 0,
                itemsPerPage: 5,
                search: '',
                singleSelect: false,
                selected: [],
                headers: [
                    {text: 'Month', value: 'monthBill', align: 'left', sortable: 'false'},
                    {text: 'Room Rates', value: 'roomRates'},
                    {text: 'Electricity Number', value: 'elecNum'},
                    {text: 'Electricity Price', value: 'elecPrice'},
                    {text: 'Water Number', value: 'waterNum'},
                    {text: 'Water Price', value: 'waterPrice'},
                    {text: 'Others', value: 'other'},
                    {text: 'Total', value: 'totalPrice'},
                ],
                id: [],
                roomId: '',
                selectedRoom: [],
                bills: [],
                prevRoute: null
            }
        },
        watch: {
            $route(val) {
                this.roomId = val.params.id;
                this.getRoom(this.roomId);
                this.getBillByRoomId(this.roomId);
            },
            // loading(val) {
            //     //this.deleteBill();
            //     if (!val) return
            //     setTimeout(() => (this.loading = false), 2000)
            // },
        },
        beforeRouteEnter(to, from, next) {
            if (to.path === '/bill/' + from.params.id && from.path === '/room/' + from.params.id) {
                next(vm => {
                    vm.getRoom(from.params.id);
                    vm.getBillByRoomId(from.params.id)
                    vm.path = "/bill/" + from.params.id
                })
            } else {
                next(vm => {
                    vm.path = "/bill/" + from.params.id
                })
            }
        },
        mounted() {
            this.roomId = this.$route.params.id;
            this.getRoom(this.roomId);
            this.getBillByRoomId(this.roomId);
        },
        props: ["room"],
        methods: {
            getRoom(id) {
                http
                    .get("/room/get/" + id)
                    .then(response => {
                        this.selectedRoom = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getBillByRoomId(roomId) {
                this.loading = true;
                http
                    .get("/bill/" + roomId)
                    .then(response => {
                        this.bills = response.data;
                        setTimeout(() => (this.loading = false), 2000)
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteBill() {
                this.delLoading = true;
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        for (let i = 0; i < this.selected.length; i++) {
                            http
                                .delete("/bill/delete/" + this.selected[i].id)
                                .then(response => {
                                    this.getBillByRoomId(this.roomId);
                                    console.log(response.data);
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Selected bills has been deleted!',
                                        showConfirmButton: false,
                                        timer: 1800
                                    })
                                    this.delLoading = false;
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        }
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'You have been cancel delete!',
                            showConfirmButton: false,
                            timer: 1800
                        })
                        this.delLoading = false;
                    }
                })
            },
            getColor(total) {
                if (total > 7000) return 'red'
                else if (total > 4000) return 'orange'
                else return 'green'
            },
        },
    };
</script>

<style scoped>

</style>