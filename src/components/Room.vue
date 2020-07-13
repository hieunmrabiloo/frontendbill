<template>
    <form v-if="this.room">
        <h4>Room {{this.room.name}}</h4>
        <div>
            <div v-if="errors.length">
                <div :key="error" class="alert alert-danger" role="alert" v-for="error in errors">
                    {{ error }}
                </div>
            </div>
            <div class="alert alert-primary" role="alert">
                Previous Electric Number: {{preElecNum}} | Previous Water Number: {{preWaterNum}}
            </div>
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
                    <td><input @change="comboGet" class="form-control" id="monthBill" type="text"
                               v-model="monthBill"></td>
                    <td><input class="form-control" id="rates" type="text" v-model="roomRates">
                    </td>
                    <td><input @change="checkForm" class="form-control" id="elecNum" type="text"
                               v-model="elecNum">
                        -
                        <input class="form-control" id="preElecNum" readonly type="text" v-model="preElecNum">
                        x
                        <select class="form-control custom-select" id="elecPrice" name="elecPrice" v-model="elecPrice">
                            <option value="2">2k/num</option>
                            <option value="3">3k/num</option>
                            <option value="4">4k/num</option>
                            <option value="5">5k/num</option>
                            <option value="6">6k/num</option>
                        </select>
                    </td>
                    <td><input @change="checkForm" class="form-control" id="waterNum" type="text" v-model="waterNum">
                        -
                        <input class="form-control" id="preWaterNum" readonly type="text" v-model="preWaterNum">
                        x
                        <select class="form-control custom-select" id="waterPrice" name="waterPrice" v-model="waterPrice">
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
            <button class="btn btn-success" v-on:click="saveBill">Save</button>
        </div>
    </form>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "Room",
        data: function () {
            return {
                errors: [],
                preElecNum: 0,
                preWaterNum: 0,
                updateId: 0,
                check: false,
                billBymonth: 0,
                id: 0,
                monthBill: 0,
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
        props: ["room"],
        methods: {
            checkForm() {
                this.errors = [];
                if (this.elecNum <= this.preElecNum) {
                    this.errors.push('Current electric number must be greater than Previous electric number!')
                }
                if (this.waterNum <= this.preWaterNum) {
                    this.errors.push('Current water number must be greater than Previous water number!')
                }
            },
            /* eslint-disable no-console */
            saveBill() {
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
                            this.roomRates = response.data.roomRates;
                            this.elecNum = response.data.elecNum;
                            this.elecPrice = response.data.elecPrice;
                            this.waterNum = response.data.waterNum;
                            this.waterPrice = response.data.waterPrice;
                            console.log(response.data);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    http
                        .post("/bill", data)
                        .then(response => {
                            this.id = response.data.id;
                            console.log(response.data);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },
            getMonthByMonthAndRoomId() {
                http
                    .get("/bill/month/" + this.monthBill + "/" + this.room.id)
                    .then(response => {
                        this.billBymonth = response.data;
                        console.log(response.data);
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
                        console.log(response.data);
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
                        console.log(response.data);
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
                        console.log(response.data);
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
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            comboGet() {
                this.getCheckByMonthAndRoomId();
                this.getIdByMonthAndRoomId();
                this.getMonthByMonthAndRoomId();
                this.getPreElecByMonthAndRoomId();
                this.getPreWaterByMonthAndRoomId();
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

    form {
        float: left;
    }

    .alert-primary {
        text-align: center;
        width: 500px;
        margin-left: 95px;
    }
    .alert-danger{
        margin-right: 2px;
    }

    .btn-success {
        float: right;
        margin-top: 5px;
    }
</style>