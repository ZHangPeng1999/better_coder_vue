<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">模拟面试</el-col>
          <el-col :span="3">
            <el-button @click="dialogAddeVisible = true" type="text" style="color:#303133">发起面试</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover" style="height:82%">
          <div slot="header" class="clearfix">
            <span style="padding: 3px 0; font-size:30px" type="text">面试历史</span>
          </div>
          <el-table
            :data="exams"
            height="250"
            border
            style="width: 100%;height:85%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="id" label="id" width="300"></el-table-column>
            <el-table-column prop="grade" label="得分" width="300"></el-table-column>

            <el-table-column prop="updateTime" label="最后一次提交时间" width="300"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="text">再次尝试</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
    <!-- 发起评估结果dialog -->
    <el-dialog title="回答结果" :visible.sync="dialogAddeVisible" center>
      <el-form :model="addForm">
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-input v-model="addForm.biz_type"></el-input>
        </el-form-item>
        <el-form-item label="难度" :label-width="formLabelWidth">
          <el-select v-model="addForm.level" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_exam">发起评估</el-button>
        <el-button @click="dialogAddeVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scope>
.el-card {
  margin: 20px;
  text-align: left;
}
</style>
<script>
export default {
  data() {
    return {
      exams: [],
      addForm: {
        level: "",
        biz_type: ""
      },
      levelOptions: [
        {
          value: "1",
          label: "easy"
        },
        {
          value: "2",
          label: "middle"
        },
        {
          value: "3",
          label: "hard"
        }
      ],
      formLabelWidth: "120px",

      dialogAddeVisible: false
    };
  },
  methods: {
    async add_exam() {
      if (this.addForm.level == "") {
        this.addForm.level = "0";
      }
      let res = await this.$http.post("/begin_interview", this.addForm);
      if (res != null) {
        console.log(res);
        this.$router.push("/interviewing/" + res.data.exam.id);
      }
    },
    handleEdit(index, row) {
      this.$router.push("/interviewing/" + row.id);
    }
  },
  async created() {
    let res = await this.$http.get("/exams");
    if (res != null) {
      console.log(res);
      let exams = [];
      for (let x in res.data.exams) {
        let data = res.data.exams[x];
        if (data.type == 2) {
          exams.push(data);
        }
      }
      console.log(exams);
      this.exams = exams;
    }
  }
};
</script>
