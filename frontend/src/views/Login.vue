<template>
  <BlogHeader />

  <div id="signin">
    <h3>用户登录</h3>
    <el-form ref="form" :model="form" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="7" :offset="8">
          <el-form-item label="用户名">
            <el-input v-model="signinName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7" :offset="8">
          <el-form-item label="密码">
            <el-input v-model="signinPwd" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" :offset="7">
          <el-form-item>
            <el-button type="primary" v-on:click.prevent="signin"
              >登录</el-button
            >
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button v-on:click.prevent="tosignup">注册</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import BlogHeader from "@/components/BlogHeader.vue";

export default {
  name: "Login",
  components: { BlogHeader },
  data: function () {
    return {
      signinName: "",
      signinPwd: "",
    };
  },
  methods: {
    signin() {
      const that = this;
      axios
        .post("/api/token/", {
          username: that.signinName,
          password: that.signinPwd,
        })
        .then(function (response) {
          const storage = localStorage;
          // Date.parse(...) 返回1970年1月1日UTC以来的毫秒数
          const expiredTime =
            Date.parse(response.headers.date) + 60 * 100 * 1000;
          // 设置 localStorage
          storage.setItem("access.myblog", response.data.access);
          storage.setItem("refresh.myblog", response.data.refresh);
          storage.setItem("expiredTime.myblog", expiredTime);
          storage.setItem("username.myblog", that.signinName);

          // 是否为管理员
          axios
            .get("/api/user/" + that.signinName + "/")
            .then(function (response) {
              storage.setItem("isSuperuser.myblog", response.data.is_superuser);
              //弹出提示
              that.$message({
                type: "success",
                message: "登录成功！欢迎你，" + response.data.username,
              });
              // 路由跳转
              that.$router.push({ name: "Home" });
            })
            .catch(function (error) {
              console.log(error);
              //弹出提示
              that.$message({
                type: "error",
                message: "登录失败，请检查你的用户名和密码",
              });
            });
        })
        .catch(function (error) {
          console.log(error);
          //弹出提示
          that.$message({
            type: "error",
            message: "登录失败，请检查你的用户名和密码",
          });
        });
    },
    tosignup() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
#signin {
  text-align: center;
}

/* .form-elem {
  padding: 10px;
}

input {
  height: 25px;
  padding-left: 10px;
} */

/* button {
  height: 35px;
  cursor: pointer;
  border: none;
  outline: none;
  background: gray;
  color: whitesmoke;
  border-radius: 5px;
  width: 60px;
} */
</style>
