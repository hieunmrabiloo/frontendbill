<template>
    <div id="app">
        <v-card>
            <v-card-title>
                <h1 class="display-1">Room {{this.selectedRoom.name}}</h1>
            </v-card-title>
            <v-card-text>
                <v-alert border="left" dense type="info">
                    Previous Electric Number: {{preElecNum}} | Previous Water Number: {{preWaterNum}}
                </v-alert>
                <v-alert :key="error" border="right" dense type="error" v-for="error in errors">
                    <div v-if="errors.length">{{error}}</div>
                </v-alert>
                <v-form>
                    <table id="table">
                        <thead>
                        <tr>
                            <th>Month</th>
                            <th>Room Rates</th>
                            <th>Electricity</th>
                            <th>Water</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input @change="comboGet" @keyup="checkMonth" class="form-control" id="monthBill"
                                       type="text"
                                       v-model="monthBill"></td>
                            <td><input class="form-control" id="rates" type="text" v-model="roomRates">
                            </td>
                            <td><input @change="checkForm" class="form-control" id="elecNum" type="text"
                                       v-model="elecNum">
                                -
                                <input class="form-control" id="preElecNum" readonly type="text"
                                       v-model="preElecNum">
                                x
                                <select class="form-control custom-select" id="elecPrice" name="elecPrice"
                                        v-model="elecPrice">
                                    <option value="2">2k/num</option>
                                    <option value="3">3k/num</option>
                                    <option value="4">4k/num</option>
                                    <option value="5">5k/num</option>
                                    <option value="6">6k/num</option>
                                </select>
                            </td>
                            <td><input @change="checkForm" class="form-control" id="waterNum" type="text"
                                       v-model="waterNum">
                                -
                                <input class="form-control" id="preWaterNum" readonly type="text"
                                       v-model="preWaterNum">
                                x
                                <select class="form-control custom-select" id="waterPrice" name="waterPrice"
                                        v-model="waterPrice">
                                    <option value="20">20k/num</option>
                                    <option value="25">25k/num</option>
                                    <option value="30">30k/num</option>
                                    <option value="35">35k/num</option>
                                    <option value="40">40k/num</option>
                                </select>
                            </td>
                            <td><input class="form-control" readonly type="text" v-model="totalPrice"></td>
                        </tr>
                        </tbody>
                    </table>
                </v-form>
            </v-card-text>
            <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom/>
            <v-btn @click="loading = true" class="float-lg-right" color="success">
                <v-icon>mdi-clipboard-check</v-icon>
                Save
            </v-btn>
        </v-card>
    </div>
</template>

<script>
    import http from "../http-common";
    import Swal from "sweetalert2";

    export default {
        name: "Room",
        data: function () {
            return {
                loading: false,
                selectedRoom: [],
                roomId: '',
                errors: [],
                preElecNum: 0,
                preWaterNum: 0,
                updateId: 0,
                check: false,
                billBymonth: 0,
                id: 0,
                monthBill: 1,
                roomRates: 0,
                elecNum: 0,
                elecPrice: 0,
                waterNum: 0,
                waterPrice: 0,
            };
        },
        computed: {
            totalPrice: function () {
                return Number(this.roomRates) + Number((this.elecNum - this.preElecNum) * this.elecPrice)
                    + Number((this.waterNum - this.preWaterNum) * this.waterPrice);
            }
        },
        watch: {
            $route(val) {
                this.roomId = val.params.id;
                this.getRoom(this.roomId);
            },
            loading(val) {
                this.saveBill();
                setTimeout(() => (this.loading = false), 2000)
                if (!val) return
            },

        },
        mounted() {
            this.roomId = this.$route.params.id;
            this.getRoom(this.roomId);
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
            checkForm() {
                this.errors = [];
                if (this.elecNum <= this.preElecNum) {
                    this.errors.push('Current electric number must be greater than Previous electric number!')
                }
                if (this.waterNum <= this.preWaterNum) {
                    this.errors.push('Current water number must be greater than Previous water number!')
                }
            },
            checkMonth() {
                this.errors = [];
                if (this.monthBill == '' || this.monthBill == 0) {
                    this.errors.push('You must input month!')
                } else if (this.monthBill > 12) {
                    this.errors.push('Month cant greater than 12')
                }
            },
            saveBill() {
                if (this.loading == false) {
                    var data = {
                        preElecNum: this.preElecNum,
                        preWaterNum: this.preWaterNum,
                        updateId: this.updateId,
                        check: this.check,
                        billBymonth: this.billBymonth,
                        monthBill: Number(this.monthBill),
                        roomRates: this.roomRates,
                        elecNum: this.elecNum,
                        elecPrice: this.elecPrice,
                        waterNum: this.waterNum,
                        waterPrice: this.waterPrice,
                        totalPrice: this.totalPrice,
                        room: this.room
                    }
                    if (this.check == true && this.monthBill == this.billBymonth) {
                        http
                            .put("/bill/update/" + this.updateId, data)
                            .then(response => {
                                this.id = response.data.id;
                            })
                            .catch(e => {
                                console.log(e);
                            });
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Update bill successfully!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        this.$router.push({name: 'list-bill', params: {id: this.room.id}})
                    } else {
                        http
                            .post("/bill", data)
                            .then(response => {
                                this.id = response.data.id;
                            })
                            .catch(e => {
                                console.log(e);
                            });
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Add bill successfully!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        this.$router.push({name: 'list-bill', params: {id: this.room.id}});
                    }
                }
            },
            getMonthByMonthAndRoomId() {
                http
                    .get("/bill/month/" + this.monthBill + "/" + this.room.id)
                    .then(response => {
                        this.billBymonth = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getCheckByMonthAndRoomId() {
                http
                    .get("/bill/check/" + this.monthBill + "/" + this.room.id)
                    .then(response => {
                        this.check = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getIdByMonthAndRoomId() {
                http
                    .get("/bill/id/" + this.monthBill + "/" + this.room.id)
                    .then(response => {
                        this.updateId = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getPreElecByMonthAndRoomId() {
                http
                    .get("/bill/elec/" + (this.monthBill - 1) + "/" + this.room.id)
                    .then(response => {
                        this.preElecNum = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getPreWaterByMonthAndRoomId() {
                http
                    .get("/bill/water/" + (this.monthBill - 1) + "/" + this.room.id)
                    .then(response => {
                        this.preWaterNum = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            comboGet() {
                if (this.monthBill != '' && this.monthBill != 0) {
                    this.getCheckByMonthAndRoomId();
                    this.getIdByMonthAndRoomId();
                    this.getMonthByMonthAndRoomId();
                    this.getPreElecByMonthAndRoomId();
                    this.getPreWaterByMonthAndRoomId();
                }
            },
        }
    }
</script>

<style scoped>
    table {
        border: 2px solid #ddd;
        border-collapse: separate;
        border-left: 0;
        border-radius: 4px;
        border-spacing: 0px;

    }

    thead {
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
        border-collapse: separate;
    }

    tr {
        display: table-row;
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

    .form-control {
        width: 110px;
    }

</style>