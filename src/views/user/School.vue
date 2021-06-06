<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">升学看版</el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span style="padding: 3px 0; font-size:30px" type="text">{{form.title}}</span>
            <span style="float: right; padding: 3px 0" type="text">作者：{{user.name}}</span>
          </div>
          <mavon-editor
            v-model="form.content"
            :subfield="false"
            :boxShadow="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
          />
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
        content:
          "# 123\n12312^上角标^\n1231243~下角标~\n```\nlanguage\n\n```\n",
        title: "【震惊】xxxxx",
        id: ""
      },
      user: {
        name: "456"
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
    submit() {
      console.log(this.form);
    },
    save() {
      console.log(this.form);
    }
  },
  async created() {
    let res = await this.$http.get("/get_doc/" + this.id);
    console.log(res);
    if (res != null) {
      this.form.title = res.data.doc.title;
      this.form.content = res.data.doc.content;
      this.form.id = res.data.doc.id;
      this.user.name = res.data.name;
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
