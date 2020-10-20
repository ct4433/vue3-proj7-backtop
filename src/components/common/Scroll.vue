<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>


<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },

  methods: {
    refresh() {
      this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    scrollTo() {
      this.scroll.scrollTo(0,0,1000);
    },
  },

  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
};
</script>

<style>
</style>