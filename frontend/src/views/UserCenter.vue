<template>
  <BlogHeader ref="header" />

  <div id="user-center">
    <h3>更新资料信息</h3>

    <el-form ref="form" :model="form">
      <el-row :gutter="20" justify="center">
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="username" type="text" placeholder="输入用户名" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="6">
          <el-form-item label="新密码">
            <el-input
              v-model="password"
              type="password"
              placeholder="输入新密码"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="4">
          <el-form-item>
            <el-button type="success" @click="changeInfo">更新</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" justify="center">
        <el-col :span="4">
          <el-popover v-model:visible="visible" placement="top" :width="200">
            <p>确定删除当前用户吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button type="danger" size="mini" @click="confirmDelete"
                >确定</el-button
              >
              <el-button type="info" size="mini" @click="visible = false"
                >取消</el-button
              >
            </div>
            <template #reference>
              <el-button @click="visible = true" type="warning"
                >删除用户</el-button
              >
            </template>
          </el-popover>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import BlogHeader from "@/components/BlogHeader.vue";
import authorization from "@/utils/authorization";

const storage = localStorage;

export default {
  name: "UserCenter",
  components: { BlogHeader },
  data: function () {
    return {
      username: "",
      password: "",
      token: "",
      showingDeleteAlert: false,
    };
  },
  setup() {
    return {
      visible: ref(false),
    };
  },
  mounted() {
    this.username = storage.getItem("username.myblog");
  },
  methods: {
    confirmDelete() {
      const that = this;
      this.visible = false;
      authorization().then(function (response) {
        if (response[0]) {
          // 获取令牌
          that.token = storage.getItem("access.myblog");
          axios
            .delete("/api/user/" + that.username + "/", {
              headers: { Authorization: "Bearer " + that.token },
            })
            .then(function () {
              storage.clear();
              that.$router.push({ name: "Home" });
            });
        }
      });
    },
    changeInfo() {
      const that = this;

      // 验证登录状态
      authorization().then(function (response) {
        // 检查登录状态
        // 若登录已过期则不执行后续操作
        if (!response[0]) {
          that.$message({
            type: "warning",
            message: "登录已过期，请重新登录",
          });
          return;
        }

        // console.log("change info start");

        // 密码不能小于 6 位
        if (that.password.length > 0 && that.password.length < 5) {
          that.$message({
            type: "warning",
            message: "新密码长度不得小于5位",
          });
          return;
        }

        // 旧 username 用于向接口发送请求
        const oldName = storage.getItem("username.myblog");

        // 获取已填写的表单数据
        let data = {};
        if (that.username !== "") {
          data.username = that.username;
        }
        if (that.password !== "") {
          data.password = that.password;
        }

        // 获取令牌
        that.token = storage.getItem("access.myblog");

        // 发送更新数据到接口
        axios
          .patch("/api/user/" + oldName + "/", data, {
            headers: { Authorization: "Bearer " + that.token },
          })
          .then(function (response) {
            that.$message({
              type: "success",
              message: "修改成功",
            });
            const name = response.data.username;
            storage.setItem("username.myblog", name);
            that.$router.push({
              name: "UserCenter",
              params: { username: name },
            });

            that.$refs.header.refresh();
          });
      });
    },
  },
};
</script>

<style scoped>
.confirm-btn {
  width: 80px;
  background-color: darkorange;
}

.delete-btn {
  background-color: darkred;
  margin-bottom: 10px;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

<style scoped>
#user-center {
  text-align: center;
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
  border-radius: 5px;
  width: 150px;
}
</style>
