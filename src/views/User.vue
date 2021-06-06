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
        <router-link to="/userspace">
          <el-menu-item index="0" @click="openMune">
            <i class="el-icon-user-solid"></i>
            <span slot="title">{{ name }}的个人空间</span>
          </el-menu-item>
        </router-link>
        <router-link to="/projectList" v-if="menus[0].open == '1'">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">项目实战</span>
          </el-menu-item>
        </router-link>
        <router-link to="/userCourseList" v-if="menus[1].open == '1'">
          <el-menu-item index="2">
            <i class="el-icon-reading"></i>
            <span slot="title">课程学习</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="2" v-if="menus[2].open == '1'">
          <template slot="title">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">用户内容管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/interviewExperienceList">
              <el-menu-item index="10-1">
                <span slot="title">招聘信息管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/recruitList">
              <el-menu-item index="10-2">
                <span slot="title">个人面经管理</span>
              </el-menu-item>
            </router-link>

            <router-link to="/schoolList">
              <el-menu-item index="10-3">
                <span slot="title">升学信息管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/blogList">
              <el-menu-item index="10-4">
                <span slot="title">个人博客管理</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <router-link to="/searchInterviewExperience" v-if="menus[3].open == '1'">
          <el-menu-item index="5">
            <i class="el-icon-guide"></i>
            <span slot="title">招聘广场</span>
          </el-menu-item>
        </router-link>

        <router-link to="/searchRecruit" v-if="menus[4].open == '1'">
          <el-menu-item index="6">
            <i class="el-icon-discount"></i>
            <span slot="title">面经分享</span>
          </el-menu-item>
        </router-link>
        <router-link to="/searchBlog" v-if="menus[5].open == '1'">
          <el-menu-item index="8">
            <i class="el-icon-postcard"></i>
            <span slot="title">博客园地</span>
          </el-menu-item>
        </router-link>
        <router-link to="/searchSchool" v-if="menus[6].open == '1'">
          <el-menu-item index="9">
            <i class="el-icon-position"></i>
            <span slot="title">升学面板</span>
          </el-menu-item>
        </router-link>
        <router-link to="/boards" v-if="menus[7].open == '1'">
          <el-menu-item index="4">
            <i class="el-icon-data-line"></i>
            <span slot="title">就业看板</span>
          </el-menu-item>
        </router-link>

        <el-submenu index="1" v-if="menus[8].open == '1'">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">在线刷题</span>
          </template>
          <el-menu-item-group>
            <router-link to="/questionList">
              <el-menu-item index="7-1">
                <span slot="title">题库刷题</span>
              </el-menu-item>
            </router-link>
            <router-link to="/exams">
              <el-menu-item index="7-2">
                <span slot="title">能力评估</span>
              </el-menu-item>
            </router-link>

            <router-link to="/interviews">
              <el-menu-item index="7-3">
                <span slot="title">模拟面试</span>
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="99">
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
      isCollapse: true,
      menus: []
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
  created: async function() {
    this.name = window.sessionStorage.getItem("name");
    let res = await this.$http.get("/get_menus");
    if (res != null) {
      res.data.menus.forEach(element => {
        console.log(element.open);
        if (element.open == 1) {
          element.open = "1";
        } else {
          element.open = "2";
        }
      });
      console.log(res);
      this.menus = res.data.menus;
      console.log(this.menus);
    }
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
  border-radius: 3px;
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
