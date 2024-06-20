<script setup>
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import hljs from 'highlight.js';
import { storeToRefs } from 'pinia';
import BingIcon from '~/components/Icons/BingIcon.vue';
import GPTIcon from '~/components/Icons/GPTIcon.vue';
import axios from "axios"
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

marked.setOptions({
    silent: true,
    xhtml: true,
    breaks: true,
    gfm: true,
});
const renderer = {
    code(code, lang) {
        let language = 'plaintext';
        let highlightedCode;
        try {
            highlightedCode = hljs.highlightAuto(code).value;
        } catch {
            language = hljs.getLanguage(lang) ? lang : 'plaintext';
            highlightedCode = hljs.highlight(code, { language }).value;
        }
        const copyButton = `
<button
    class="absolute right-0 top-0 pt-1 pr-2 font-sans whitespace-normal flex items-center gap-1"
    data-is-copy-button="true"
>
    <svg
        class="w-3 h-3 relative top-px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
    </svg>
    <span class="copy-status">Copy</span>
</button>`.trim();
        return `<pre class="p-0 relative">${copyButton}<code class="hljs${language ? ` language-${language}` : ''}">${highlightedCode}</code></pre>`;
    },
};
marked.use({ renderer });


const presetsStore = usePresetsStore();
const {
    activePresetName,
    activePreset,
} = storeToRefs(presetsStore);


const conversationsStore = useConversationsStore();
const {
    newConversationCounter,
    currentConversation,
    processingController,
} = storeToRefs(conversationsStore);
const {
    updateConversation,
} = conversationsStore;

const isClientDropdownOpen = ref(false);

const messagesContainerElement = ref(null);
const inputContainerElement = ref(null);
const inputTextElement = ref(null);
const chatButtonsContainerElement = ref(null);

const activePresetNameToUse = computed(() => currentConversation.value?.activePresetName || activePresetName.value);
const activePresetToUse = computed(() => currentConversation.value?.activePreset || activePreset.value);
const conversationData = ref(currentConversation.value?.data || {});

// 创建记录数组
const storedArray = JSON.parse(localStorage.getItem('myArray')) || [""];
const messages = ref(currentConversation.value?.messages || []);
onMounted(() => {

    messages.value = storedArray;
    // console.log("导入数据")
});




const message = ref('');
const suggestedResponses = ref([]);
const regenerateData = computed(() => {
    if (!messages.value.length) {
        return {};
    }
    // find last index message where role = user
    const lastUserMessageIndex = messages.value
        .map(_message => _message.role)
        .lastIndexOf('user');
    if (lastUserMessageIndex === -1) {
        // this should never happen
        return {};
    }
    const lastUserMessage = messages.value[lastUserMessageIndex];
    const lastBotMessage = messages.value[lastUserMessageIndex + 1];
    return {
        input: lastUserMessage.text,
        parentMessageId: lastUserMessage.parentMessageId || false,
        userMessageIndex: lastUserMessageIndex,
        botMessageIndex: lastUserMessageIndex + 1,
        canRegenerate: typeof lastBotMessage?.parentMessageId !== 'undefined' && lastBotMessage?.parentMessageId !== null,
    };
});


// compute number of rows for textarea based on message newlines, up to 7
const inputRows = computed(() => {
    const newlines = (message.value.match(/\n/g) || []).length;
    return Math.min(newlines + 1, 7);
});

const scrollToBottom = () => {
    messagesContainerElement.value.scrollTop = messagesContainerElement.value.scrollHeight;
};

const stopProcessing = () => {
    
    if (!processingController.value) {
        return;
    }
    processingController.value.abort();
    processingController.value = null;
    typewriter.stop()

};

const setChatContainerHeight = () => {
    const headerElementHeight = document.querySelector('header').offsetHeight;
    const footerElementHeight = document.querySelector('footer').offsetHeight;
    const inputContainerElementHeight = inputContainerElement.value.offsetHeight;
    const chatButtonsContainerElementHeight = chatButtonsContainerElement.value.offsetHeight;
    const heightOffset = window.document.documentElement.clientHeight - window.innerHeight;
    const containerHeight = window.document.documentElement.clientHeight
        - (headerElementHeight + footerElementHeight)
        - inputContainerElementHeight
        - heightOffset
        - chatButtonsContainerElementHeight
        - 50;
    // set container height
    messagesContainerElement.value.style.height = `${containerHeight}px`;
    // move input container element bottom down
    inputContainerElement.value.style.bottom = `${heightOffset}px`;
    scrollToBottom();
};


class Typewriter {
    constructor() {
        this.content = '';
        this.target = null;
        this.step = 150;
        this.callback = () => {};
        this.interval = null;
        this.index = 0;
        this.end = 0;
        this.stopped = false;
        this.pausedIndex = 0;
        this.operationsCount = 0;
    }

    setContent(content) {
        this.content = content;
        this.end = this.content.length;
        this.operationsCount++;
        return this;
    }

    setTarget(target) {
        this.target = target;
        this.operationsCount++;
        return this;
    }

    setStep(step) {
        this.step = step;
        this.operationsCount++;
        return this;
    }

    setCallback(callback) {
        this.callback = callback;
        this.operationsCount++;
        return this;
    }

    reset() {
        this.content = '';
        this.target = null;
        this.step = 150;
        this.callback = () => {};
        this.interval = null;
        this.index = 0;
        this.end = 0;
        this.stopped = false;
        this.pausedIndex = 0;
        this.operationsCount = 0;
        return this;
    }


    start() {
        if (this.interval) {
            console.log("running");
            return;
        }

        if (this.target == null) {
            console.log("target is null!");
            return;
        }

        this.interval = this.push(this.pausedIndex);

    }

    push() {
        if (this.target == null || this.stopped) return null;

        const timeoutCallback = () => {
            this.callback;
            console.log(this.callback(),0.5)
            this.target.text += this.content.charAt(this.index++);
            if (this.index < this.end) {
                this.push();
            } else {
                this.interval = null;
                // this.reset()
                if (this.index === this.end) {
                    stopProcessing();
                }
            }
        };

        this.interval = setTimeout(timeoutCallback, this.step);
    }

    stop() {
        this.stopped = true;
        clearInterval(this.interval);
        this.interval = null;

    }

    toggleStop() {
        this.stopped = !this.stopped;
        if (this.stopped) {
            this.pausedIndex = this.index; 
            clearInterval(this.interval);
            this.interval = null;
            console.log("Typewriter stopped.");
        } else {
            this.start();
        }
    }

    resume() {
        if (this.stopped) {
            this.toggleStop();
        }

    }
}

let typewriter = new Typewriter();





const sendMessage = async (input, parentMessageId = null) => {

    if (processingController.value) {
        return;
    }
    // 清除输入的首尾空格
    input = input.trim();
    if (!input) {
        return;
    }
    console.log(localStorage.getItem("gptid"),"userId")
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


const getUserId = async () => {
    try {
        const tokens = localStorage.getItem("token")
        console.log("tokens",tokens)
        const response = await axios.get('http://47.93.14.224:8081/user/me', {
            headers:{
                token:tokens
            }
        });
        // 处理响应数据
        console.log('getUserId 响应数据：', response.data.data.id);
        return response.data.data.id;
    } catch (error) {
        // 处理错误
        console.error('getUserId获取数据时出错：', error);
        throw error; // 抛出错误以便调用者处理
    }
};


const getAppid = async () => {
    try {
        const gptid = await axiosGptid(); // 等待 axiosGptid 函数完成并获取结果
        console.log(gptid,"gptid")
        const UserId = await getUserId()
        const response = await axios.get('http://47.93.14.224:8081/index/BeingTalk', {
            params: {
                appid: gptid,
                uid: UserId
            }
        });
        // 处理响应数据
        console.log('axiosappid 响应数据：', response.data.data);
        return response.data.data;
    } catch (error) {
        // 处理错误
        console.error('axiosappid获取数据时出错：', error);
        throw error; // 抛出错误以便调用者处理
    }
};
const axiosFastInfo = async (content) => {
    console.log("请求返回信息")
    try {
        const appid = await getAppid();
        const requestBody = {
            "chatId": appid,
            "stream": false,
            "detail": false,
            "messages": [
                {
                    "content": content,
                    "role": "user"
                }
            ]
        };
        const tokens = localStorage.getItem("token")
        const response = await axios.post('http://47.93.14.224:8081/index/chat', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'apiKey': appid,
                'token':tokens
             //    'apiKey': 'fastgpt-mnkInFt2Lml9S3nX4BgREezgtIH3fdGWBdMfccbmKvH6PQcpNCEfCtLhV',
             //    'token':'9f65207951f14133a1bffcf4e4cf33c7'
            }
        });
            const responseData = response.data.data.choices[0].message.content;
                return responseData;
    } catch (error) {
        console.error('Error return Gptdata:', error);
        stopProcessing()
                // 显示错误提示
        // alert('余额不足');
        const showErrorNotification = () => {
      // 显示错误提示消息
        ElNotification.error({
            title: '错误',
            message: '余额不足'
        });
        };
        showErrorNotification();
        // 处理错误情况...
        return null;

    }

};



    if (parentMessageId !== null) {
        // 根据父消息ID获取对话消息
        messages.value = getMessagesForConversation(messages.value, parentMessageId);
        if (parentMessageId === 'f') {
            // 继续处理逻辑
        }
    }

    if (parentMessageId !== null) {
        // 根据父消息ID获取对话消息
        messages.value = getMessagesForConversation(messages.value, parentMessageId);
        if (parentMessageId === false) {
            delete conversationData.value.parentMessageId;
        } else {
             // 设置会话数据中的父消息ID
            conversationData.value.parentMessageId = parentMessageId;
        }
    }
    // 关闭客户端下拉菜单、清空建议回复、创建处理控制器并重置消息文本框
    isClientDropdownOpen.value = false;
    suggestedResponses.value = [];
    processingController.value = new AbortController();
    message.value = '';

    // 用户消息
    const userMessage = {


        id: 'new',
        parentMessageId: conversationData.value?.parentMessageId || false,
        text: input,
        role: 'user',
    };
    messages.value.push(userMessage);

    await nextTick();
    scrollToBottom();
    // 机器消息
    // const botReturnMessage2 = await axiosFastInfo(input); // 请求返回数据的函数
    // console.log(botReturnMessage2,11111)
    const botReturnMessage = await axiosFastInfo(input); // 请求返回数据的函数
    const botMessage = {
        id: 'bot-new',
        parentMessageId: 'new',
        text: "",
        role: 'bot',
    };
// 111111111111111111111111111111111111111


    // const typewriter = new Typewriter(botReturnMessage, botMessage, 150, () => {
    //     const msg = messages.value.pop();
    //     messages.value.push(msg);
    // });
    // typewriter.start();
   let typewriter2 = new Typewriter();
    typewriter2.setContent(botReturnMessage);
    typewriter2.setTarget(botMessage);
    typewriter2.setStep(100);
    typewriter2.setCallback(() => {
        const msg = messages.value.pop();
        messages.value.push(msg);
    });
    console.log(typewriter2)
    typewriter2.start();
    
    messages.value.push(botMessage);
    console.log([...messages.value])

      // 在网页刷新时，将 storedArray 的数据保存到 messages 中
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('myArray', JSON.stringify(storedArray));
    });
    // 等待下一个UI刷新帧，然后滚动至底部
    typewriter = typewriter2


    await nextTick();
    scrollToBottom();



};



const parseMarkdown = (text, streaming = false) => {
    if (typeof text !== 'string' || text.trim() === '') {
        return ''; // Return empty string if text is not a string or is empty
    }

    text = text.trim();
    let cursorAdded = false;
    // workaround for incomplete code, closing the block if it's not closed
    // First, count occurrences of "```" in the text
    const codeBlockCount = (text.match(/```/g) || []).length;
    const shouldAddClosingBlock = codeBlockCount % 2 === 1 && !text.endsWith('```');
    // If the count is odd and the text doesn't end with "```", add a closing block
    if (shouldAddClosingBlock) {
        if (streaming) {
            text += '█\n```';
            cursorAdded = true;
        } else {
            text += '\n```';
        }
    }
    if (codeBlockCount && !shouldAddClosingBlock) {
        // make sure the last "```" is on a newline
        text = text.replace(/```$/, '\n```');
    }
    if (streaming && !cursorAdded) {
        text += '█';
    }

    try {
        // convert to markdown
        let parsed = marked.parse(text);
        // format Bing's source links more nicely
        // 1. replace "[^1^]" with "[1]" (during progress streams)
        parsed = parsed.replace(/\[\^(\d+)\^]/g, '<strong>[$1]</strong>');
        // 2. replace "^1^" with "[1]" (after the progress stream is done)
        parsed = parsed.replace(/\^(\d+)\^/g, '<strong>[$1]</strong>');

        // Allow the iframe to show the images created by Bing Image Creator.
        return DOMPurify.sanitize(parsed, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'srcdoc'] });
    } catch (err) {
        console.error('ERROR', err);
        return text;
    }
};




if (!process.server) {
    const copyButtonListener = (e) => {
        // check parent elements for `data-is-copy-button` attribute
        let el = e.target;
        while (el) {
            if (el.dataset.isCopyButton) {
                // get sibling code block text
                const codeBlock = el.parentElement.querySelector('code');
                if (!codeBlock) {
                    return;
                }
                // copy text to clipboard
                navigator.clipboard.writeText(codeBlock.innerText);
                // find child element with class `copy-status`
                const copyStatus = el.querySelector('.copy-status');
                if (copyStatus) {
                    // set text to "Copied"
                    copyStatus.innerText = 'Copied';
                    setTimeout(() => {
                        if (!copyStatus) {
                            return;
                        }
                        // set text back to "Copy"
                        copyStatus.innerText = 'Copy';
                    }, 3000);
                }
                return;
            }
            el = el.parentElement;
        }
    };

    onMounted(() => {
        console.log("onMounted");

        window.addEventListener('resize', setChatContainerHeight);
        nextTick(() => {
            setChatContainerHeight();
        });
        // watch for button clicks with attribute `data-clipboard-text`
        document.addEventListener('click', copyButtonListener);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', setChatContainerHeight);
        document.removeEventListener('click', copyButtonListener);
        stopProcessing();
    });

    // watch inputRows for change and call `setChatContainerHeight` to adjust height
    watch(inputRows, () => {
        nextTick(() => {
            setChatContainerHeight();
        });
    });

    watch(messages, () => {
        console.log("onWatchMessages");
    })

    watch(isClientDropdownOpen, () => {
        nextTick(() => {
            setChatContainerHeight();
        });
    });

    watch(currentConversation, (newData, oldData) => {
        if (currentConversation.value) {
            conversationData.value = currentConversation.value.data;
            nextTick(() => {
                scrollToBottom();
            });
        } else {
            conversationData.value = {};
            messages.value = [];
        }
        if (newData?.id !== oldData?.id) {
            suggestedResponses.value = [];
            if (currentConversation.value) {
                messages.value = currentConversation.value.messages;
            }
        }
    });

    watch(newConversationCounter, () => {
        conversationData.value = {};
        messages.value = [];
        suggestedResponses.value = [];
    });
}
</script>

<template>
    <div class="flex flex-col flex-grow items-center relative">
            <!-- 弹窗组件 -->
        <el-dialog
        :title="'错误提示'"
        :visible="errorDialogVisible"
        @close="errorDialogVisible = false"
        >
        <p>余额不足</p>
        <div slot="footer" class="dialog-footer">
            <el-button @click="errorDialogVisible = false">确定</el-button>
        </div>
        </el-dialog>
        <!--suppress CssInvalidPropertyValue -->
        <div
            ref="messagesContainerElement"
            class="overflow-y-auto w-full rounded-sm pb-12 px-3"
            style="overflow: overlay;"
        >
            <TransitionGroup name="messages">
                <div
                    class="max-w-4xl w-full mx-auto message"
                    v-for="(message, index) in messages"
                    :key="message.id || index"
                >
                    <div
                        class="p-3 rounded-sm"
                        :class="{
                            'bg-white/10 shadow': message.role === 'bot',
                        }"
                    >
                        <!-- role name -->
                        <div
                            class="text-xs text-white/50 mb-1"
                        >
                            <template v-if="message.role === 'bot'">
                                {{ activePresetToUse?.options?.clientOptions?.chatGptLabel || 'AI' }}
                            </template>
                            <template v-else-if="message.role === 'user'">
                                {{ activePresetToUse?.options?.clientOptions?.userLabel || 'User' }}
                            </template>
                            <template v-else>
                                {{ message.role }}
                            </template>
                        </div>
                        <!-- message text -->
                        <div
                            class="prose prose-sm prose-chatgpt break-words max-w-6xl"
                            v-html="(message.role === 'user' || message.raw) ? parseMarkdown(message.text) : parseMarkdown(message.text, true)"
                        />
                    </div>
                </div>
            </TransitionGroup>
        </div>
        <div
            ref="inputContainerElement"
            class="mx-auto w-full max-w-4xl px-3 xl:px-0 flex flex-row absolute left-0 right-0 mb-7 sm:mb-0 z-10"
        >
            <div class="relative flex flex-row w-full justify-center items-stretch rounded shadow">
                <div
                    ref="chatButtonsContainerElement"
                    class="flex gap-2 mb-3 items-stretch justify-center absolute bottom-full"
                    :class="{ 'w-full': !processingController }"
                >
                    <button
                        v-if="processingController"
                        @click="stopProcessing"
                        class="
                            flex-1 py-2 px-5 bg-white/10 text-slate-300 text-sm
                            shadow rounded transition duration-300 ease-in-out hover:bg-white/20
                        "
                    >
                        Stop
                    </button>
                    <button
                        v-for="response in suggestedResponses"
                        :key="response"
                        @click="sendMessage(response)"
                        class="
                            flex-1 py-2 px-3 bg-white/10 text-slate-300 text-sm
                            shadow rounded transition duration-300 ease-in-out hover:bg-white/20
                        "
                    >
                        {{ response }}
                    </button>
                </div>
                <button
                    @click="isClientDropdownOpen = !isClientDropdownOpen"
                    class="flex items-center w-10 h-10 my-auto ml-2 justify-center absolute left-0 top-0 bottom-0 z-10"
                >
                    <Transition name="fade" mode="out-in">
                        <GPTIcon
                            v-if="activePresetNameToUse === 'chatgpt' || activePresetToUse?.client === 'chatgpt'"
                            class="w-10 h-10 p-2 block transition duration-300 ease-in-out rounded-lg hover:bg-black/30 cursor-pointer hover:shadow"
                            :class="{
                                'bg-black/30 shadow': isClientDropdownOpen,
                            }"
                        />
                        <GPTIcon
                            v-else-if="activePresetNameToUse === 'chatgpt-browser' || activePresetToUse?.client === 'chatgpt-browser'"
                            class="w-10 h-10 p-2 text-[#6ea194] block transition duration-300 ease-in-out
                            rounded-lg hover:bg-black/30 cursor-pointer hover:shadow"
                            :class="{
                                'bg-black/30 shadow': isClientDropdownOpen,
                            }"
                        />
                        <BingIcon
                            v-else-if="activePresetNameToUse === 'bing' || activePresetToUse?.client === 'bing'"
                            class="w-10 h-10 p-2 block transition duration-300 ease-in-out rounded-lg hover:bg-black/30 cursor-pointer hover:shadow"
                            :class="{
                                'bg-black/30 shadow': isClientDropdownOpen,
                            }"
                        />
                    </Transition>
                </button>
                <!-- 输入框的内容 -->
                <textarea
                    ref="inputTextElement"
                    :rows="inputRows"
                    v-model="message"
                    @keydown.enter.exact.prevent="sendMessage(message)"
                    placeholder="Type your message here..."
                    :disabled="!!processingController"
                    class="
                        py-4 pl-14 pr-14 rounded-l-sm text-slate-100 w-full bg-white/5
                        placeholder-white/40 focus:outline-none resize-none placeholder:truncate
                    "
                    :class="{
                        'opacity-50 cursor-not-allowed': !!processingController,
                    }"
                />
                <button
                    v-if="
                        !message
                        && regenerateData.canRegenerate
                        && typeof regenerateData.parentMessageId !== 'undefined'
                        && regenerateData.parentMessageId !== null
                        && !processingController
                    "
                    @click="typewriter.resume();"
                    title="Regenerate"
                    class="
                        flex items-center flex-1
                        px-4 text-slate-300 bg-white/5
                        transition duration-300 ease-in-out
                        hover:bg-white/10
                    "
                >
                    <Icon name="bx:bx-refresh" class="w-7 h-7"/>
                </button>
                <button
                    v-else
                    @click="sendMessage(message)"
                    :disabled="!!processingController"
                    class="
                        flex items-center flex-1
                        px-4 text-slate-300 rounded-r-sm bg-white/5
                        transition duration-300 ease-in-out
                    "
                    :class="{
                        'opacity-50 cursor-not-allowed': !!processingController,
                        'hover:bg-white/10': !processingController,
                    }"
                >
                    <Icon class="w-5 h-5" name="bx:bxs-send" />
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.messages-move, /* apply transition to moving elements */
.messages-enter-active {
    transition: all 0.3s ease;
}
.messages-enter-from {
    opacity: 0;
    transform: translateY(0);
}
/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.messages-leave-active {
    position: absolute;
    opacity: 0;
}

.slide-from-bottom-enter-active,
.slide-from-bottom-leave-active{
    transition: all 0.3s ease;
}
.slide-from-bottom-enter-from,
.slide-from-bottom-leave-to {
    transform: translateY(30px);
    opacity: 0;
}

.message {
    -webkit-transform: matrix(1.0, 0.0, 0.0, 1.0, 0.00, 0.01);
}

.prose pre {
    @apply whitespace-pre-wrap;
}

.prose pre code {
    background-color: transparent;
    @apply text-xs;
}

.prose pre code .hljs-comment {
    @apply text-slate-500;
}

.prose p {
    word-break: break-word;
}

/* Getting rid of the main default styling of the range input */
input[type="range"] {
    -webkit-appearance: none;
}

input[type="range"]:focus {
    outline: none;
}

/* Styling the track */
input[type="range"]::-webkit-slider-runnable-track {
    @apply h-1 bg-white/10 rounded w-full;
}
input[type="range"]::-moz-range-track {
    @apply h-1 bg-white/10 rounded w-full;
}

/* Styling the thumb */
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    @apply w-4 h-4 bg-slate-300 rounded-full -m-[0.5em];
}

input[type="range"]::-moz-range-thumb {
    @apply w-4 h-4 bg-slate-300 rounded-full;
}

/* Bing image creator iframe */
iframe {
    @apply bg-slate-100;
}
</style>
