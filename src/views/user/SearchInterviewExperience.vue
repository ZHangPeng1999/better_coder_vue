<template>
  <div style="height:100%">
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">招聘广场</el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <el-form :model="form" :inline="true">
            <el-row>
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="简介" prop="cotent">
                <el-input v-model="form.content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchDoc(1)">搜索</el-button>
              </el-form-item>

              <el-form-item>
                <el-button @click="dialogSignInVisible = false">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
        <el-card shadow="hover" style="height:auto">
          <el-card v-for="d in docs" :key="d.id" shadow="hover" style=" text-align: left;">
            <div @click="handlerReadRoute(d)">
              <div slot="header" class="clearfix">
                <span
                  style="padding: 3px 0; font-size:20px;  text-align: left;"
                  type="text"
                >{{d.title}}</span>
              </div>
              <span>{{d.user.name}}</span>
            </div>
          </el-card>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            page-size="20"
            :current-page.sync="currentPage"
          ></el-pagination>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-card__body {
  height: 100%;
}
.el-card {
  margin: 10px;
}
</style>

<script>
export default {
  data() {
    return {
      dialogSignInVisible: false,
      dialogSignUpVisible: false,
      form: {
        title: "",
        content: "",
        type: "4",
        limit: 20,
        offset: 0
      },
      total: 2,
      docs: [],
      formLabelWidth: "120px",
      isloading: false,
      dialogUpdateVisible: false,
      currentPage: 1
    };
  },
  methods: {
    async searchDoc(offset) {
      this.form.offset = offset - 1;
      console.log(this.form.offset);

      let res = await this.$http.post("/search_doc", this.form);
      console.log(res);

      if (res != null) {
        console.log(res);
        this.total = res.data.total;
        this.docs = res.data.docs;
      }
    },
    exchangeCurrentPage(offset) {
      this.isloading = true;
      this.searchDoc(offset);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 3 === 1) {
        return "warning-row";
      } else if (rowIndex % 3 === 2) {
        return "success-row";
      }
      return "";
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("myCourse/" + row.id);
    },
    handlerReadRoute(row) {
      this.$router.push("/InterviewExperience/" + row.id);
    }
  },
  created() {
    this.searchDoc(1);
  },
  watch: {
    currentPage(oldV, newV) {
      console.log(oldV, newV);
      this.exchangeCurrentPage(oldV);
    }
  }
};
</script>
