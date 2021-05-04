<template>
  <div class="default-colors">
    <p>默认色系：</p>
    <div class="colors">
      <span
        class="color"
        v-for="(color, index) in defaultColors"
        :style="{ backgroundColor: color }"
        :key="'color' + index"
        @click="copy($event, color)"
      >
        {{ color }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DefaultColors",
  data: () => {
    return {
      defaultColors: [
        "#0885ff",
        "#ff665e",
        "#f69421",
        "#1dcf2f",
        "#00bd98",
        "#00bcd4",
      ],
    };
  },
  methods: {
    copy($event, color) {
      try {
        let el = $event.currentTarget;
        let input = document.createElement("input");
        input.value = el.innerText;
        input.style.transform = "translateX(10000000000000px)";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);

        alert("复制成功");
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.default-colors {
  & > p {
    font-weight: bold;
  }
  & > .colors {
    display: flex;
    flex-flow: row wrap;
    > .color {
      display: inline-block;
      width: 100px;
      height: 40px;
      margin-right: 8px;
      margin-bottom: 8px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
    }
  }
}
</style>
