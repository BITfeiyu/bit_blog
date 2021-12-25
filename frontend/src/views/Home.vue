<template>
  <!-- <el-container>
    <el-header>
      <BlogHeader />
    </el-header>
    <el-main>
      <ArticleList />
    </el-main>
  </el-container> -->
  <div>
    <BlogHeader />
    <ArticleList />
  </div>
</template>

<script>
import BlogHeader from "@/components/BlogHeader.vue";
import ArticleList from "@/components/ArticleList.vue";

export default {
  name: "Home",
  components: { BlogHeader, ArticleList },
};
</script>
