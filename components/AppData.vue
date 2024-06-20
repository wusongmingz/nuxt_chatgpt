<template>
    <button
        @click="importAppData"
        class="flex items-center gap-1 text-white/60 transition duration-300 hover:text-white/80"
        :disabled="!!processingController"
        :class="{ 'cursor-not-allowed': !!processingController }"
    >
        <!-- <Icon class="w-4 h-4" name="bx:bx-import" />
        Import -->
    </button>
    <button @click="ReturnHome" class="flex items-center gap-1 text-white/60 transition duration-300 hover:text-white/80">
        <Icon class="w-4 h-4" name="heroicons-solid:arrow-left" />
        Return Home
    </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useConversationsStore } from '@/stores/conversations'; // 请根据实际路径进行引入修改
import { storeToRefs } from 'pinia';

const conversationsStore = useConversationsStore();
const {
    processingController,
} = storeToRefs(conversationsStore);

const router = useRouter();

const importAppData = () => {
    if (processingController.value) {
        return;
    }
    // 实现importAppData逻辑
};

const exportAppData = () => {
    if (processingController.value) {
        return;
    }
    // 实现exportAppData逻辑
};

const ReturnHome = () => {
    router.push('/');
};
</script>
