<template >
  <div
    style="
      height: 2400px;
      width: 100%;
      background-color: #121212;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <div class="banner1">
      <navhead></navhead>
      <div class="GPTOUTER">
        <h1 class="GPTtitle">Hi! Welcome to GPTFair !!!</h1>
        <div class="GPTdetails">
          GPTFair是一个综合性的在线平台，专门设计用于集中展示和提供多种基于GPT模型的应用工具。这个平台的目标是为用户提供一个直观、易于导航的界面，通过简化用户对各种GPT应用的访问过程，使得用户可以无缝地探索和使用这些工具。无论是撰写文章、生成代码、进行市场分析还是提供客户支持，GPTFair都能提供相应的解决方案。
        </div>
        <div class="ToGPT">Let's Connect</div>
      </div>
    </div>

    <div
      class="lunbotuOuter"
      style="
        height: 550px;
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
      "
    >
      <div
        style="
          height: 550px;
          width: 85%;
          background-color: black;
          border-radius: 80px;
          position: absolute;
          top: -40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <h2 class="produce" style="margin-top: 30px">GPT</h2>

        <div class="intro">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text.
        </div>
        <div style="width: 800px; height: 300px; background-color: aliceblue">
          <el-carousel style="width: 100%">
            <el-carousel-item
              style="width: 100%"
              v-for="item in ImgList"
              :key="item"
            >
              <img :src="item.url" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <h2 class="produce animated zoomIn">Projects</h2>

    <div class="intro">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </div>
    <div
      style="
        border: 1px solid white;
        border-radius: 40px;
        width: 900px;
        height: 56px;
        display: flex;
        align-items: center;
        color: white;
        cursor: pointer;
      "
    >
      <div
        class="beijing"
        :class="isselect == 1 ? 'toumdu' : ''"
        @click="toGround(1)"
        style="
          width: 300px;
          height: 100%;
          background-color: black;
          border-radius: 40px 0 0 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <p>{{ gptGroupList[0]?.groupName }}</p>
      </div>
      <div
        class="beijing"
        :class="isselect == 2 ? 'toumdu' : ''"
        @click="toGround(2)"
        style="
          width: 300px;
          height: 100%;
          background-color: black;
          border-left: 1px solid white;
          border-right: 1px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        {{ gptGroupList[1]?.groupName }}
      </div>
      <div
        class="beijing"
        :class="isselect == 3 ? 'toumdu' : ''"
        @click="toGround(3)"
        style="
          width: 300px;
          height: 100%;
          background-color: black;
          border-radius: 0 40px 40px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        {{ gptGroupList[2]?.groupName }}
      </div>
    </div>
    <div
      style="
        width: 1200px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 50px;
      "
    >
      <el-card
        style="
          height: 100%;
          width: 350px;
          background-color: aliceblue;
          border-radius: 50px;
          cursor: pointer;
        "
        @click="togpt(gptGroupList[isselect-1]?.groupIdList[0].id)"
      >
        <div style="display: flex; align-items: center">
          <img
            :src="gptGroupList[isselect-1]?.groupIdList[0].avatar"
            style="width: 120px; height: 120px; border-radius: 50%"
            alt=""
          />

          <!-- <el-avatar :size="120" style="padding: 10px;"  :src="head"/> -->
          <h1 style="font-size: 20px; padding: 20px; font-weight: 700">
            {{ gptGroupList[isselect-1]?.groupIdList[0].name }}
          </h1>
        </div>
        <div
          class="font_famili"
          style="font-size: 17px; margin-top: 30px; font-weight: 500"
        >
        {{ gptGroupList[isselect-1]?.groupIdList[0].description }}
      </div>
      </el-card>
      <el-card
      @click="togpt(gptGroupList[isselect-1]?.groupIdList[1].id)"
        style="
          height: 100%;
          width: 350px;
          background-color: aliceblue;
          border-radius: 50px;
          cursor: pointer;
        "
      >
        <div style="display: flex; align-items: center">
          <img
            :src="gptGroupList[isselect-1]?.groupIdList[1].avatar"
            style="width: 120px; height: 120px; border-radius: 50%"
            alt=""
          />
          <!-- <el-avatar :size="120" style="padding: 10px;"  :src="head"/> -->
          <h1 style="font-size: 20px; padding: 20px; font-weight: 700">
            {{ gptGroupList[isselect-1]?.groupIdList[1].name }}
          </h1>
        </div>
        <div
          class="font_famili"
          style="font-size: 17px; margin-top: 30px; font-weight: 500"
        >
        {{ gptGroupList[isselect-1]?.groupIdList[1].description }}
      </div>
      </el-card>
      <el-card
      @click="togpt(gptGroupList[isselect-1]?.groupIdList[2].id)"
        style="
          height: 100%;
          width: 350px;
          background-color: aliceblue;
          border-radius: 50px;
          cursor: pointer;
        "
      >
        <div style="display: flex; align-items: center">
          <img
            :src="gptGroupList[isselect-1]?.groupIdList[2].avatar"
            style="width: 120px; height: 120px; border-radius: 50%"
            alt=""
          />
          <!-- <el-avatar :size="120" style="padding: 10px;"  :src="head"/> -->
          <h1 style="font-size: 20px; padding: 20px; font-weight: 700">
            {{ gptGroupList[isselect-1]?.groupIdList[2].name }}
          </h1>
        </div>
        <div
          class="font_famili"
          style="font-size: 17px; margin-top: 30px; font-weight: 500"
        >
        {{ gptGroupList[isselect-1]?.groupIdList[2].description }}
      </div>
      </el-card>
    </div>
    <PageEnd></PageEnd>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";

export default {
  data() {
    return {
      isLogin: true,
      headimg:
        "http://47.236.235.78:80/ac4e4701-64a7-4dfd-8634-53c5aead82d0.jpg",
      head: "http://47.236.235.78:80/ac4e4701-64a7-4dfd-8634-53c5aead82d0.jpg",
      projectName: "",
      isselect: 1,
    };
  },
  methods: {
    keyDown() {
      // 登陆
    },
        togpt(gptid){
      localStorage.setItem("gptid", gptid);

      this.$router.push('Introduction')

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
  },

  setup() {
    const navOpacity = ref(0);
    const ImgList = ref([]);
    const gptGroupList = ref([]);
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
        .get("http://47.93.14.224:8081/index/getCImgList")
        .then(function (response) {
          console.log(response);
          ImgList.value = response.data.data;
          console.log(ImgList.value[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const GetgptGroupList = () => {
      axios
        .get("http://47.93.14.224:8081/GPT/GetgptGroupListPlus")
        .then(function (response) {
          console.log(response);
          gptGroupList.value = response.data.data;
          let responsearr = response.data.data;
          console.log(responsearr)
          console.log("gptGroupList.value", gptGroupList.value);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    onBeforeMount(() => {
      GetgptGroupList();
    });

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      getCImgList();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      navOpacity,
      Search,
      ImgList,
      gptGroupList,
    };
  },
};
</script>

<style scoped>
.pagesEnd{
  /* background: no-repeat url(../assets/image/color-sharp.webp); */
  background-position: 0;
}
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
/* 轮播图区域 */
.lunbotuOuter {
  background: no-repeat url(../assets/image/color-sharp.webp);
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
  /* background-color: aqua; */
  background-image: url(../assets/image/bg.png);
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


