<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">编辑升学信息</el-header>
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
  </div>
</template>
<script>
import marked from "marked";
export default {
  props: ["id"],
  data() {
    return {
      form: {
        content: "请编辑内容",
        title: "",
        type: "2",
        status: "",
        id: ""
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
      }
    };
  },
  methods: {
    async submit() {
      console.log(this.form);
      this.form.status = 2;
      let res = await this.$http.post("/update_doc", this.form);
      if (res != null) {
        this.$message.success("更新成功！");
        this.$router.push("/schoolList");
      }
    },
    async save() {
      console.log(this.form);
      this.form.status = 1;
      let res = await this.$http.post("/update_doc", this.form);
      if (res != null) {
        this.$message.success("更新成功！");
        this.$router.push("/schoolList");
      }
    },
    async get() {
      let res = await this.$http.get("/get_doc/" + this.id);
      console.log(res);
      if (res != null) {
        this.form.title = res.data.title;
        this.form.type = res.data.type;
        this.form.content = res.data.content;
      }
      console.log(this.form);
    }
  },
  async created() {
    let res = await this.$http.get("/get_doc/" + this.id);
    console.log(res);
    if (res != null) {
      this.form.title = res.data.doc.title;
      this.form.type = res.data.doc.type;
      this.form.content = res.data.doc.content;
      this.form.id = res.data.doc.id;
    }
    console.log(this.form);
  }
};
</script>
<style scope>
.el-card {
  margin: 20px;
}
</style>
