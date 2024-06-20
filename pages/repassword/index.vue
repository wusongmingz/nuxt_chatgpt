<template >
    <div
      style="
        min-height: 100vh;
        width: 100%;
        background-color: #121212;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <div class="banner1">
        <navhead></navhead>
        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          "
        >
          <el-card style="min-width: 480px">
            <el-form ref="form" :model="formLabelAlign" :rules="rules">
              <el-form-item>
                <h1 style="font-weight: 700px;font-size: 22px;">重置密码</h1>
              </el-form-item>
              <el-form-item
                class="getcode"
                prop="username"
                style="
                  margin-top: 50px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <el-input
                  label-width="auto"
                  v-model="formLabelAlign.name"
                  placeholder="请输入邮箱"
                  :prefix-icon="User"
                />
                <el-button type="primary" style="margin-top: 20px; height: 42px" @click="getcode()"
                  >获取验证码</el-button
                >
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="formLabelAlign.password"
                  type="password"
                  placeholder="请输入密码"
                  show-password
                  :prefix-icon="Lock"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="formLabelAlign.code"
                  placeholder="请输入验证码"
                  :prefix-icon="Lock"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  style="width: 100%; height: 43px"
                  type="primary"
                  class="button"
                  @click="resetps"
                  >重置密码</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-link type="info" :underline="false" @click="tologin"
                  >登陆 →</el-link
                >
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
      <PageEnd></PageEnd>
    </div>
  </template>
      
      <script>
  import { ref, onMounted, onUnmounted } from "vue";
  import { User, Lock } from "@element-plus/icons-vue";
  import axios from "axios";

  
  export default {
    data() {
      return {
        formLabelAlign: {
          name: "",
          password: "",
          code:""
        },
        isselect: 1,
        imageUrl: [
          {
            url: "http://www.gengdan.cn/wp-content/uploads/2023/03/2023030921323441.jpg",
          },
          {
            url: "http://www.gengdan.cn/wp-content/uploads/2023/03/2023030921333114.jpg",
          },
          {
            url: "http://www.gengdan.cn/wp-content/uploads/2023/03/2023030921323441.jpg",
          },
          {
            url: "http://www.gengdan.cn/wp-content/uploads/2023/03/2023030921325368.jpg",
          },
        ],
      };
    },
    methods: {
      register() {
        this.$router.push("register");
      },
      tologin() {
        this.$router.push("login");
      },
getcode(){
  let email = this.formLabelAlign.name;
  // 正则表达式验证邮箱格式
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
  if(emailPattern.test(email)){
    axios
      .post("http://47.93.14.224:8081/user/sendAuthCodeEmail?email="+email)
      .then(function (response) {
        if(response.data.success){
          ElMessage({
            message: '获取验证码成功',
            type: 'success',
          });
        }else{
          ElMessage.error('请检查网络');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }else{
    // 邮箱格式不正确，提示用户
    ElMessage.error('请输入正确的邮箱格式');
  }
},

      resetps(){
      let parama = {
    code: this.formLabelAlign.code,
    email: this.formLabelAlign.email,
    password: this.formLabelAlign.password,
    account: this.formLabelAlign.email
}
console.log(parama)
      axios
        .get("http://47.93.14.224:8081/user/resetPassword?email="+this.formLabelAlign.name+"&authCode="+this.formLabelAlign.code+"&newPassword="+this.formLabelAlign.password)
        .then(function (response) {
          console.log(response)
          if(response.data.success){
            ElMessage({
    message: '重置密码成功',
    type: 'success',
  })
  this.$router.push("login")
          }else{
            ElMessage.error(response.data.errorMsg)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    },
  
    setup() {
      const navOpacity = ref(0);
  
      const handleScroll = () => {
        let scrollTop =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        // 计算透明度
        navOpacity.value = Math.min(scrollTop / 200, 1); // 这里的100可以根据实际需求调整
      };
  
      onMounted(() => {
        window.addEventListener("scroll", handleScroll);
      });
  
      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
      });
  
      return {
        navOpacity,
        User,
        Lock,
      };
    },
  };
  </script>
      
      <style scoped>
  .GptAll {
    font-size: 18px;
    font-weight: 400;
    color: white;
    font-family: "Centra", sans-serif !important;
    margin-right: 20px;
  }
  
  .produce {
    margin-top: 60px;
    font-size: 45px;
    font-weight: 700;
    text-align: center;
    color: white;
    font-family: "Centra", sans-serif !important;
  }
  .intro {
    color: #b8b8b8;
    font-size: 22px;
    letter-spacing: 0.8px;
    line-height: 1.5em;
    margin: 14px auto 30px auto;
    text-align: center;
    width: 56%;
    font-family: "Centra", sans-serif !important;
  }
  
  /* 标题 */
  .GPTtitle {
    font-size: 65px;
    font-family: "Centra", sans-serif !important;
  }
  .GPTdetails {
    font-family: "Centra", sans-serif !important;
    color: #b8b8b8;
    font-size: 18px;
    margin-top: 10px;
  }
  .GPTOUTER {
    width: 746px;
    color: white;
    font-family: "Centra", sans-serif !important;
    padding-left: 100px;
    padding-top: 181px;
  }
  .ToGPT {
    font-family: "Centra", sans-serif !important;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    margin-top: 60px;
    letter-spacing: 0.8px;
  }
  
  .banner1 {
    width: 100%;
    height: 100vh;
  }
  #app {
    width: 100%;
  }
  .TOPmenu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
  }
  
  html,
  body {
    width: 100%;
  }
  
  .toumdu {
    background: rgba(164, 54, 128, 1);
    background: -moz-linear-gradient(
      left,
      rgba(164, 54, 128, 1) 0%,
      rgba(84, 48, 182, 1) 100%
    );
    background: -webkit-gradient(
      left top,
      right top,
      color-stop(0%, rgba(164, 54, 128, 1)),
      color-stop(100%, rgba(84, 48, 182, 1))
    );
    background: -webkit-linear-gradient(
      left,
      rgba(164, 54, 128, 1) 0%,
      rgba(84, 48, 182, 1) 100%
    );
    background: -o-linear-gradient(
      left,
      rgba(164, 54, 128, 1) 0%,
      rgba(84, 48, 182, 1) 100%
    );
    background: -ms-linear-gradient(
      left,
      rgba(164, 54, 128, 1) 0%,
      rgba(84, 48, 182, 1) 100%
    );
    background: linear-gradient(
      to right,
      rgba(164, 54, 128, 1) 0%,
      rgba(84, 48, 182, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a43680', endColorstr='#5430b6', GradientType=1 );
  }
  
  .beijing {
    background-color: black;
  }
  
  .font_famili {
    font-family: "Centra", sans-serif !important;
  }
  /* 改高度 */
  
  :deep .el-input__inner {
    height: 45px;
  }
  </style>
      
      
      