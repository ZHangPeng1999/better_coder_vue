<template>
  <el-container>
    <el-container>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-menu-item index="0" @click="openMune">
          <i class="el-icon-user-solid"></i>
          <span slot="title">{{ name }}的个人空间</span>
        </el-menu-item>

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">模块管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/recruitModelList">
              <el-menu-item index="1-1">面经模板管理</el-menu-item>
            </router-link>
            <router-link to="/interviewExperienceModelList">
              <el-menu-item index="1-2">招聘信息模板管理</el-menu-item>
            </router-link>
            <router-link to="/menuList">
              <el-menu-item index="1-3">模块管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <router-link to="/courseList">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">项目/课程管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/addCourse">
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">添加课程/项目</span>
          </el-menu-item>
        </router-link>
        <router-link to="/questions">
          <el-menu-item index="5">
            <i class="el-icon-reading"></i>
            <span slot="title">题库管理</span>
          </el-menu-item>
        </router-link>

        <router-link to="/userList">
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </router-link>
        <el-menu-item index="7">
          <i class="el-icon-delete-solid" @click="logout"></i>
          <span type="info" plain @click="logout">退出账号</span>
        </el-menu-item>
      </el-menu>
      <el-main style="height:100%">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: "",
      isCollapse: true
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/welcome");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openMune() {
      this.isCollapse = !this.isCollapse;
    }
  },
  computed: {},
  created: function() {
    this.name = window.sessionStorage.getItem("name");
  }
};
</script>
<style scope>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: #409eff;
}
.logoutBtn {
  margin: 13px;
}
.el-aside {
  background-color: #0090f0;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container {
  height: 100%;
}
a {
  text-decoration: none;
}
</style>
