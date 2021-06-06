<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">题目详情</el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover">
          <div>标题：{{question.title}}</div>
        </el-card>
        <el-card shadow="hover">
          <div>描述：{{question.content}}</div>
        </el-card>
        <el-card shadow="hover" v-if="question.type == '3'">
          <div>请输入您的回答：</div>
          <el-input v-model="answer_question.result" placeholder="请输入答案" type="textarea"></el-input>
          <el-button @click="submit_answer">提交答案</el-button>
        </el-card>
        <el-card shadow="hover" v-if="question.type == '1'">
          <div>请输入您的回答：</div>
          <el-radio v-model="answer_question.radio" label="A">{{question.aselect}}</el-radio>
          <el-radio v-model="answer_question.radio" label="B">{{question.bselect}}</el-radio>
          <el-radio v-model="answer_question.radio" label="C">{{question.cselect}}</el-radio>
          <el-radio v-model="answer_question.radio" label="D">{{question.dselect}}</el-radio>
          <el-button @click="submit_answer">提交答案</el-button>
        </el-card>
        <el-card shadow="hover" v-if="question.type == '2'">
          <div>请输入您的回答：</div>
          <el-radio v-model="answer_question.radio" label="A">{{question.aselect}}</el-radio>
          <el-radio v-model="answer_question.radio" label="B">{{question.bselect}}</el-radio>
          <el-button @click="submit_answer">提交答案</el-button>
        </el-card>
      </el-main>
    </el-container>
    <!-- 展示答题结果dialog -->
    <el-dialog title="回答结果" :visible.sync="dialogResultVisible" center>
      <el-form>
        <el-form-item label="判题结果" :label-width="formLabelWidth">
          <el-input v-model="result" disabled></el-input>
        </el-form-item>
        <el-form-item label="正确答案" :label-width="formLabelWidth">
          <el-input v-model="question.answer" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResultVisible = false">取消</el-button>
      </div>
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
  props: ["id"],
  data() {
    return {
      question: {},
      path: "",
      answer_question: {
        radio: "A",
        result: "",
        id: ""
      },
      dialogResultVisible: false,
      result: ""
    };
  },
  methods: {
    async submit_answer() {
      if (this.question.type == "1") {
        if (this.answer_question.radio == "A") {
          this.answer_question.result = this.question.aselect;
        } else if (this.answer_question.radio == "B") {
          this.answer_question.result = this.question.bselect;
        } else if (this.answer_question.radio == "C") {
          this.answer_question.result = this.question.cselect;
        } else {
          this.answer_question.result = this.question.dselect;
        }
      } else if (this.question.type == "2") {
        if (this.answer_question.radio == "A") {
          this.answer_question.result = this.question.aselect;
        } else if (this.answer_question.radio == "B") {
          this.answer_question.result = this.question.bselect;
        }
      }
      this.answer_question.id = this.question.id;
      let res = await this.$http.post("/answer_question", this.answer_question);
      if (res != null) {
        console.log(res);
        this.result = res.data.result;
        this.dialogResultVisible = true;
      }
    }
  },
  async created() {
    let res = await this.$http.get("/question/" + this.id);
    if (res != null) {
      console.log(res);
      this.question = res.data.question;
      this.path = res.data.path;
      console.log(this.question);
    }
  }
};
</script>
