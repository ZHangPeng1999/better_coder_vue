<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">就业看板</el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover" style="height:82%" v-for="b in boards" :key="b.id">
          <div slot="header" class="clearfix">
            <span v-if="b.type==0">Java岗位数据看板</span>
            <span v-if="b.type==1">C岗位数据看板</span>
            <span v-if="b.type==2">C++岗位数据看板</span>
            <span v-if="b.type==3">python岗位数据看板</span>
            <span v-if="b.type==4">前端岗位数据看板</span>
            <span v-if="b.type==5">测试岗位数据看板</span>
            <span v-if="b.type==6">算法岗位数据看板</span>
            <span v-if="b.type==7">最近技术要求看板</span>
          </div>
          <el-row style="width:100%" v-if="b.type==7">
            <el-col :span="24">
              <el-card :body-style="{ padding: '0px' }">
                <img style="max-width:1300px;" :src="getImagePath(b.technologyUri)" class="image" />
              </el-card>
            </el-col>
          </el-row>
          <el-row style="width:100%" v-if="b.type!=7">
            <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }">
                <img style="max-width:300px;" :src="getImagePath(b.cityUri)" class="image" />
                <div style="padding: 14px; text-align:center">
                  <el-button type="text" @click="getDialog(b.cityUri)">城市维度分析</el-button>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }">
                <img style="max-width:300px;" :src="getImagePath(b.companyUri)" class="image" />
                <div style="padding: 14px; text-align:center">
                  <el-button type="text" @click="getDialog(b.companyUri)">公司维度分析</el-button>
                </div>
              </el-card>
            </el-col>

            <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }">
                <img style="max-width:300px;" :src="getImagePath(b.educationUri)" class="image" />
                <div style="padding: 14px; text-align:center">
                  <el-button type="text" @click="getDialog(b.educationUri)">学历维度分析</el-button>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card :body-style="{ padding: '0px' }">
                <img style="max-width:300px;" :src="getImagePath(b.salaryUri)" class="image" />
                <div style="padding: 14px; text-align:center">
                  <el-button type="text" @click="getDialog(b.salaryUri)">薪资维度分析</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
    </el-container>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="1400px">
      <img style="max-width:1300px;" :src="uri" class="image" />
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
      boards: [],
      dialogVisible: false,
      uri: ""
    };
  },
  methods: {
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
    }
  }
};
</script>
