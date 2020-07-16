<template>
    <form v-if="this.selectedRoom">
        <h6 v-if="bills.length == 0">No bill found</h6>
        <div v-else>
            <table id="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Month</th>
                    <th>Room Rates</th>
                    <th>Electricity Number</th>
                    <th>Electricity Price</th>
                    <th>Water Number</th>
                    <th>Water Price</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody id="tbody">
                <tr :class="{active: activate_index === index}" :key="index" @click="activate(index),getId(bill.id)"
                    v-for="(bill,index) in bills">
                    <td>{{index+1}}</td>
                    <td>{{bill.monthBill}}</td>
                    <td>{{bill.roomRates}}</td>
                    <td>{{bill.elecNum}}</td>
                    <td>{{bill.elecPrice}}</td>
                    <td>{{bill.waterNum}}</td>
                    <td>{{bill.waterPrice}}</td>
                    <td class="highlight">{{bill.totalPrice}}</td>
                </tr>
                </tbody>
            </table>
            <button class="btn btn-danger" v-on:click="deleteBill">Delete</button>
        </div>
    </form>
</template>
<script>
    import http from "../http-common";
    import Swal from "sweetalert2";

    export default {
        name: "BillsList",
        data: function () {
            return {
                id: 0,
                selectedRoom: "",
                activate_index: null,
                bills: []
            }
        },
        watch: {
            $route(val) {
                this.selectedRoom = val.params.id;
                this.getBillByRoomId(val.params.id);
            }
        },
        mounted() {
            this.selectedRoom = this.$route.params.id;
            this.getBillByRoomId(this.selectedRoom);
        },
        props: ["room"],
        methods: {
            getBillByRoomId(roomId){
                http
                    .get("/bill/" + roomId)
                    .then(response => {
                        this.bills = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteBill() {
                http
                    .delete("/bill/delete/" + this.id)
                    .then(() => {
                        this.getBillByRoomId(this.selectedRoom);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted selected bill successfully!!',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 500
                })
            },
            activate: function (index) {
                this.activate_index = index;
            },
            getId: function (id) {
                this.id = id;
            }
        },

    };
</script>

<style scoped>
    #table {
        width: 300px;
    }

    table {
        border: 2px solid #ddd;
        border-collapse: separate;
        border-left: 0;
        border-radius: 4px;
        border-spacing: 0px;
    }

    thead {
        /*display: table-header-group;*/
        vertical-align: middle;
        border-color: inherit;
        border-collapse: separate;
        background: #1c8fff;
    }

    tr {
        /*display: table-row;*/
        vertical-align: inherit;
        border-color: inherit;
    }

    th, td {
        padding: 5px 4px 6px 4px;
        text-align: left;
        vertical-align: top;
        border-left: 1px solid #ddd;
    }

    td {
        border-top: 2px solid #ddd;
    }

    thead:first-child tr:first-child th:first-child, tbody:first-child tr:first-child td:first-child {
        border-radius: 4px 0 0 0;
    }

    thead:last-child tr:last-child th:first-child, tbody:last-child tr:last-child td:first-child {
        border-radius: 0 0 0 4px;
    }

    .highlight {
        color: red;
        font-weight: bold;
    }

    ul > li:hover {
        cursor: pointer;
    }

    .active {
        background: #9cb4ff;
        font-weight: bold;
    }
    .btn-danger {
        float: right;
        margin-top: 5px;
    }
    form{
        float: left;
    }
</style>