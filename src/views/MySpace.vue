<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <span style="width:100%;text-align:center">{{name}}的个人空间</span>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <!-- <el-card shadow="hover">
          <audio src="..\assets\voice\output09794015313548289.mp3" controls="controls"></audio>
        </el-card>-->
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <el-form :model="updateForm" :rules="rules" ref="updateFormRef">
            <el-form-item label="用户名">
              <el-input v-model="updateForm.num" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="updateForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="updateForm.name"></el-input>
            </el-form-item>
            <el-button type="primary" @click="updateUser">更新</el-button>
          </el-form>
        </el-card>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="20">
                <span>做题记录</span>
              </el-col>
              <el-col :span="4">
                <el-button type="text" @click="toQuestions">详情</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="choose_question.length == 0">暂无做题记录</div>
          <el-card
            v-for="d in choose_question"
            :key="d.id"
            shadow="hover"
            style=" text-align: left;"
          >
            <div @click="toQuestion(d)">
              <div slot="header" class="clearfix">
                <span
                  style="padding: 3px 0; font-size:20px;  text-align: left;"
                  type="text"
                >标题：{{d.question.title}}</span>
              </div>
              <span>回答结果：{{d.result}}</span>
            </div>
          </el-card>
        </el-card>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="20">
                <span>我的课程</span>
              </el-col>
              <el-col :span="4">
                <el-button type="text" @click="toCourses">详情</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="choose_course.length == 0">暂未选课</div>

          <el-card v-for="d in choose_course" :key="d.id" shadow="hover" style=" text-align: left;">
            <div @click="toCourse(d)">
              <div slot="header" class="clearfix">
                <span
                  style="padding: 3px 0; font-size:20px;  text-align: left;"
                  type="text"
                >课程名：{{d.course.title}}</span>
              </div>
              <span>完成度：{{d.completeness}}</span>
            </div>
          </el-card>
        </el-card>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="20">
                <span>我的项目</span>
              </el-col>
              <el-col :span="4">
                <el-button type="text" @click="toProjects">详情</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="choose_project.length == 0">暂未选择项目</div>

          <el-card
            v-for="d in choose_project"
            :key="d.id"
            shadow="hover"
            style=" text-align: left;"
          >
            <div @click="toProject(d)">
              <div slot="header" class="clearfix">
                <span
                  style="padding: 3px 0; font-size:20px;  text-align: left;"
                  type="text"
                >项目名：{{d.course.title}}</span>
              </div>
              <span>完成度：{{d.completeness}}</span>
            </div>
          </el-card>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      updateForm: {
        name: "",
        password: "",
        num: ""
      },
      choose_question: [],
      choose_course: [],
      choose_project: []
    };
  },
  methods: {
    async getIndex() {
      let res = await this.$http.get("/index");
      if (res != null) {
        console.log(res);
        this.updateForm.name = res.data.user.name;
        this.updateForm.num = res.data.user.number;
        this.updateForm.password = res.data.password;
        if (res.data.question_history.length > 5) {
          this.choose_question = res.data.question_history.slice(0, 5);
        } else {
          this.choose_question = res.data.question_history.slice(0);
        }
        for (var i in res.data.courses) {
          var c = res.data.courses[i];
          console.log(c);
          if (c.course.type == 1 && this.choose_course.length < 5) {
            this.choose_course.push(c);
          } else if (this.choose_project.length < 5) {
            this.choose_project.push(c);
          }
        }
      }
    },
    async updateUser() {
      let res = await this.$http.post("/update_user", this.updateForm);
      if (res != null) {
        this.$message.success("修改成功！");
        window.sessionStorage.clear();
        this.$router.push("/welcome");
      }
    },
    toQuestions() {
      this.$router.push("/questionList");
    },
    toCourses() {
      this.$router.push("/userCourseList");
    },
    toProjects() {
      this.$router.push("/projectList");
    },
    toQuestion(d) {
      this.$router.push("/question/" + d.question.id);
    },
    toCourse(d) {
      this.$router.push("myCourse/" + d.course.id);
    },
    toProject(d) {
      this.$router.push("myCourse/" + d.course.id);
    }
  },
  created: function() {
    this.name = window.sessionStorage.getItem("name");
    this.getIndex();
  }
};
</script>
<style scope>
.el-card {
  margin: 10px;
}
</style>
