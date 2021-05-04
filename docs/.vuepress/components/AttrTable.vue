<template>
  <table class="attr-table">
    <thead>
      <tr>
        <th
          v-for="(d, i) in tableHead"
          :key="'thead-th' + i"
          :style="{ width: getWith(d) }"
        >
          {{ d.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in tableData" :key="'tbody-tr' + index">
        <td
          v-for="(d, i) in tableHead"
          :key="'tbody-td' + i"
          :style="{ width: getWith(d) }"
        >
          {{ row[d.prop] || "-" }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    tableHead: {
      type: Array,
      default: () => [
        {
          label: "参数",
          prop: "param",
          width: 150,
        },
        {
          label: "说明",
          prop: "desc",
          width: 300,
        },
        {
          label: "类型",
          prop: "type",
          width: 200,
        },
        {
          label: "可选值",
          prop: "values",
          width: 150,
        },
        {
          label: "默认值",
          prop: "default",
          width: 150,
        },
      ],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    getWith({ width }) {
      if (width) {
        return width + "px";
      } else {
        return null;
      }
    },
  },
};
</script>
<style>
.attr-table {
  width: 100%;
}
.attr-table thead,
.attr-table tbody {
  border: none;
  display: block;
  width: 100%;
}
.attr-table thead > tr,
.attr-table tbody > tr {
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #dcdfe6;
}
.attr-table thead > tr > th,
.attr-table tbody > tr > td {
  border: none;
  flex-grow: 1;
  color: #909399;
  font-weight: normal;
  text-align: left;
  font-size: 14px;
}
.attr-table tbody > tr > td {
  color: #606266;
}
</style>
