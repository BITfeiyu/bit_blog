<template>
  <div id="main" style="width: 100%">
    <div id="header">
      <div class="grid" style="width: 5%">
        <!--返回主页按钮-->
        <el-button type="primary" size="medium" class="homebtn" @click="tohome">
          Home
        </el-button>
      </div>
      <div class="grid1" style="width: 50%">
        <h1>BIT BLOG</h1>
        <!--引入搜索框组件-->
      </div>
      <div class="grid2" style="width: 25%">
        <SearchButton />

      </div>
      <div class="login" style="width: 10%">
        <div v-if="hasLogin">
          <div class="dropdown">
            <el-button class="dropbtn">您好, {{ username }}!</el-button>
            <div class="dropdown-content">
              <router-link
                :to="{ name: 'UserCenter', params: { username: username } }"
                >用户中心</router-link
              >
              <router-link :to="{ name: 'ArticleCreate' }" v-if="isSuperuser"
                >发表文章</router-link
              >
              <router-link to="/" v-on:click.prevent="logout()"
                >登出</router-link
              >
            </div>
          </div>
        </div>
        <div v-else>
          <router-link to="/login" class="login-link">登录</router-link>
          或
          <router-link to="/register" class="register-link">注册</router-link>
        </div>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import SearchButton from "@/components/SearchButton.vue";
import authorization from "@/utils/authorization";

export default {
  name: "BlogHeader",
  components: { SearchButton },
  data: function () {
    return {
      username: "",
      hasLogin: false,
      isSuperuser: JSON.parse(localStorage.getItem("isSuperuser.myblog")),
    };
  },
  mounted() {
    authorization().then((data) => ([this.hasLogin, this.username] = data));
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.reload(false);
    },
    refresh() {
      this.username = localStorage.getItem("username.myblog");
    },
    tohome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/*主页按钮样式*/
/* .homebtn {
  background-color: #845538;
  padding: 8px 8px 30px 8px;
  border: none;
  cursor: pointer;
  width: 60px;
  height: 16px;
  border-radius: 5px;
} */

/* .homebtn:hover {
  background-color: darkslateblue;
} */

.homebtn a {
  color: white;
  font-size: 16px;
  text-decoration: none;
  vertical-align: middle;
}

/* 下拉按钮样式 */
.dropbtn {
  background-color: #845538;
  color: white;
  padding: 8px 8px 8px 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  height: 16px;
  border-radius: 5px;
}

/* 容器 <div> - 需要定位下拉内容 */
.dropdown {
  position: relative;
  display: inline-block;
}

/* 下拉内容 (默认隐藏) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 120px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* 下拉菜单的链接 */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* 鼠标移上去后修改下拉菜单链接颜色 */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* 在鼠标移上去后显示下拉菜单 */
.dropdown:hover .dropdown-content {
  display: block;
}

/* 当下拉内容显示后修改下拉按钮的背景颜色 */
.dropdown:hover .dropbtn {
  background-color: darkslateblue;
}

.login-link {
  color: black;
}

.register-link {
  color: black;
}

.login {
  text-align: right;
  padding-right: 5px;
  display: inline-block;
}

#header {
  text-align: center;
  margin-top: 10px;
}

h1 {
  margin-top: 3px;
  margin-bottom: 3px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  vertical-align: middle;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  display: inline-block;
  vertical-align: middle;
}
.grid1 {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  display: inline-block;
  vertical-align: middle;
}
.grid2 {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  display: inline-block;
  vertical-align: middle;
}
.main {
  display: inline-block;
  vertical-align: middle;
}
</style>
