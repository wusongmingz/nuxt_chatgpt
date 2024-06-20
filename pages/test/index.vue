<template>
  <div>
    <!-- 显示弹窗的按钮 -->
    <el-button @click="axiosFastInfo">发送请求</el-button>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { ElNotification } from 'element-plus';

export default {
  setup() {
    const axiosFastInfo = async () => {
      try {
        // 发送请求
        const response = await axios.get('http://example.com/api/data');
        // 处理响应数据
        console.log('请求成功', response.data);
      } catch (error) {
        console.error('请求失败', error);
        // 显示错误提示消息
        showErrorNotification();
      }
    };

    const showErrorNotification = () => {
      // 显示错误提示消息
      ElNotification.error({
        title: '错误',
        message: '余额不足'
      });
    };

    return { axiosFastInfo };
  }
};
</script>
