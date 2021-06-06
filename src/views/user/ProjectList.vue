<template>
  <div style="height:100%">
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">项目列表</el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <el-form :model="form" :inline="true" ref="searchCourseFormRef">
            <el-row>
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="简介" prop="cotent">
                <el-input v-model="form.content"></el-input>
              </el-form-item>
              <el-form-item label="标签" prop="biz_type">
                <el-input v-model="form.biz_type"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchCourse(1)">搜索</el-button>
              </el-form-item>

              <el-form-item>
                <el-button @click="dialogSignInVisible = false">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
        <el-card shadow="hover" style="height:82%">
          <el-table
            :data="courses"
            height="250"
            border
            style="width: 100%;height:85%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="id" label="id" width="180"></el-table-column>
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="bizType" label="标签"></el-table-column>
            <el-table-column prop="content" label="简介"></el-table-column>
            <el-table-column label="类型">
              <template slot-scope="scope">{{scope.row.type == "1"?"课程":"项目"}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="text">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
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
import { LOGIN } from "@/store/type.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialogSignInVisible: false,
      dialogSignUpVisible: false,
      form: {
        title: "",
        content: "",
        biz_type: "",
        type: "2",
        status: "1",
        limit: 20,
        offset: 0
      },
      total: 2,
      courses: [],
      formLabelWidth: "120px",
      isloading: false,
      dialogUpdateVisible: false,
      currentPage: 1
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    async searchCourse(offset) {
      this.form.offset = offset - 1;
      console.log(this.form.offset);

      let res = await this.$http.post("/search_course", this.form);
      if (res != null) {
        console.log(res);
        this.total = res.data.total;
        this.courses = res.data.courses;
        this.courses.forEach(val => {
          val.content = val.content.substr(0, 10);
        });
        console.log(this.courses);
        console.log(this.total);
      }
    },
    exchangeCurrentPage(offset) {
      this.isloading = true;
      this.searchCourse(offset);
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
    }
  },
  created() {
    this.searchCourse(1);
  },
  watch: {
    currentPage(oldV, newV) {
      console.log(oldV, newV);
      this.exchangeCurrentPage(oldV);
    }
  }
};
</script>
