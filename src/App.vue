<template>
  <div class="allDiv">
    <div style="height: 1px; margin-top: 10px"></div>
    <button @click="getGoodsList">更新数据</button>
    <div style="height: 1px; margin-top: 10px"></div>
    <scroll
      class="wrapper"
      ref="wrapper"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentscroll"
      @pullingUp="loadmore"
    >
      <ul>
        <li v-for="(item, index) in lists" v-bind:key="index">
          "{{ item }}+{{ index }}"
        </li>
      </ul>
    </scroll>
    <back-top class="home" @click="backUp" v-show="isShow"></back-top>
  </div>
</template>

<script>
import scroll from "./components/common/Scroll";
import axios from "axios";
import BackTop from "./components/content/BackTop";

export default {
  name: "App",
  components: {
    scroll,
    BackTop,
  },
  data() {
    return {
      lists: null,
      isShow: false,
    };
  },

  methods: {
    backUp() {
      this.$refs.wrapper.scrollTo();
    },

    async getGoodsList() {
      const { data: res } = await axios.get("http://localhost:9999/");
      this.lists = res.data;
      // Scroll内部用watch来侦测lists变化，一旦变化，延时20ms刷新dom，否则通过下面的钩子需要手动刷新
      this.$nextTick(function () {
        this.$refs.wrapper.refresh();
      });
    },

    async getGoodsList200() {
      const { data: res } = await axios.get("http://localhost:9999/aaa");
      this.lists = this.lists.concat(res.data);
      // Scroll内部用watch来侦测lists变化，一旦变化，延时20ms刷新dom，否则通过下面的钩子需要手动刷新
      this.$nextTick(function () {
        this.$refs.wrapper.refresh();
      });
    },

    contentscroll(position) {
      // console.log(position.y);
      this.isShow = position.y < -200;
    },

    loadmore() {
      console.log("loadmore");
      this.getGoodsList200();
      this.$refs.wrapper.finishPullUp();
    },
  },
  mounted() {
    this.getGoodsList();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  flex: 1;
  background: pink;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

.allDiv {
  position: relative;
  height: 70%;
  width: 100%;
}

.home {
  position: absolute;
  bottom: 0px;
  right: 50px;
}
</style>
