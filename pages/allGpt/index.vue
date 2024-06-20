<template >
  <div
    style="
      height: auto;
      width: 100%;
      background-color: #121212;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
  <navhead></navhead>
    <div
  class="lunbotuOuter"
  style="
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  "
>
  <el-carousel style="width: 100%;height: 500px;" >
    <el-carousel-item style="width: 100%;height: 500px;" v-for="(item,index) in ImgList" :key="index">
      <img style="width: 100%; height: 100%;  object-fit:fill ;" :src="item.url" alt="" />
    </el-carousel-item>
  </el-carousel>
</div>
    <div
          style="
            display: flex;
            align-items: center;
            width: 800px;
            height: 58px;
            border-radius: 80px;
            border:1px solid rgba(255,255,255,.5);
            background-color: #121212;
            margin-top: 53px;
          "
        >
          <input
            style="background-color: #121212;color: white; outline: none;height: 80%;caret-color:rgba(255,255,255,.5);margin-left:30px;width: 81%;
"
            v-model="message"
            placeholder="请输入所需要的 GPT"
          /><el-button
            style="width: 105px; height: 43px;border-radius: 40px;margin-left: 2px;"
            type="primary"
            class="button"
            @click="searchdata"
            >搜索</el-button
          >
        </div>
    <div
      style="display: flex; align-items: center; width: 80%; flex-wrap: wrap;margin-top: 70px;      background-color: #121212;
"
    >
      <el-card
      
      class="qr-code"
      v-for="(item,index) in allgptDate" :key="index"
      @click="togpt(item.id)"
        style="
          margin: 20px;
          height: 300px;
          width: 350px;
          background-color: aliceblue;
          border-radius: 50px;
          cursor: pointer;
        "
      >
        <div style="display: flex; align-items: center">
          <img
            :src="item.avatar"
            style="width: 120px; height: 120px; border-radius: 50%"
            alt=""
          />
          <!-- <el-avatar :size="120" style="padding: 10px;"  :src="head"/> -->
          <h1 style="font-size: 20px; padding: 20px; font-weight: 700">
            {{item.name}}
          </h1>
          
        </div>
        <div
          class="font_famili"
          style="font-size: 17px; margin-top: 30px; font-weight: 500"
        >
        {{ item.description }}
        </div>
      </el-card>

    </div>
    <PageEnd></PageEnd>
  </div>
</template>
  
  <script>
import { ref, onMounted, onUnmounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios"

export default {
  data() {
    return {
      head: "http://47.93.14.224:80/ac4e4701-64a7-4dfd-8634-53c5aead82d0.jpg",
      projectName: "",
      isselect: 1,
      imageUrl: [
        {
          url: "http://47.93.14.224:80/110ce3e2-7f53-48c5-a53d-9869cbc31828.jpg",
        },
        {
          url: "http://47.93.14.224:80/110ce3e2-7f53-48c5-a53d-9869cbc31828.jpg",
        },
        {
          url: "http://47.93.14.224:80/110ce3e2-7f53-48c5-a53d-9869cbc31828.jpg",
        },

      ],
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
    togpt(gptid){
      localStorage.setItem("gptid", gptid);

      this.$router.push('Introduction')

    }

  },

  setup() {
    const navOpacity = ref(0);
    const allgptDate = ref([]);
    const ImgList = ref([]);
    const message = ref("");
    const handleScroll = () => {
      let scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 计算透明度
      navOpacity.value = Math.min(scrollTop / 200, 1); // 这里的100可以根据实际需求调整
    };
    const getallgptDate = () => {
      axios.get('http://47.93.14.224:8081/GPT/GetGPTList')
  .then(function (response) {
    console.log(response)
    allgptDate.value = response.data.data
    console.log(allgptDate.value[0])
  })
  .catch(function (error) {
    console.log(error);
  });
    };

    const getCImgList = () => {
      axios.get('http://47.93.14.224:8081/index/getCImgList')
  .then(function (response) {
    console.log(response)
    ImgList.value = response.data.data
    console.log(ImgList.value[0])
  })
  .catch(function (error) {
    console.log(error);
  });
    };
    // methods 中的函数
    const searchdata = () => {
      axios.get('http://47.93.14.224:8081/index/search?keyword=' + message.value)
        .then((response) => {
          console.log(response);
          allgptDate.value = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      getallgptDate()
      getCImgList()
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      navOpacity,
      Search,
      allgptDate,ImgList,searchdata,message,
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
  height: 108vh;
  /* background-color: aqua; */
  /* background-image: url(../assets/image/bg.png); */
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


.qr-code:hover {
		transform: scale(1.1);
		transition: all .3s;
	}
</style>
  
  
  