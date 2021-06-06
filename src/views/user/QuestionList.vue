<template>
  <div style="height:100%">
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">题目列表</el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <el-form :model="searchForm" :inline="true" ref="searchQuestionFormRef">
            <el-row>
              <el-form-item label="标题" prop="title">
                <el-input v-model="searchForm.title"></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="cotent">
                <el-input v-model="searchForm.content"></el-input>
              </el-form-item>
              <el-form-item label="标签" prop="biz_type">
                <el-input v-model="searchForm.biz_type"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="searchForm.type" placeholder="请选择">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="难度">
                <el-select v-model="addForm.level" placeholder="请选择">
                  <el-option
                    v-for="item in levelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchQuestion(1)">搜索</el-button>
              </el-form-item>

              <el-form-item>
                <el-button @click="dialogSignInVisible = false">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
        <el-card shadow="hover" style="height:82%">
          <el-table
            :data="questions"
            height="250"
            border
            style="width: 100%;height:85%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="id" label="id" width="180"></el-table-column>
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="bizType" label="标签"></el-table-column>
            <el-table-column label="类型">
              <template slot-scope="scope">{{getTypeStr(scope.row.type)}}</template>
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
      dialogUpdateVisible: false,
      searchForm: {
        title: "",
        content: "",
        biz_type: "",
        type: "0",
        level: "0",
        status: "0",
        limit: 20,
        offset: 0
      },
      addForm: {
        title: "",
        content: "",
        biz_type: "",
        type: "0",
        level: "0",
        status: "",
        a: "",
        b: "",
        c: "",
        d: "",
        answer: ""
      },
      updateForm: {
        id: "",
        title: "",
        content: "",
        biz_type: "",
        type: "0",
        level: "0",
        a: "",
        b: "",
        c: "",
        d: "",
        answer: "",
        status: ""
      },
      total: 2,
      questions: [],
      formLabelWidth: "120px",
      isloading: false,
      dialogAddVisible: false,
      currentPage: 1,
      typeOptions: [
        {
          value: "1",
          label: "选择"
        },
        {
          value: "2",
          label: "判断"
        },
        {
          value: "3",
          label: "简答"
        },
        {
          value: "4",
          label: "编程"
        }
      ],
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
      ]
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    async searchQuestion(offset) {
      this.searchForm.offset = offset - 1;
      console.log(this.searchForm.offset);
      let res = await this.$http.post("/search_question", this.searchForm);
      if (res != null) {
        console.log(res);
        this.total = res.data.total;
        this.questions = res.data.questions;
        console.log(this.questions);
        console.log(this.total);
      }
    },
    exchangeCurrentPage(offset) {
      this.isloading = true;
      this.searchQuestion(offset);
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
      this.$router.push("/question/" + row.id);
    },
    async addQuestion() {
      if (this.addForm.status == "可见") {
        this.addForm.status = "1";
      } else {
        this.addForm.status = "2";
      }
      let res = await this.$http.post("/add_question", this.addForm);
      if (res != null) {
        this.$message.success("新建成功!");
        this.dialogAddVisible = false;
      }
    },
    async updateQuestion() {
      if (this.updateForm.status == "可见") {
        this.updateForm.status = "1";
      } else {
        this.updateForm.status = "2";
      }
      let res = await this.$http.post("/update_question", this.updateForm);
      if (res != null) {
        this.$message.success("更新成功!");
        this.dialogUpdateVisible = false;
      }
    },
    getTypeStr(type) {
      if (type == "1") {
        return "选择";
      } else if (type == "2") {
        return "判断";
      } else if (type == "3") {
        return "简答";
      }
    }
  },
  created() {
    this.searchQuestion(1);
  },
  watch: {
    currentPage(oldV, newV) {
      console.log(oldV, newV);
      this.exchangeCurrentPage(oldV);
    }
  }
};
</script>
