<template>
  <BlogHeader />

  <div id="signup">
    <h3>注册账号</h3>
    <el-form ref="form" :model="form" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="7" :offset="8">
          <el-form-item label="用户名">
            <el-input v-model="signupName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="7" :offset="8">
          <el-form-item label="密码">
            <el-input v-model="signupPwd" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" :offset="7">
          <el-form-item>
            <el-button type="primary" v-on:click.prevent="signup"
              >提交</el-button
            >
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button v-on:click.prevent="tosignin">登录</el-button>
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
      signupName: "",
      signupPwd: "",
      signupResponse: null,
    };
  },
  methods: {
    signup() {
      const that = this;
      axios
        .post("/api/user/", {
          username: this.signupName,
          password: this.signupPwd,
        })
        .then(function (response) {
          that.signupResponse = response.data;
          console.log(that.signupResponse);
          that.$message({
            type: "success",
            message: "用户注册成功，快去登录吧！",
          });
        })
        .catch(function (error) {
          console.log(error);
          that.$message({
            type: "error",
            message: "用户注册失败",
          });
        });
    },
    tosignin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
#signup {
  text-align: center;
}

/* .form-elem {
  padding: 10px;
}

input {
  height: 25px;
  padding-left: 10px;
}

button {
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
