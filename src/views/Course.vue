<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="18">{{course.title}}</el-col>
          <el-col :span="3">
            <el-button @click="dialogAddVisible = true" type="text" style="color:#303133">添加章节</el-button>
          </el-col>

          <el-col :span="3">
            <el-button
              @click="dialogUpdateCourseVisible = true"
              type="text"
              style="color:#303133"
            >编辑课程/项目</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <div>
            <div>简介</div>
            {{course.content}}
          </div>
        </el-card>
        <el-card shadow="hover">
          <div>
            <span>标签:</span>
            {{course.bizType}}
          </div>
        </el-card>
        <el-card shadow="hover" v-if="course.projectUri != '无'">
          <div>
            <span>项目代码:</span>
            {{course.projectUri}}
          </div>
        </el-card>
        <el-card shadow="hover"  v-if="course.sourceUri != '无'">
          <div>
            <span>项目资源:</span>
            {{course.sourceUri}}
          </div>
        </el-card>
        <el-card shadow="hover">
          <div>章节</div>
          <el-table :data="chapters" stripe style="width: 100%">
            <el-table-column prop="id" label="id" width="180"></el-table-column>
            <el-table-column prop="title" label="题目" width="180"></el-table-column>
            <el-table-column prop="orderId" label="编号"></el-table-column>
            <el-table-column prop="videoId" label="B站视频号"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handlerUpdateChapter(scope.$index, scope.row)"
                  type="text"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
    <!-- 添加章节dialog -->
    <el-dialog title="添加章节" :visible.sync="dialogAddVisible" center>
      <el-form :model="addForm" :rules="rules" ref="updateFormRef">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="addForm.content"></el-input>
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="addForm.order_id"></el-input>
        </el-form-item>
        <el-form-item label="B站视频号" :label-width="formLabelWidth">
          <el-input v-model="addForm.video_id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addChapter">添加</el-button>
        <el-button @click="dialogAddVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑章节dialog -->
    <el-dialog title="编辑章节" :visible.sync="dialogUpdateChapterVisible" center>
      <el-form :model="updateChapterForm" :rules="rules" ref="updateFormRef">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="updateChapterForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="updateChapterForm.content"></el-input>
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="updateChapterForm.order_id"></el-input>
        </el-form-item>
        <el-form-item label="B站视频号" :label-width="formLabelWidth">
          <el-input v-model="updateChapterForm.video_id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateChapter">更新</el-button>
        <el-button @click="dialogUpdateChapterVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑课程dialog -->

    <el-dialog title="编辑课程/项目" :visible.sync="dialogUpdateCourseVisible" center>
      <el-form ref="form" :model="updateCourseForm">
        <el-form-item label="名称">
          <el-input v-model="updateCourseForm.title"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="updateCourseForm.biz_type"></el-input>
        </el-form-item>
        <el-form-item label="课程/项目">
          <el-radio-group v-model="updateCourseForm.type">
            <el-radio label="课程"></el-radio>
            <el-radio label="项目"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="updateCourseForm.status">
            <el-radio label="可见"></el-radio>
            <el-radio label="不可见"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="updateCourseForm.content"></el-input>
        </el-form-item>
        <el-form-item label="项目源码">
          <el-input type="textarea" v-model="updateCourseForm.project_uri"></el-input>
        </el-form-item>
        <el-form-item label="资源链接">
          <el-input type="textarea" v-model="updateCourseForm.source_uri"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateCourse">更新</el-button>
        <el-button @click="dialogUpdateCourseVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scope>
.el-card {
  margin: 10px;
}
</style>

<script>
export default {
  props: ["cid"],
  data() {
    return {
      course: {},
      chapters: [],
      addForm: {
        title: "",
        content: "",
        order_id: "",
        video_id: ""
      },
      updateChapterForm: {
        cid: "",
        title: "",
        content: "",
        order_id: "",
        video_id: ""
      },
      updateCourseForm: {
        title: "",
        content: "",
        biz_type: "",
        type: "",
        source_uri: "",
        project_uri: ""
      },
      dialogAddVisible: false,
      dialogUpdateCourseVisible: false,
      dialogUpdateChapterVisible: false
    };
  },
  methods: {
    async addChapter() {
      this.addForm.cid = this.cid;
      let res = await this.$http.post("/add_chapter", this.addForm);
      if (res != null) {
        this.$message.success("添加成功");
        this.dialogAddVisible = false;
      }
    },
    async updateCourse() {
      if (this.updateCourseForm.type == "课程") {
        this.updateCourseForm.type = "1";
      } else {
        this.updateCourseForm.type = "2";
      }
      if (this.updateCourseForm.status == "可见") {
        this.updateCourseForm.status = "1";
      } else {
        this.updateCourseForm.status = "2";
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
    handlerUpdateChapter(index, row) {
      this.updateChapterForm.id = row.id;
      this.updateChapterForm.content = row.content;
      this.updateChapterForm.order_id = row.orderId;
      this.updateChapterForm.video_id = row.videoId;
      this.updateChapterForm.title = row.title;
      this.dialogUpdateChapterVisible = true;
    }
  },
  async created() {
    let res = await this.$http.get("/course/" + this.cid);
    if (res != null) {
      console.log(res);
      this.course = res.data.course;
      this.chapters = res.data.chapters;
      this.updateCourseForm.type = this.course.type;
      this.updateCourseForm.biz_type = this.course.bizType;
      this.updateCourseForm.title = this.course.title;
      this.updateCourseForm.content = this.course.content;
      this.updateCourseForm.source_uri = this.course.sourceUri;
      this.updateCourseForm.project_uri = this.course.projectUri;
      this.updateCourseForm.cid = this.cid;

      if (this.updateCourseForm.type == "1") {
        this.updateCourseForm.type = "课程";
      } else {
        this.updateCourseForm.type = "项目";
      }
    }
  }
};
</script>
