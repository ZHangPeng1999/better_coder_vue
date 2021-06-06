<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">{{chapter.title}}</el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover" style="height:500px">
          <iframe
            :src="path"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
            height="450px"
            width="100%"
          ></iframe>
        </el-card>
        <el-card shadow="hover">
          <div style="text-align:left">{{chapter.content}}</div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<style scope>
.el-card {
  margin: 20px;
}
</style>
<script>
export default {
  props: ["cid"],
  data() {
    return {
      chapter: {},
      path: ""
    };
  },
  methods: {},
  async created() {
    let res = await this.$http.get("/chapter/" + this.cid);
    if (res != null) {
      console.log(res);
      this.chapter = res.data.chapter;
      this.path = res.data.path;
    }
  }
};
</script>
