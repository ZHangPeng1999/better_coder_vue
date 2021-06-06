<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">模块管理</el-col>
          <!-- <el-col :span="3">
            <el-button @click="dialogAddVisible = true" type="text" style="color:#303133">添加章节</el-button>
          </el-col>-->
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <el-card v-for="m in menus" :key="m.id">
            <el-row>
              <el-col :span="16">
                <div>{{m.name}}</div>
              </el-col>
              <el-col :offset="4" :span="4">
                <el-switch
                  v-model="m.open"
                  active-text="可见"
                  inactive-text="不可见"
                  active-value="1"
                  inactive-value="2"
                  @change="changeStatus($event,m)"
                ></el-switch>
              </el-col>
            </el-row>
          </el-card>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [],
      value: true
    };
  },
  methods: {
    changeStatus: async function($event, m) {
      console.log(m);
      let res = await this.$http.post("/update_menu", {
        id: m.id,
        open: m.open
      });
      if (res != null) {
        console.log(res);
        this.$message.success("修改成功！");
      }
    },
    async getDocs() {
      let res = await this.$http.get("/get_menus");
      if (res != null) {
        res.data.menus.forEach(element => {
          console.log(element.open);
          if (element.open == 1) {
            element.open = "1";
          } else {
            element.open = "2";
          }
        });
        console.log(res);
        this.menus = res.data.menus;
        console.log(this.menus);
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
