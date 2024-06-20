<template  >
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
    <div
      class="banner1"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <navhead></navhead>
      <div style="width: 70%; border-radius: 40px">
        <el-container style="height: 70vh">
          <el-aside width="200px" >
            <el-menu
              width="200px"
              style="
                height: 100%;
                border-radius: 40px 0 0 40px;
                background-color: aliceblue;
                overflow: hidden;
              "
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              @select="handeleSelect"
            >
              <el-menu-item index="1">
                <el-icon><icon-menu /></el-icon>
                <span>个人信息</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>充值界面</span>
              </el-menu-item>
              <!-- <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item> -->
            </el-menu>
          </el-aside>
          <el-main
            style="
              background-color: aliceblue;
              height: 100;
              border-radius: 0 40px 40px 0;
            "
          >
            <div v-if="defaultActive == '1'">
              <el-text class="mx-1" size="large">我的信息</el-text>
              <el-form
                :model="form"
                label-width="auto"
                style="max-width: 600px; padding: 20px"
              >
                <el-form-item label="头像：" style="">
                  <img
                    :src="personInfo.icon"
                    style="
                      width: 100px;
                      height: 100px;
                      border-radius: 50%;
                      margin-right: 70px;
                    "
                    alt=""
                  />
                </el-form-item>

                <el-form-item label="昵称：">
                  <!-- <div style="width: 200px">
                    <el-input v-model="form.nickname" />
                  </div> -->
                  <el-text class="mx-1">{{ personInfo.nickname }}</el-text>
                </el-form-item>
                <el-form-item label="账号：">
                  <el-text class="mx-1">{{ personInfo.account }}</el-text>
                </el-form-item>
                <el-form-item style="margin-top: 80px">
                  <el-button size="large" type="primary" @click="uplogin"
                    >退出登陆</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div v-if="defaultActive == '2'">
              <el-text class="mx-1" size="large">充值界面</el-text>

              <div
                style="
                  width: 90%;
                  padding: 2% 5%;
                  display: flex;
                  align-items: center;
                "
              >
                <el-text class="mx-1" size="large">剩余余额：</el-text>
                <el-text
                  class="mx-1"
                  size="large"
                  style="
                    font-size: 30px;
                    margin-left: 20px;
                    font-weight: 500;
                    color: #409eff;
                  "
                  >￥{{personInfo.balance}}</el-text
                >
              </div>

              <div style="width: 90%; padding: 0% 5%">
                <el-text class="mx-1" size="large">充值套餐</el-text>
                <div
                  style="
                    width: 80%;
                    padding: 1%;
                    display: flex;
                    align-items: center;
                  "
                >
                  <div
                    style="
                      padding: 10px;
                      margin: 10px;
                      width: 90px;
                      border: 1px #d5d2cc solid;
                      border-radius: 10px;
                      height: 70px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                    "
                    @click="tozfb(29.9)"
                  >
                    <div>
                      <p style="color: red; font-size: large">29.9元</p>
                      <p style="text-decoration: line-through">112</p>
                    </div>
                  </div>

                  <div
                    style="
                      padding: 10px;
                      margin: 10px;
                      width: 90px;
                      border: 1px #d5d2cc solid;
                      border-radius: 10px;
                      height: 70px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                      position: relative;
                    "
                  >
                    <div>
                      <div
                        style="
                          display: flex;
                          align-content: center;
                          justify-content: center;
                          background-color: red;
                          color: white;
                          border-radius: 10px;
                          position: absolute;
                          right: -13px;
                          bottom: 52px;
                        "
                        @click="tozfb(59.9)"
                      >
                        <p>HOT</p>
                      </div>
                      <p style="color: red; font-size: large">59.9元</p>
                      <p style="text-decoration: line-through">126</p>
                    </div>
                  </div>
                  <div
                    style="
                      padding: 10px;
                      margin: 10px;
                      width: 90px;
                      border: 1px #d5d2cc solid;
                      border-radius: 10px;
                      height: 70px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                    "
                    @click="tozfb(99.9)"
                  >
                    <div>
                      <p style="color: red; font-size: large">99.9元</p>
                      <p style="text-decoration: line-through">210</p>
                    </div>
                  </div>
                  <div
                    style="
                      padding: 10px;
                      margin: 10px;
                      width: 90px;
                      border: 1px #d5d2cc solid;
                      border-radius: 10px;
                      height: 70px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                    "
                    @click="tozfb(299.9)"
                  >
                    <div>
                      <p style="color: red; font-size: large">299.9元</p>
                      <p style="text-decoration: line-through">660</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>

    <PageEnd></PageEnd>
  </div>
</template>
  
  <script>
import { ref, onMounted, onUnmounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";

export default {
  data() {
    return {
      isLogin: false,
      headimg:
        "http://47.93.14.224:80/ac4e4701-64a7-4dfd-8634-53c5aead82d0.jpg",
      head: "http://47.93.14.224:80/ac4e4701-64a7-4dfd-8634-53c5aead82d0.jpg",
      projectName: "",
      isselect: 1,
      form: {
        nickname: "小菜",
        account: "13421589651@163.com",
      },
      defaultActive: "1",
    };
  },
  methods: {
    uplogin(){
      localStorage.removeItem("token")
      localStorage.removeItem("gptid")
      this.$router.push("/")
      ElMessage({
    message: '退出成功',
    type: 'success',
  })
    },
    tozfb(num){
      axios
        .get("http://47.93.14.224:8081/pay?email="+this.personInfo.account+"&money="+num)
        .then(function (response) {
          console.log(response)
          const returnUrl = window.location.href;
      window.location.href = response.data.body;
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    keyDown() {
      // 登陆
    },
    register() {
      this.$router.push("register");
    },
    tologin() {
      this.$router.push("login");
    },
    toGround(tab) {
      this.isselect = tab;
      console.log(tab);
    },
    handeleSelect(key, keyPath) {
      this.defaultActive = key;
      console.log(this.defaultActive);
    },
  },

  setup() {
    const navOpacity = ref(0);
    const personInfo = ref({});
    const handleScroll = () => {
      let scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 计算透明度
      navOpacity.value = Math.min(scrollTop / 200, 1); // 这里的100可以根据实际需求调整
    };
    const getCImgList = () => {
      axios
        .get("http://47.93.14.224:8081/user/me",{headers: {token:localStorage.getItem("token")}})
        .then(function (response) {
          
          console.log(response);
          personInfo.value = response.data.data;
          console.log(personInfo);
          localStorage.setItem("icon", response.data.data.icon);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      getCImgList()
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      navOpacity,
      Search,
      personInfo
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
  font-weight: 700;
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
  height: 108vh;
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
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
</style>
  
  
  