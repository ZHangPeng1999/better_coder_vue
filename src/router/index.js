import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Welcome from "@/components/Welcome.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/welcome" },
  { path: "/welcome", component: Welcome },
  { path: "/login", component: Login },
  {
    path: "/updateByxlsx",
    component: () => import("@/views/UpdateByxlsx.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
// 后期载入路由
let adminRouts = [
  {
    path: "/admin",
    component: () => import("@/views/Admin.vue"),
    redirect: "myspace",
    children: [
      {
        path: "/myspace",
        component: () => import("@/views/MySpace.vue")
      },
      {
        path: "/userList",
        component: () => import("@/views/UserList.vue")
      },
      {
        path: "/courseList",
        component: () => import("@/views/CourseList.vue")
      },
      {
        path: "/addCourse",
        component: () => import("@/views/AddCourse.vue")
      },
      {
        props: true,
        path: "/course/:cid",
        component: () => import("@/views/Course.vue")
      },
      {
        props: true,
        path: "/questions",
        component: () => import("@/views/ProblemList.vue")
      },
      {
        props: true,
        path: "/editInterviewExperienceModel/:id",
        component: () => import("@/views/admin/EditInterviewExperienceModel.vue")
      },
      {
        path: "/addInterviewExperienceModel",
        component: () => import("@/views/admin/AddInterviewExperienceModel.vue")
      }, { path: "/recruitModelList", component: () => import("@/views/admin/RecruitModelList.vue") },
      { path: "/interviewExperienceModelList", component: () => import("@/views/admin/InterviewExperienceModelList.vue") },
      { path: "/menuList", component: () => import("@/views/admin/MenuList.vue") },

      {
        props: true,
        path: "/editRecruitModel/:id",
        component: () => import("@/views/admin/EditRecruitModel.vue")
      },
      {
        path: "/addRecruitModel",
        component: () => import("@/views/admin/AddRecruitModel.vue")
      },
    ]
  }
];
let userRouts = [
  {
    path: "/user",
    component: () => import("@/views/User.vue"),
    redirect: "userspace",
    children: [
      {
        path: "/userspace",
        component: () => import("@/views/MySpace.vue")
      },
      { path: "/projectList", component: () => import("@/views/user/ProjectList.vue") },
      { path: "/userCourseList", component: () => import("@/views/user/CourseList.vue") },
      { path: "/employmentBoard", component: () => import("@/views/user/EmploymentBoard.vue") },
      { path: "/questionList", component: () => import("@/views/user/QuestionList.vue") },
      { path: "/recruitList", component: () => import("@/views/user/RecruitList.vue") },
      { path: "/blogList", component: () => import("@/views/user/BlogList.vue") },
      {
        props: true,
        path: "/myCourse/:cid",
        component: () => import("@/views/user/Course.vue")
      },
      {
        props: true,
        path: "/chapter/:cid",
        component: () => import("@/views/user/Chapter.vue")
      },
      {
        props: true,
        path: "/blog/:id",
        component: () => import("@/views/user/Blog.vue")
      },
      {
        props: true,
        path: "/editBlog/:id",
        component: () => import("@/views/user/EditBlog.vue")
      },
      {
        path: "/addBlog",
        component: () => import("@/views/user/AddBlog.vue")
      },
      {
        props: true,
        path: "/interviewExperience/:id",
        component: () => import("@/views/user/InterviewExperience.vue")
      },
      {
        props: true,
        path: "/editInterviewExperience/:id",
        component: () => import("@/views/user/EditInterviewExperience.vue")
      },
      {
        path: "/addInterviewExperience",
        component: () => import("@/views/user/AddInterviewExperience.vue")
      }, {
        props: true,
        path: "/school/:id",
        component: () => import("@/views/user/School.vue")
      },
      {
        props: true,
        path: "/editSchool/:id",
        component: () => import("@/views/user/EditSchool.vue")
      },
      {
        path: "/addSchool",
        component: () => import("@/views/user/AddSchool.vue")
      }, {
        path: "/exams",
        component: () => import("@/views/user/Exam.vue")
      }, {
        props: true,
        path: "/recruit/:id",
        component: () => import("@/views/user/Recruit.vue")
      }, {
        props: true,
        path: "/exam/:id",
        component: () => import("@/views/user/Examing.vue")
      },
      {
        props: true,
        path: "/editRecruit/:id",
        component: () => import("@/views/user/EditRecruit.vue")
      },
      {
        props: true,
        path: "/question/:id",
        component: () => import("@/views/user/Question.vue")
      },
      {
        path: "/addRecruit",
        component: () => import("@/views/user/AddRecruit.vue")
      },
      {
        path: "/searchBlog",
        component: () => import("@/views/user/SearchBlog.vue")
      },
      {
        path: "/searchSchool",
        component: () => import("@/views/user/SearchSchool.vue")
      },
      {
        path: "/searchRecruit",
        component: () => import("@/views/user/SearchRecruit.vue")
      },
      {
        path: "/searchInterviewExperience",
        component: () => import("@/views/user/SearchInterviewExperience.vue")
      },
      { path: "/interviewExperienceList", component: () => import("@/views/user/InterviewExperienceList.vue") }
      ,
      { path: "/schoolList", component: () => import("@/views/user/SchoolList.vue") },
      {
        path: "/interviews",
        component: () => import("@/views/user/Interview.vue")
      },
      {
        props: true,
        path: "/interviewing/:id",
        component: () => import("@/views/user/Interviewing.vue")
      },
      {
        path: "/boards",
        component: () => import("@/views/user/Board.vue")
      }
    ]
  }
];
const userRole = "534bcf636cf6cb0cf6";
const adminRole = "4bcbb36cf4cf63bc4b";

export function updateRoutes() {
  switch (sessionStorage.getItem("role")) {
    case adminRole:
      router.addRoutes(adminRouts);
      router.addRoutes(userRouts);
      break;
    case userRole:
      router.addRoutes(userRouts);
      break;
  }
}
updateRoutes();
