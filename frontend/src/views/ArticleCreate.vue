<template>
  <BlogHeader />
  <div id="article-create">
    <h3>发表文章</h3>

    <el-form ref="form" :model="form" :label-position="right">
      <el-row :gutter="20" justify="center">
        <el-col :span="16">
          <el-form-item label="题图">
            <input type="file" v-on:change="onFileChange" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="16">
          <el-form-item label="标题">
            <el-input v-model="title" type="text"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="16">
          <el-form-item label="分类">
            <span v-for="category in categories" :key="category.id">
              <!--样式也可以通过 :style 绑定-->
              <el-button
                class="category-btn"
                :style="categoryStyle(category)"
                @click.prevent="chooseCategory(category)"
              >
                {{ category.title }}
              </el-button>
            </span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="16">
          <el-form-item label="标签">
            <el-input
              v-model="tags"
              type="text"
              placeholder="输入标签并用逗号分隔"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="16">
          <el-form-item label="正文">
            <el-input
              type="textarea"
              v-model="body"
              placeholder="输入博客正文..."
              :rows="10"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="16">
          <el-form-item label="插图">
            <input type="file" v-on:change="uploadImage" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="16">
          <el-form-item label="链接">
            <label id="upload_label">Show Markdown url here.</label>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="16">
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import BlogHeader from "@/components/BlogHeader.vue";
import axios from "axios";
import authorization from "@/utils/authorization";

export default {
  name: "ArticleCreate",
  components: { BlogHeader },
  data: function () {
    return {
      title: "",
      body: "",
      // 所有分类
      categories: [],
      // 选定的分类
      selectedCategory: null,
      // 标签
      tags: "",
      // 标题图
      avatarID: null,
    };
  },
  mounted() {
    // 页面初始化时获取所有分类
    axios
      .get("/api/category/")
      .then((response) => (this.categories = response.data));
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      // this.imageUrl = URL.createObjectURL(file);

      let formData = new FormData();
      formData.append("content", file);

      // 省去鉴权和错误处理的部分
      axios
        .post("/api/avatar/", formData, {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("access.myblog"),
          },
        })
        .then((response) => (this.avatarID = response.data.id));
    },
    // 根据分类是否被选中，按钮的颜色发生变化
    categoryStyle(category) {
      if (
        this.selectedCategory !== null &&
        category.id === this.selectedCategory.id
      ) {
        return {
          backgroundColor: "blue",
          color: "white",
        };
      }
      return {
        backgroundColor: "cornflowerblue",
        color: "black",
      };
    },
    // 选取分类
    chooseCategory(category) {
      // 如果点击已选取的分类，则将 selectedCategory 置空
      if (
        this.selectedCategory !== null &&
        this.selectedCategory.id === category.id
      ) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
      }
    },
    //上传本地图片并获取markdown信息
    uploadImage(e) {
      const file = e.target.files[0];
      // this.imageUrl = URL.createObjectURL(file);

      let formData = new FormData();
      formData.append("content", file);

      // 省去鉴权和错误处理的部分
      axios
        .post("/api/markdown", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("access.myblog"),
          },
        })
        .then(function (response) {
          let markdown = response.data.markdown;
          document.getElementById("upload_label").innerHTML = markdown;
        });
    },
    // 点击提交按钮
    submit() {
      const that = this;
      authorization().then(function (response) {
        if (response[0]) {
          let data = {
            title: that.title,
            body: that.body,
          };

          // 添加标题图
          data.avatar_id = that.avatarID;

          // 添加分类
          if (that.selectedCategory) {
            data.category_id = that.selectedCategory.id;
          }
          // 预处理并添加标签
          // 逗号分隔标签并剔除无效标签
          data.tags = that.tags
            .split(/[,，]/)
            .map((x) => x.trim())
            .filter((x) => x.charAt(0) !== "");

          // 发送发表文章请求
          // 成功后前往详情页面
          const token = localStorage.getItem("access.myblog");
          axios
            .post("/api/article/", data, {
              headers: { Authorization: "Bearer " + token },
            })
            .then(function (response) {
              that.$router.push({
                name: "ArticleDetail",
                params: { id: response.data.id },
              });
            });
        } else {
          //弹出提示
          that.$message({
            type: "error",
            message: "令牌过期，请重新登录。",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.category-btn {
  margin-right: 10px;
}

#article-create {
  text-align: center;
  font-size: large;
}

form {
  text-align: left;
}

input {
  padding-left: 10px;
}
</style>
