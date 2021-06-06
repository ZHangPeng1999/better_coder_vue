<template>
  <div class="block">
    <el-container>
      <el-header style="border:0; padding:0">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#409EFF"
          text-color="#303133"
          active-text-color="#303133"
          style="border:0; padding:0"
        >
          <el-row>
            <el-col :span="20">
              <el-menu-item index="1" style="text-align:center;">
                <i class="el-icon-collection" style="color:#303133"></i>BtterCoder IT从业者成长平台
              </el-menu-item>
            </el-col>
            <el-col :span="2">
              <el-menu-item
                index="2"
                style="text-align:center"
                @click="dialogSignInVisible = true"
              >Sign In</el-menu-item>
            </el-col>
            <el-col :span="2">
              <el-menu-item index="3" style="text-align:center" @click="dialogSignUpVisible = true">
                <span style="padding:3px;">Sign Up</span>
              </el-menu-item>
            </el-col>
          </el-row>
        </el-menu>
      </el-header>
      <el-main style="height:1000px;padding:0">
        <el-row>
          <el-col :span="16" :offset="4">
            <!-- 轮播图 -->
            <el-carousel height="500px">
              <el-carousel-item v-for="item in 3" :key="item">
                <img :src="require(`@/assets/logo${item}.png`)" alt style="height:100%;width:100%" />
              </el-carousel-item>
            </el-carousel>
            <el-card shadow="hover">
              <div slot="header" class="clearfix">课程推荐</div>
              <el-card v-for="item in courses" :key="item.id">
                <el-row>
                  <el-col :span="8">
                    <img :src="require(`@/assets/${item.id}.png`)" style="height:300px;width:300px" />
                  </el-col>
                  <el-col :span="16">
                    <div>{{item.title}}</div>
                    <el-divider></el-divider>
                    <div>{{item.content}}</div>
                  </el-col>
                </el-row>
              </el-card>
            </el-card>
            <el-card shadow="hover">
              <div slot="header" class="clearfix">实用题库</div>
              <el-card v-for="item in questions" :key="item.id">
                <div>{{item.title}}</div>
                <el-divider></el-divider>
                <div>{{item.content}}</div>
              </el-card>
            </el-card>
            <el-card shadow="hover">
              <div slot="header" class="clearfix">就业分析</div>
              <el-card>
                <el-row style="width:100%">
                  <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }">
                      <img style="max-width:200px;" :src="getImagePath(b.cityUri)" class="image" />
                      <div style="padding: 14px; text-align:center">
                        <el-button type="text" @click="getDialog(b.cityUri)">城市维度分析</el-button>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }">
                      <img style="max-width:200px;" :src="getImagePath(b.companyUri)" class="image" />
                      <div style="padding: 14px; text-align:center">
                        <el-button type="text" @click="getDialog(b.companyUri)">公司维度分析</el-button>
                      </div>
                    </el-card>
                  </el-col>

                  <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }">
                      <img
                        style="max-width:200px;"
                        :src="getImagePath(b.educationUri)"
                        class="image"
                      />
                      <div style="padding: 14px; text-align:center">
                        <el-button type="text" @click="getDialog(b.educationUri)">学历维度分析</el-button>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }">
                      <img style="max-width:200px;" :src="getImagePath(b.salaryUri)" class="image" />
                      <div style="padding: 14px; text-align:center">
                        <el-button type="text" @click="getDialog(b.salaryUri)">薪资维度分析</el-button>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <!-- 登录dialog -->
    <el-dialog title="登录" :visible.sync="dialogSignInVisible" center>
      <el-form :model="form" :rules="rules" ref="signInFormRef">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="dialogSignInVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 注册dialog -->
    <el-dialog title="注册" :visible.sync="dialogSignUpVisible" center>
      <el-form :model="form" :rules="rules" ref="signUpFormRef">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="signUp">注册</el-button>
        <el-button @click="dialogSignUpVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="1400px">
      <img style="max-width:1300px;" :src="uri" class="image" />
    </el-dialog>
  </div>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}

.front {
  z-index: 1;
  position: absolute;
}
</style>
<script>
import { LOGIN } from "@/store/type.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialogSignInVisible: false,
      dialogSignUpVisible: false,
      dialogVisible: false,
      form: {
        username: "",
        password: "",
        name: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      imgSrc: require("../assets/bg.jpeg"),
      courses: [
        {
          id: 1,
          title: "C++教程",
          content:
            "本专刊为C++工程师岗求职经验分享，官方特邀2021届秋招中收割数家大厂offer的同学分享，从校招规划到求职，所有经验倾囊分享，旨在-帮助所有求职C++工程师岗的同学顺利拿到心仪offer！特别说明：①本专刊购买后即可解锁所有已更新章节，故不可以退换哦~同学们有任何建议都都可以在相应文章下评论或者读者交流群中反馈，我们会根据大家的建议进行修改更新的。",
          image: "@/assets/c++.png"
        },
        {
          id: 2,
          title: "C教程",
          content:
            "本专刊为C工程师岗求职经验分享，官方特邀2021届秋招中收割数家大厂offer的同学分享，从校招规划到求职，所有经验倾囊分享，旨在-帮助所有求职C工程师岗的同学顺利拿到心仪offer！特别说明：本专刊购买后即可解锁所有已更新章节，故不可以退换哦~同学们有任何建议都都可以在相应文章下评论或者读者交流群中反馈，我们会根据大家的建议进行修改更新的。",
          image: "@/assets/c++.png"
        },
        {
          id: 3,
          title: "Java教程",
          content:
            "本专刊为Java工程师岗求职经验分享，官方特邀2021届秋招中收割数家大厂offer的同学分享，从校招规划到求职，所有经验倾囊分享，旨在帮助所有求职Java工程师岗的同学顺利拿到心仪offer！特别说明：①本专刊购买后即可解锁所有已更新章节，故不可以退换哦~②同学们有任何建议都都可以在相应文章下评论或者读者交流群中反馈，我们会根据大家的建议进行修改更新的。",
          image: "@/assets/java.jpg"
        }
      ],
      questions: [
        { id: 1, title: "Mysql", content: "Mysql是关系型数据库吗？" },
        { id: 2, title: "python", content: "python可不可以用a = 1; a ++ ;" },
        { id: 3, title: "Java", content: "Java是什么语言？" }
      ],
      exams: [
        { id: 1, questions: [], grade: "", user: "" },
        { id: 2, questions: [], content: "", grade: "", user: "" },
        { id: 3, questions: [], content: "", grade: "", user: "" }
      ],
      boards: [
        { id: 1, title: "C++教程", content: "", image: "" },
        { id: 2, title: "C教程", content: "", image: "" },
        { id: 3, title: "Java教程", content: "", image: "" }
      ],
      b: {}
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    login() {
      this.$refs.signInFormRef.validate(valid => {
        if (!valid) return;
        this.$store.dispatch(LOGIN, {
          username: this.form.username,
          password: this.form.password
        });
      });
      setTimeout(() => {
        if (this.isLogin == true) {
          this.$message.success("登陆成功");
          if (window.sessionStorage.getItem("role") == "534bcf636cf6cb0cf6") {
            this.$router.push("/user");
          } else {
            this.$router.push("/admin");
          }
        }
      }, 500);
      this.dialogSignInVisible = false;
    },
    async signUp() {
      this.$refs.signUpFormRef.validate(valid => {
        if (!valid) return;
      });
      let res = await this.$http.post("/sign_up", this.form);
      if (res != null) {
        this.$message.success("注册成功！请登录");
        this.dialogSignUpVisible = false;
        this.dialogSignInVisible = true;
      }
    },
    getImagePath(b) {
      return require("@/assets/image/" + b);
    },
    getDialog(url) {
      this.uri = this.getImagePath(url);
      this.dialogVisible = true;
    }
  },
  async created() {
    let res = await this.$http.get("/boards");
    if (res != null) {
      console.log(res);
      this.boards = res.data.boards;
      this.b = this.boards[0];
    }
  }
};
</script>
