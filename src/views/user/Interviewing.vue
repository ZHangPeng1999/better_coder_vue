<template>
  <div>
    <el-container>
      <el-header style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row style="width:100%">
          <el-col :span="21">模拟面试</el-col>
          <el-col :span="3">
            <el-button @click="dialogAddeVisible = true" type="text" style="color:#303133">发起面试</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); padding: 0; height:100%"
      >
        <el-card shadow="hover" style="height:82%">
          <el-row style="width:100%">
            <el-col :span="21">
              <span style="padding: 3px 0; font-size:30px" type="text">模拟面试</span>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="hover" style="height:82%" v-for="cq in choose_questions" :key="cq.id">
          <div slot="header" class="clearfix">
            <span style="padding: 3px 0; font-size:30px" type="text">标题：{{cq.question.title}}</span>
          </div>
          <div class="clearfix">
            <span style="padding: 3px 0;" type="text">描述：{{ cq.question.content }}</span>
          </div>
          <el-divider></el-divider>
          <audio :src="getPath(cq.question.voice)" controls="controls"></audio>
          <el-divider></el-divider>
          <el-button @click="handlePlay">听录音</el-button>
          <el-divider></el-divider>
          <!-- <div>回答时长：{{ recorder && recorder.duration.toFixed(4) }}秒</div> -->
          <el-button type="primary" @click="handleStart">
            <i class="el-icon-mic"></i>开始回答
          </el-button>
          <el-button type="warning" @click="uploadRecord(cq)">完成回答</el-button>
        </el-card>
        <el-card shadow="hover" style="height:82%" center>
          <el-button @click="submit_answer">提交面试记录</el-button>
        </el-card>
      </el-main>
    </el-container>
    <!-- 发起评估结果dialog -->
    <el-dialog title="面试记录" :visible.sync="dialogAddeVisible" center>
      <el-card shadow="hover" style="height:82%">
        <div style="padding: 3px 0; font-size:30px" type="text">本次面试记录</div>
      </el-card>
      <el-card shadow="hover" style="height:82%" v-for="cq in result.choose_questions" :key="cq.id">
        <div slot="header" class="clearfix">
          <span style="padding: 3px 0; font-size:30px" type="text">标题：{{cq.question.title}}</span>
        </div>
        <div>
          <el-row>
            <el-col :span="21">您的回答：{{cq.answer}}</el-col>
          </el-row>
        </div>
        <div>
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
import Recorder from "js-audio-recorder";
export default {
  props: ["id"],
  data() {
    return {
      exam: {},
      choose_questions: [
        {
          id: "1",
          question: {
            title: "请描述下Java的特点",
            content: "请描述下Java的特点"
          }
        },
        {
          id: "2",

          question: {
            title: "Java是什么语言？",
            content: "Java是什么语言？"
          }
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
      ],
      recorder: 0,
      formLabelWidth: "120px",
      dialogAddeVisible: false,
      result: {
        exam: {},
        choose_questions: [
          {
            id: "1",
            answer: "Java具有简单性、面向对象的特点",
            question: {
              title: "请描述下Java的特点",
              content: "请描述下Java的特点",
              answer:
                "Java具有简单性、面向对象、分布式、健壮性、安全性、平台独立与可移植性、多线程、动态性等特点"
            }
          },
          {
            id: "2",
            answer: "Java是一门编程语言",
            question: {
              title: "Java是什么语言？",
              content: "Java是什么语言？",
              answer: "Java是一门面向对象编程语言"
            }
          }
        ]
      }
    };
  },
  methods: {
    async submit_answer() {
      var judge_exams = new Array();
      for (let i in this.choose_questions) {
        let cq = this.choose_questions[i];
        judge_exams[i] = { id: "1", answer: "1" };
        judge_exams[i].id = cq.id;
        judge_exams[i].answer = cq.answer;
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
    },
    // 开始录音
    handleStart() {
      this.recorder = new Recorder();
      Recorder.getPermission().then(
        () => {
          console.log("开始录音");
          this.recorder.start(); // 开始录音
        },
        error => {
          this.$Message.info("请先允许该网页使用麦克风");
          console.log(`${error.name} : ${error.message}`);
        }
      );
    },
    handlePause() {
      console.log("暂停录音");
      this.recorder.pause(); // 暂停录音
    },
    handleResume() {
      console.log("恢复录音");
      this.recorder.resume(); // 恢复录音
    },
    handleStop() {
      console.log("停止录音");
      this.recorder.stop(); // 停止录音
    },
    handlePlay() {
      console.log("播放录音");
      this.recorder.play(); // 播放录音

      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime();
        } catch (error) {
          this.timer = null;
        }
      }, 100);
    },
    handlePausePlay() {
      console.log("暂停播放");
      this.recorder.pausePlay(); // 暂停播放

      // 播放时长
      this.playTime = this.recorder.getPlayTime();
      this.time = null;
    },
    handleResumePlay() {
      console.log("恢复播放");
      this.recorder.resumePlay(); // 恢复播放

      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime();
        } catch (error) {
          this.timer = null;
        }
      }, 100);
    },
    handleStopPlay() {
      console.log("停止播放");
      this.recorder.stopPlay(); // 停止播放

      // 播放时长
      this.playTime = this.recorder.getPlayTime();
      this.timer = null;
    },
    handleDestroy() {
      console.log("销毁实例");
      this.recorder.destroy(); // 毁实例
      this.timer = null;
    },
    async uploadRecord(cq) {
      if (this.recorder == null || this.recorder.duration === 0) {
        this.$Message.error("请先录音");
        return false;
      }
      this.recorder.pause(); // 暂停录音
      this.timer = null;
      console.log("上传录音"); // 上传录音
      var formData = new FormData();
      var blob = this.recorder.getPCMBlob(); //获取wav格式音频数据
      //此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为file塞入formData
      var newbolb = new Blob([blob], { type: "audio/wav" });
      var fileOfBlob = new File([newbolb], new Date().getTime() + ".wav");
      formData.append("file", fileOfBlob);
      var reader = new FileReader();
      let fileResult;
      reader.readAsDataURL(fileOfBlob);
      reader.onload = () => {
        fileResult = reader.result;
        console.log("file 转 base64结果：" + fileResult);
        let res = this.$http.post("/get_text", {
          data: fileResult
        });
        //本地公共上传接口获取到服务器地址保存即可
        this.$http
          .post("/get_text", {
            data: fileResult
          })
          .then(res => {
            console.log(res);
            if (res.data.res.indexOf("err") != -1) {
              cq.answer = "抱歉您的语音不够清晰，没有听清。";
            } else {
              cq.answer = res.data.res;
            }
            console.log(this.choose_questions);
          });
      };
    },
    getPath(fileName) {
      return require("@/assets/voice/" + fileName);
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
