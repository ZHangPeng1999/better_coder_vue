<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">{{course.title}}</el-col>
          <!-- <el-col :span="3">
            <el-button @click="dialogAddVisible = true" type="text" style="color:#303133">添加章节</el-button>
          </el-col>-->

          <el-col :span="3">
            <el-button
              @click="dialogAddVisible = true;addForm.id=cid;addForm.title=course.title;"
              type="text"
              style="color:#303133"
              v-if="isSelect == false"
            >选课</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <div>
            <div>
              简介:
              <el-tag size="mini">{{course.bizType}}</el-tag>
            </div>
            {{course.content}}
          </div>
        </el-card>
        <el-card shadow="hover" v-if="course.projectUri != '无'">
          <div>
            <span>项目代码:</span>
            {{course.projectUri}}
          </div>
        </el-card>
        <el-card shadow="hover" v-if="course.sourceUri != '无'">
          <div>
            <span>项目资源:</span>
            {{course.sourceUri}}
          </div>
        </el-card>
        <el-card shadow="hover" v-if="isSelect == true">
          <el-row>
            <el-col :span="3">学习进度:</el-col>
            <el-col :span="18">
              <el-progress :percentage="chooseCourse.completeness"></el-progress>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover">
          <div>章节</div>
          <el-table :data="chapters" stripe style="width: 100%" @row-click="handlerUpdateChapter">
            <el-row>
              <el-col :span="5">
                <el-table-column prop="title" label="题目"></el-table-column>
              </el-col>
              <el-col :span="19">
                <el-table-column prop="orderId" label="编号" width="180"></el-table-column>
              </el-col>
            </el-row>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
    <!-- 选课dialog -->
    <el-dialog title="确认选课" :visible.sync="dialogAddVisible" center>
      <el-form :model="addForm">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="addForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程名" :label-width="formLabelWidth">
          <el-input v-model="addForm.title" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addChapter">确认选课</el-button>
        <el-button @click="dialogAddVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scope>
.el-card {
  margin: 20px;
}
</style>
<script>
export default {
  props: ["cid"],
  data() {
    return {
      course: {},
      chapters: [],
      chooseCourse: {},
      addForm: {
        id: "",
        title: ""
      },
      isSelect: false,
      dialogAddVisible: false,
      dialogUpdateCourseVisible: false,
      dialogUpdateChapterVisible: false
    };
  },
  methods: {
    async addChapter() {
      this.addForm.cid = this.cid;
      let res = await this.$http.post("/select_course", this.addForm);
      if (res != null) {
        this.$message.success("选课成功");
        this.dialogAddVisible = false;
      }
    },
    async updateCourse() {
      if (this.updateCourseForm.type == "课程") {
        this.updateCourseForm.type = "1";
      } else {
        this.updateCourseForm.type = "2";
      }
      let res = await this.$http.post("/update_course", this.updateCourseForm);
      if (res != null) {
        this.$message.success("更新成功！");
        this.dialogUpdateCourseVisible = true;
      }
    },
    async updateChapter() {
      console.log(this.updateChapterForm);
      let res = await this.$http.post(
        "/update_chapter",
        this.updateChapterForm
      );
      if (res != null) {
        this.$message.success("更新成功！");
        this.dialogUpdateChapterVisible = false;
      }
    },
    handlerUpdateChapter(row, event, column) {
      this.$router.push("/chapter/" + row.id);
    }
  },
  async created() {
    let res = await this.$http.get("/course/" + this.cid);
    if (res != null) {
      console.log(res);
      this.course = res.data.course;
      this.chapters = res.data.chapters;
      this.chooseCourse = res.data.chooseCourse;
      this.isSelect = res.data.is_select;
      console.log(this.course);
    }
  }
};
</script>
