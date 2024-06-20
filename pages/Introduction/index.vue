<script>
import axios from "axios"
export default {
  data() {
    return {
      gptName: '', // Initialize a data property to store the fetched content
      description:'',
      imageURL:'',
      showModal: false, // 控制分享弹窗的显示与隐藏
      pageLink: window.location.href // 存储当前页面链接
    }
  },
  methods: {
    async startChat() {
      // 点击按钮后的逻辑，可以跳转到与AI的谈话页面
      try {
        const tokens = localStorage.getItem('token')
        console.log(tokens)
        if (!tokens) {
      // 如果token为空，重定向到登录页面，并弹出提示框
          this.$router.push('/login');
          alert('使用前请先登录');
          return; // 结束函数执行
        }
        // 这里假设你有一个检查用户登录状态的接口，比如 '/api/checkLoginStatus'
        const response = await axios.get('http://47.93.14.224:8081/user/me',{
          headers:{
            token:tokens
          }
        });
        
        if (response.status === 200) {
          // 用户已登录，执行正常跳转
          this.$router.push('/Chat');
        } else {
          // 用户未登录，重定向到登录页面，并弹出提示框
          this.$router.push('/login');
          alert('使用前请先登录');
        }
      } catch (error) {
        console.error('Error occurred while checking login status:', error);
      }
    
    },
    refreshPageIfNeeded() {
      const lastVisit = localStorage.getItem('lastVisit');
      const currentTime = new Date().getTime();
      if (!lastVisit || currentTime - lastVisit > 3000) { // Refresh if last visit time is not stored or if it's been more than 1 minute
        localStorage.setItem('lastVisit', currentTime);
        window.location.reload();
      }
    },
    handlePopstate() {
      // 在用户回退时执行页面刷新
      window.location.reload();
    },
    async axiosGptid() {
      try {
        const ids = localStorage.getItem("gptid")
        console.log(ids)
        const response = await axios.get('http://47.93.14.224:8081/GPT/GetOneGPT', {
          params: {
            id: ids,
          }
        });
        // Handle response data here
        console.log('Response data:', response.data.data);
        this.gptName = response.data.data.name;
        this.description = response.data.data.description
        this.imageURL = response.data.data.descriptionimg

      } catch (error) {
        // Handle errors here
        console.error('Error occurred while fetching data:', error);
      }
    },

    async getShareLink(){
  try {
    // 获取 Gptid
    const axiosGptid = async () => {
      try {
        const response = await axios.get('http://47.93.14.224:8081/GPT/GetOneGPT', {
          params: {
            id: localStorage.getItem("gptid"),
          }
        });
        // 处理响应数据
        console.log('Gptid 响应数据：', response.data.data.appid);
        return response.data.data.appid;
      } catch (error) {
        // 处理错误
        console.error('Gptid获取数据时出错：', error);
        throw error; // 抛出错误以便调用者处理
      }
    };
    const id = await axiosGptid(); // 等待 axiosGptid 函数执行完成并获取结果

    // 获取 token
    const tokens = localStorage.getItem("token");
    console.log(id, tokens);

    // 使用获取的 Gptid 发送请求获取分享链接
    const response = await axios.get('http://47.93.14.224:8081/index/share', {
      params: {
        appid: id
      },
      headers: {
        token: tokens
      }
    });
    console.log(response.data.data);
    return response.data.data;
  } catch(error) {
    console.error('获取分享链接时出错：', error);
    throw error; // 抛出错误以便调用者处理
  }
}
,
    shareLink() {

      // 调用 getShareLink() 函数并处理返回的 Promise 对象
      this.getShareLink().then(link => {
        console.log(link);
        this.pageLink = link;
        // 显示分享弹窗
        this.showModal = true;
      }).catch(error => {
        console.error('获取分享链接时出错：', error);
        // 在这里处理错误
      });
    },
    // 隐藏分享弹窗
    hideShareModal() {
      this.showModal = false;
    },
    // 复制链接
    copyLink() {
      const input = document.createElement('input');
      input.setAttribute('value', this.pageLink);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert('链接已复制到剪贴板');
    }
    
  },
  mounted() {
    this.refreshPageIfNeeded(); // 在页面加载时检查是否需要刷新
    window.addEventListener('popstate', this.handlePopstate);
    this.axiosGptid()
  },
  beforeDestroy() {
    // 组件销毁时移除事件监听
    window.removeEventListener('popstate', this.handlePopstate);
  }
}
</script>

<template>
  <div class="gpt-detail" style="background-color: white; display: flex;">
    <div class="gpt-content" style="flex: 1; padding: 40px; margin: 40px;">
      <h2 style="font-weight: bold; margin-bottom: 20px;">{{ gptName }}</h2>
      <p style="margin-bottom: 20px;">{{ description }}<hr></p>
      <button @click="startChat" style="background-color: blue; color: white; padding: 10px 20px; border: none; cursor: pointer;">开始GPT聊天</button>
      <button @click="shareLink" style="background-color: green; color: white; padding: 10px 20px; border: none; cursor: pointer; margin-left: 10px;">分享GPT</button>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="hideShareModal">&times;</span>
          <p>分享链接:</p>
          <input type="text" :value="pageLink" readonly>
          <button @click="copyLink">复制链接</button>
        </div>
      </div>

    </div>
    <div class="gpt-image" style="flex: 1;">
      <!-- 添加右侧图片元素 --> 
      <img :src="imageURL" alt="GPT 图片">
    </div>
  </div>
  <div style="flex: 1; background-color: white;"></div>
</template>

<style scoped>
.modal-content input[type="text"] {
  background-color: #f2f2f2; /* 弹窗链接地址的背景色 */
  padding: 10px; /* 添加内边距 */
  border-radius: 5px; /* 圆角 */
  width: calc(100% - 20px); /* 让输入框宽度占据弹窗内容的宽度减去内边距 */
  margin-bottom: 10px; /* 添加底部间距 */
}
button {
  background-color: #4CAF50; /* 按钮背景色 */
  color: white; /* 文本颜色 */
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px; /* 圆角 */
}

button:hover {
  background-color: #45a049; /* 鼠标悬停时按钮背景色变化 */
}

/* 根据需求自由发挥样式布局，设置各个部分的位置、字体等样式 */
.gpt-detail {
  background-color: white;
  display: flex;
  justify-content: flex-start; /* 整体左对齐 */
}

.gpt-content {
  flex: 1;
  padding: 20px;
  text-align: left; /* 内容左对齐 */
}

.gpt-content h2 {
  text-align: left;
  font-weight: bold;
  color: #333;
  font-size: 44px; /* 设置标题字体大小为24px */
}

.gpt-content p {
  color: #666;
  font-size: 26px; /* 设置正文字体大小为16px */
}

.gpt-image img {
  max-width: 80%; /* 设置图片宽度为父元素宽度的百分比 */
  height: auto; /* 高度自适应宽度变化 */
  padding-top: 40px; /* 添加顶部边距 */
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

</style>

 