<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">新建招聘信息</el-col>
          <!-- <el-col :span="3">
            <el-button @click="dialogAddVisible = true" type="text" style="color:#303133">添加章节</el-button>
          </el-col>-->

          <el-col :span="3">
            <el-button type="text" style="color:#303133" @click="dialogAddVisible = true">选择招聘信息模板</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>

          <mavon-editor
            :ishljs="true"
            v-model="form.content"
            ref="md"
            @save="save"
            :toolbars="markdownOption"
          />
          <el-button @click="submit">发布</el-button>
          <el-button @click="save">保存草稿</el-button>
        </el-card>
      </el-main>
    </el-container>
    <!-- 选课dialog -->
    <el-dialog title="选择模板" :visible.sync="dialogAddVisible" center>
      <el-card v-for="s in selectModel" :key="s.id">
        <div>模板标题：{{s.title}}</div>
        <mavon-editor
          v-model="s.content"
          :subfield="false"
          :boxShadow="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
        />
        <el-button type="primary" @click="selectThisModel(s)">选择该模板</el-button>
      </el-card>
      <el-button @click="dialogAddVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
import marked from "marked";
export default {
  data() {
    return {
      form: {
        content: "请编辑内容",
        title: "",
        type: "4",
        status: ""
      },
      readmeContent: "",
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: false, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      selectModel: [
        {
          id: "1",
          title: "[____公司]最新面经分享",
          content: "一面：\n二面：\n三面："
        }
      ],
      dialogAddVisible: false
    };
  },
  methods: {
    async submit() {
      console.log(this.form);
      this.form.status = 2;
      let res = await this.$http.post("/add_doc", this.form);
      if (res != null) {
        this.$message.success("添加成功！");
        this.$router.push("/interviewExperienceList");
      }
    },
    async save() {
      console.log(this.form);
      this.form.status = 1;
      let res = await this.$http.post("/add_doc", this.form);
      if (res != null) {
        this.$message.success("添加成功！");
        this.$router.push("/interviewExperienceList");
      }
    },
    selectThisModel(s) {
      (this.form.title = s.title),
        (this.form.content = s.content),
        (this.dialogAddVisible = false),
        this.$message.success("选择成功");
    }
  },
  async created() {
    this.readmeContent = marked(this.form.content || "", {
      sanitize: true
    });
    let res = await this.$http.get("/get_docs/6");
    if (res != null) {
      console.log(res);
      this.selectModel = res.data.docs;
    }
  }
};
</script>
<style scope>
.el-card {
  margin: 20px;
}
</style>
