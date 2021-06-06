<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">能力评估</el-col>
          <el-col :span="3">
            <el-button @click="dialogAddeVisible = true" type="text" style="color:#303133">发起评估</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover" style="height:82%">
          <el-row style="width:100%">
            <el-col :span="21">
              <span style="padding: 3px 0; font-size:30px" type="text">评估开始</span>
            </el-col>
            <el-col :span="3">
              <span type="text" style="color:#303133">上次得分：{{exam.grade}}分</span>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" style="height:82%" v-for="cq in choose_questions" :key="cq.id">
          <div slot="header" class="clearfix">
            <span style="padding: 3px 0; font-size:30px" type="text">标题：{{cq.question.title}}</span>
          </div>
          <div class="clearfix">
            <span style="padding: 3px 0;" type="text">描述：{{cq.question.content}}</span>
          </div>
          <el-divider></el-divider>

          <div v-if="cq.question.type == '1'">
            <div>请输入您的回答：</div>
            <el-radio v-model="cq.answer" label="A">{{cq.question.aselect}}</el-radio>
            <el-radio v-model="cq.answer" label="B">{{cq.question.bselect}}</el-radio>
            <el-radio v-model="cq.answer" label="C">{{cq.question.cselect}}</el-radio>
            <el-radio v-model="cq.answer" label="D">{{cq.question.dselect}}</el-radio>
          </div>
          <div v-if="cq.question.type == '2'">
            <div>请输入您的回答：</div>
            <el-radio v-model="cq.answer" label="A">{{cq.question.aselect}}</el-radio>
            <el-radio v-model="cq.answer" label="B">{{cq.question.bselect}}</el-radio>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:82%" center>
          <el-button @click="submit_answer">提交答案</el-button>
        </el-card>
      </el-main>
    </el-container>
    <!-- 发起评估结果dialog -->
    <el-dialog title="评估结果" :visible.sync="dialogAddeVisible" center>
      <el-card shadow="hover" style="height:82%">
        <div style="padding: 3px 0; font-size:30px" type="text">本次评估结果</div>
        <div type="text" style="color:#303133">本次得分：{{result.exam.grade}}分</div>
      </el-card>
      <el-card shadow="hover" style="height:82%" v-for="cq in result.choose_questions" :key="cq.id">
        <div slot="header" class="clearfix">
          <span style="padding: 3px 0; font-size:30px" type="text">标题：{{cq.question.title}}</span>
        </div>
        <div>
          <el-row>
            <el-col :span="21">您的回答：{{cq.answer}}</el-col>
            <el-col :span="3">回答{{cq.result}}</el-col>
          </el-row>
        </div>
        <div v-if="cq.result == '错误'">
          <el-divider></el-divider>
          <div>
            <div>正确答案：{{cq.question.answer}}</div>
          </div>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddeVisible = false">确认</el-button>
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
      exam: {},
      choose_questions: [],
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
      ],
      formLabelWidth: "120px",
      dialogAddeVisible: false,
      result: {
        exam: {},
        choose_questions: []
      }
    };
  },
  methods: {
    async submit_answer() {
      for (var i in this.choose_questions) {
        var cq = this.choose_questions[i];
        if (cq.answer == null) {
          this.$message.error(
            "题目" + cq.question.title + "没有完成，请全部完成后提交"
          );
          return;
        }
      }
      var judge_exams = new Array();
      for (i in this.choose_questions) {
        cq = this.choose_questions[i];
        console.log(cq);
        judge_exams[i] = { id: "1", answer: "1" };
        judge_exams[i].id = cq.id;
        if (cq.answer == "A") {
          judge_exams[i].answer = cq.question.aselect;
        } else if (cq.answer == "B") {
          judge_exams[i].answer = cq.question.bselect;
        } else if (cq.answer == "C") {
          judge_exams[i].answer = cq.question.cselect;
        } else {
          judge_exams[i].answer = cq.question.dselect;
        }
        console.log(judge_exams[i]);
      }
      let res = await this.$http.post("/judge_exam", {
        id: this.id,
        choose_questions: JSON.stringify(judge_exams)
      });
      if (res != null) {
        console.log(res);
        this.result.exam = res.data.exam;
        this.result.choose_questions = res.data.choose_questions;
        this.dialogAddeVisible = true;
      }
    }
  },
  async created() {
    let res = await this.$http.get("/exam/" + this.id);
    if (res != null) {
      console.log(res);
      this.exam = res.data.exam;
      this.choose_questions = res.data.choose_questions;
      console.log(this.choose_questions);
    }
  }
};
</script>
