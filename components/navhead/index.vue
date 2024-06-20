<template>
  <nav
    :style="{ backgroundColor: `rgba(0, 0, 0, ${navOpacity})` }"
    style="
      position: sticky;
      top: 0px;
      width: 100%;
      height: 100px;
      z-index: 9999;
    "
    class="TOPmenu"
  >
    <img
      src="../../assets/image/logo.png"
      alt=""
      style="height: 90%; margin-left: 50px"
    />
    <div style="display: flex; align-items: center; height: 100%">
      <div class="GptAll" style="cursor: pointer" @click="$router.push('/')">
        主页
      </div>
      <div
        class="GptAll"
        style="cursor: pointer"
        @click="$router.push('allGpt')"
      >
        GPT 产品
      </div>
      <!-- <div style="width: 200px;margin-right: 20px;">
    <el-input
    @keydown.enter="keyDown()" 
    :prefix-icon="Search"
      v-model="projectName"
      @input="inputChange"
      @focus="inputFocusFn"
      @blur="inputBlurFn"
      placeholder="请输入 GPT 名称"
      clearable
    ></el-input></div> -->

      <div
        v-if="!isLogin"
        @click="register"
        style="
          height: 48px;
          width: 100px;
          display: flex;
          align-items: center;
          border: 1px solid white;
          justify-content: center;
          border-radius: 5px;
          margin-right: 16px;
          font-weight: 700;
          cursor: pointer;
        "
      >
        <p>注册</p>
      </div>
      <div
        v-if="!isLogin"
        style="
          height: 48px;
          width: 100px;
          display: flex;
          align-items: center;
          border: 1px solid white;
          justify-content: center;
          border-radius: 5px;
          margin-right: 70px;
          font-weight: 700;
          cursor: pointer;
        "
        @click="tologin"
      >
        <p>登陆</p>
      </div>
      <img
        v-if="isLogin"
        @click="$router.push('person')"
        :src="headimg"
        style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 70px;
        "
        alt=""
      />
    </div>
  </nav>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import { Search } from "@element-plus/icons-vue";

export default {
  data() {
    return {
      isLogin: localStorage.getItem("token"),
      headimg: localStorage.getItem("icon"),
      head: localStorage.getItem("icon"),
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
      Search,
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


