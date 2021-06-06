<template>
  <div style="height:100%">
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">用户列表</el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <el-form :model="form" :inline="true" ref="searchUserFormRef">
            <el-row>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="用户名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchUser(1)">搜索</el-button>
              </el-form-item>

              <el-form-item>
                <el-button @click="dialogSignInVisible = false">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
        <el-card shadow="hover" style="height:82%">
          <el-table
            :data="users"
            height="250"
            border
            style="width: 100%;height:85%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="id" label="id" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="number" label="用户名"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="newList-list" v-if="(!isloading) && (users.length === 0)">暂无数据</div>
          <div class="newList-list" v-if="isloading">加载中...</div>
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
    <!-- 编辑dialog -->
    <el-dialog title="编辑" :visible.sync="dialogUpdateVisible" center>
      <el-form :model="updateForm" :rules="rules" ref="updateFormRef">
        <el-form-item label="id" :label-width="formLabelWidth" prop="id">
          <el-input v-model="updateForm.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="updateForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="role">
          <el-radio v-model="updateForm.role" label="ADMIN">管理员</el-radio>
          <el-radio v-model="updateForm.role" label="USER">普通用户</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateUser">更新</el-button>
        <el-button @click="dialogUpdateVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
        username: "",
        name: "",
        limit: 20,
        offset: 0
      },
      updateForm: {
        name: "",
        password: "",
        id: "",
        role: ""
      },
      total: 2,
      users: [],
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
    async searchUser(offset) {
      this.form.offset = offset - 1;
      console.log(this.form.offset);

      let res = await this.$http.post("/search_user", this.form);
      if (res != null) {
        console.log(res);
        this.total = res.data.total;
        this.users = res.data.users;
        console.log(this.users);
        console.log(this.total);
        this.isloading = false;
      }
    },
    exchangeCurrentPage(offset) {
      this.isloading = true;
      this.searchUser(offset);
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
      this.dialogUpdateVisible = true;
      this.updateForm.id = row.id;
      this.updateForm.name = row.name;
      this.updateForm.password = row.password;
      this.updateForm.role = row.role;
    },
    async updateUser() {
      if (this.updateForm.role == "ADMIN") {
        this.updateForm.role = "1";
      } else {
        this.updateForm.role = "2";
      }
      let res = await this.$http.post("/update_user", this.updateForm);
      if (res != null) {
        this.$message.success("修改成功！");
        this.dialogUpdateVisible = false;
      }
    }
  },
  created() {
    this.searchUser(1);
  },
  watch: {
    currentPage(oldV, newV) {
      console.log(oldV, newV);
      this.exchangeCurrentPage(oldV);
    }
  }
};
</script>
