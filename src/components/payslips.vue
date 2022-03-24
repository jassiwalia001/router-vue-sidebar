<template>
  <div>
    <h4 class="font-weight-bold mb-4">My Payslips</h4>
    <div class="navbar">
      <div class="left">
        <span
          class="button"
          :class="{ selected: selectedCurr === 'EUR' }"
          @click="changeCurr('EUR')"
          >EUR ({{ getRecordsCount("EUR") }})</span
        >
        <span
          class="button"
          :class="{ selected: selectedCurr === 'USD' }"
          @click="changeCurr('USD')"
          >USD ({{ getRecordsCount("USD") }})</span
        >
      </div>
      <div class="right">
        <img class="decr-year" src="../assets/left-chevron.svg" @click="changeCurr(selectedCurr, '-1')"/>
        <span class="year-val">{{ selectedYear }}</span>
        <img class="incr-year" src="../assets/left-chevron.svg" @click="changeCurr(selectedCurr, '1')"/>
      </div>
    </div>
    <b-table
      v-if="tableIsReady"
      :items="payslipsDisp"
      :fields="fields"
      :per-page="recordsPerPage"
      no-local-sorting
      @sort-changed="sorting"
      responsive
      flex
      hover
      @row-clicked="expandAdditionalInfo"
    >
      <template slot="row-details">
        <b-card>
          <template>
            <pdf v-if="payslipDetails" :src="payslipDetails + '.pdf'"></pdf>
          </template>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import { BTable } from "bootstrap-vue";
import payslips from "../payslips.json";
import moment from "moment";
import pdf from "vue-pdf";

export default {
  name: "Payslip",
  components: {
    "b-table": BTable,
    pdf,
  },
  data: () => ({
    tableIsReady: true,
    recordsPerPage: 10,
    payslips: [],
    payslipsDisp: [],
    rawPayslips: payslips,
    payslipDetails: "",
    fields: ["month", "payslips", "grossSalary", "netPay"],
    selectedYear: 2019,
    selectedCurr: "EUR",
  }),
  methods: {
    expandAdditionalInfo(row) {
      this.$set(row, "_showDetails", !row._showDetails);
      this.payslipDetails = row.accessToken;
    },
    formatDate(date) {
      return moment(date).format("MMMM YYYY");
    },
    changeCurr(curr, yearChange) {
      if(yearChange) {
        this.selectedYear = moment(this.selectedYear, "YYYY").add(yearChange, "year").format("YYYY");
      }
      this.selectedCurr = curr;
      this.payslipsDisp = this.payslips.filter((pay) => {
        return pay.currency === curr && pay.month.includes(this.selectedYear);
      });
    },
    sorting() {},
    getPayslips() {
      this.rawPayslips.forEach((payslip) => {
        const gross = payslip.payslipEntries.find(
          (entry) => entry.key === "GROSS"
        );
        const netPay = payslip.payslipEntries.find(
          (entry) => entry.key === "NET PAY"
        );
        this.payslips.push({
          month: this.formatDate(payslip.payrollDate),
          payslips: payslip.fileAttachment.file.label,
          grossSalary: gross.amount + " " + gross.currency,
          netPay: netPay.amount + " " + netPay.currency,
          accessToken: payslip.fileAttachment.accessToken,
          currency: gross.currency
        });
      });
    },
    getRecordsCount(curr) {
      return this.payslips.filter((pay) => {
        return pay.currency === curr && pay.month.includes(this.selectedYear);
      }).length;
    },
  },
  mounted() {
    this.getPayslips();
    this.changeCurr(this.selectedCurr);
  },
};
</script>
<style lang="scss">
.table {
  background-color: #FFFFFF;
  th {
    div {
      font-size: 12px;
      font-weight: 400;
    }
  }
  td {
    font-size: 14px;
  }
}
.navbar {
  background-color: #001738;
  height: 56px;
  color: #ffffff;
  padding: 0 1rem;
  font-size: 14px;
  border-radius: 4px;

  .button {
    font-size: 14px;
    padding: 18.5px 16px 19px;
    line-height: 2;
    &.selected {
      background-color: #ff5f1f;
    }
  }

  .right {
    background-color: white;
    color: black;
    padding: 4px;
    border-radius: 20px;

    .decr-year,
    .incr-year {
      padding: 10px;
      width: 39px;
      height: 30px;
      background: #ff5f1f 0% 0% no-repeat padding-box;
      border-radius: 0px 20px 20px 0px;
    }
    .decr-year {
      transform: rotate(180deg);
    }

    .year-val {
      width: 200px;
      display: inline-block;
      padding: 1px 13px;
    }
  }
}
</style>