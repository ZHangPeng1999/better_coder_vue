<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">添加课程</el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <el-row>
            <el-col :span="20" :offset="6">
              <el-form ref="form" :model="form" style="width:50%">
                <el-form-item label="名称">
                  <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="标签">
                  <el-input v-model="form.biz_type"></el-input>
                </el-form-item>
                <el-form-item label="课程/项目">
                  <el-radio-group v-model="form.type">
                    <el-radio label="课程"></el-radio>
                    <el-radio label="项目"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="状态">
                  <el-radio-group v-model="form.status">
                    <el-radio label="可见"></el-radio>
                    <el-radio label="不可见"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="简介">
                  <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="项目源码">
                  <el-input type="textarea" v-model="form.project_uri"></el-input>
                </el-form-item>
                <el-form-item label="资源链接">
                  <el-input type="textarea" v-model="form.source_uri"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        biz_type: "",
        type: "",
        source_uri: "",
        project_uri: "",
        status: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      if (this.form.type == "课程") {
        this.form.type = "1";
      } else {
        this.form.type = "2";
      }
      if (this.form.status == "可见") {
        this.form.status = "1";
      } else {
        this.form.status = "2";
      }
      let res = await this.$http.post("/add_course", this.form);
      if (res != null) {
        this.$message.success("新建成功！");
      }
    }
  }
};
</script>
