<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">招聘信息管理</el-col>
          <!-- <el-col :span="3">
            <el-button @click="dialogAddVisible = true" type="text" style="color:#303133">添加章节</el-button>
          </el-col>-->

          <el-col :span="3">
            <el-button @click="addRoute" type="text" style="color:#303133">新增招聘信息</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <el-table :data="docs">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="title" label="题目"></el-table-column>

            <el-table-column label="状态" width="180">
              <template slot-scope="scope">{{scope.row.status == "1"?"草稿":"发布"}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handlerReadRoute(scope.$index, scope.row)"
                  type="text"
                >预览</el-button>
                <el-button
                  size="mini"
                  @click="handlerUpdateRoute(scope.$index, scope.row)"
                  type="text"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      docs: []
    };
  },
  methods: {
    addRoute() {
      this.$router.push("/addInterviewExperience");
    },
    handlerUpdateRoute(index, row) {
      this.$router.push("/editInterviewExperience/" + row.id);
    },
    handlerReadRoute(index, row) {
      this.$router.push("/interviewExperience/" + row.id);
    },
    async getDocs() {
      let res = await this.$http.get("/get_docs/4");
      if (res != null) {
        console.log(res);
        this.docs = res.data.docs;
        console.log(this.docs);
      }
    }
  },
  created() {
    this.getDocs();
  }
};
</script>
<style scope>
.el-card {
  margin: 20px;
}
</style>
