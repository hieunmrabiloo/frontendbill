<template>
    <div id="app">
        <v-card>
            <v-data-table :headers="headers" :items="bills" :single-select="singleSelect"
                          class="elevation-1" item-key="id" show-select v-model="selected">
                <template v-slot:no-data>
                    <v-alert :value="true" color="#F44336" icon="warning">
                        Sorry, nothing to display here :(
                    </v-alert>
                </template>
                <template v-slot:top>
                    <v-switch label="Single select" v-model="singleSelect"></v-switch>
                </template>
                <template v-slot:item.totalPrice="{ item }">
                    <v-chip :color="getColor(item.totalPrice)" dark>
                        {{ item.totalPrice }}
                    </v-chip>
                </template>
            </v-data-table>
            <v-btn @click="deleteBill" class="float-lg-right" color="#F44336">Delete</v-btn>
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
                pagination: {
                    sortBy: 'monthBill'
                },
                singleSelect: false,
                check: false,
                selected: [],
                headers: [
                    {text: 'Month', value: 'monthBill', align: 'left', sortable: 'false'},
                    {text: 'Room Rates', value: 'roomRates'},
                    {text: 'Electricity Number', value: 'elecNum'},
                    {text: 'Electricity Price', value: 'elecPrice'},
                    {text: 'Water Number', value: 'waterNum'},
                    {text: 'Water Price', value: 'waterPrice'},
                    {text: 'Total', value: 'totalPrice'},
                ],
                id: [],
                selectedRoom: "",
                activate_index: null,
                bills: [
                    {
                        id: 0,
                        monthBill: 0,
                        roomRates: 0,
                        elecNum: 0,
                        elecPrice: 0,
                        waterNum: 0,
                        waterPrice: 0,
                        totalPrice: 0
                    }
                ],
                prevRoute: null
            }
        },
        watch: {
            $route(val) {
                this.selectedRoom = val.params.id;
                this.getBillByRoomId(this.selectedRoom);
            }
        },
        beforeRouteEnter(to, from, next) {
            if (to.path === '/bill/' + from.params.id && from.path === '/room/' + from.params.id) {
                next(vm => {
                    vm.getBillByRoomId(from.params.id)
                    vm.path = "/bill/" + from.params.id
                })
            } else {
                next(vm => {
                    vm.getBillByRoomId(from.params.id)
                    vm.path = "/bill/" + from.params.id
                })
            }
        },
        mounted() {
            this.selectedRoom = this.$route.params.id;
            this.getBillByRoomId(this.selectedRoom);
        },
        props: ["room"],
        methods: {
            getBillByRoomId(roomId) {
                http
                    .get("/bill/" + roomId)
                    .then(response => {
                        this.bills = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteBill() {
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
                                    this.getBillByRoomId(this.selectedRoom);
                                    console.log(response.data);
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Selected bill has been deleted!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
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
                            timer: 1500
                        })
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