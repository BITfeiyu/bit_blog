<template>
  <div id="right" style="float: right">
    <div id="hot_title" style="margin-left:10px;">
      <h3>热门标签</h3>
    </div>
    <hr />
    <div id="bsum">
      <div>
        <span>
          <button
            v-for="tag in tagInfo"
            v-bind:key="tag.text"
            class="bt"
            v-on:click.prevent="selectByTag(tag.text)"
          >
            {{ tag.text }}
          </button>
        </span>
      </div>
    </div>

    <hr />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import getTagData from "@/composables/getTagData.js";

export default {
  name: "HotLabels",
  setup() {
    const tagInfo = ref("");
    const route = useRoute();
    getTagData(tagInfo, route);
    return {
      tagInfo,
    };
  },
  methods: {
    randomColor() {
      return (
        "#" +
        Math.random()
          .toString(16)
          .slice(-6)
      );
    },
    selectByTag(text) {
      if (text.charAt(0) !== "") {
        this.$router.push({ name: "Home", query: { tag: text } });
      }
    },
  },
};
</script>

<style scoped>
#right {
  display: inline-block;
  width: 27%;
  background: #f6f5ec;
  vertical-align: middle;
  border-radius: 10px;
}
#bsum {
  display: inline-block;
  border-radius: 10px;
}
.bt {
  background-color:darkblue;
  color: white;
  padding: 8px 8px 30px 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  height: 16px;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 10px;
}

.bt:hover {
  background-color: blue;
}
</style>
