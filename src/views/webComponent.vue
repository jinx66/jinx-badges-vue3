<template>
  <div>
    <div
      class="badge"
      @click="openlink()"
      id="myDiv"
      :style="containerStyle"
      :class="[link ? 'cursor' : '']"
    >
      <div class="badge-left" :style="leftStyle">
        <div
          v-if="logo"
          class="logo-container"
          :style="logoStyle"
          ref="logoContainer"
        ></div>
        <div v-if="leftText">{{ leftText }}</div>
      </div>
      <div v-if="rightText" class="badge-right" :style="rightStyle">
        <div class="right-text">{{ rightText }}</div>
      </div>
    </div>

    <div class="form-container">
      <div style="width: 700px">
        <div style="margin-bottom: 10px">SVG Data URL:</div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="svg内容"
          :autosize="{ minRows: 2, maxRows: 30 }"
          style="height: 100%"
          v-model="svgContent"
        ></el-input>
      </div>
      <div>
        <img src="./image.png" style="width: 800px; height: 540px" />
        <el-form model="form" label-width="100px">
          <el-form-item label="当前地址:">
            <el-input v-model="form.url" type="textarea" />
          </el-form-item>
          <div style="margin-bottom: 40px">
            <div style="margin-bottom: 10px;color: brown; font-size: 15px"
              >参考上面配置，在网址后面拼接你所需要的参数名后点击跳转，例如: </div
            >
            <div style="margin-bottom: 40px;color: brown; font-size: 13px"
              > 
              <a href="https://badges.xianjianheng.com/example?logo=github&leftText=github&rightText=&logoColor=%23fff&leftColor=black">https://badges.xianjianheng.com/example?logo=github&leftText=github&rightText=&logoColor=%23fff&leftColor=black</a></div
            >
          </div>
          <el-form-item>
            <el-button type="primary" @click="go">跳转至当前地址</el-button>
            <el-button type="primary" @click="copySVG">复制SVG</el-button>
            <el-button type="primary" @click="downloadSVG">下载SVG</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, reactive } from "vue";
import * as domtoimage from "dom-to-image"; // 正确的导入路径
import { ElMessage } from "element-plus";

// Props定义
const props = defineProps({
  borderRadius: {
    type: String,
    default: "6px", // 默认值
  },
  logoWidth: {
    type: String,
    default: "20px", // 默认值
  },
  logoHeight: {
    type: String,
    default: "20px", // 默认值
  },
  link: {
    type: String,
    default: "",
  },
  logo: {
    type: String,
    default: "vuedotjs",
  },
  leftText: {
    type: String,
    default: "creator",
  },
  rightText: {
    type: String,
    default: "Jinx",
  },
  leftSize: {
    type: String,
    default: "14px",
  },
  rightSize: {
    type: String,
    default: "14px",
  },
  leftColor: {
    type: String,
    default: "#555",
  },
  rightColor: {
    type: String,
    default: "#4c1",
  },
  logoColor: {
    type: String,
    default: "#4c1",
  },
});

// Reactive state
const form = reactive({
  url: "",
});
const svgContent = ref("");
const logoContainer = ref(null);

// Computed styles
const containerStyle = computed(() => ({
  borderRadius: props.borderRadius,
}));

const leftStyle = computed(() => ({
  fontSize: props.leftSize,
  backgroundColor: props.leftColor,
}));

const rightStyle = computed(() => ({
  fontSize: props.rightSize,
  backgroundColor: props.rightColor,
}));

const logoStyle = computed(() => ({
  width: props.logoWidth,
  height: props.logoHeight,
}));

// Methods
const openlink = () => {
  if (props.link && validateUrl(props.link, "link")) {
    window.open(props.link, "_blank");
  }
};

const loadSvg = () => {
  if(props.logo) {
    fetch(`https://simpleicons.org/icons/${props.logo}.svg`)
    .then((response) => response.text())
    .then((svg) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svg, "image/svg+xml");
      const svgElement = svgDoc.querySelector("svg");
      svgElement.setAttribute("fill", props.logoColor);
      logoContainer.value.innerHTML = svgElement.outerHTML;
    })
    .catch((error) => {
      console.error("Error loading SVG:", error);
      ElMessage({
        showClose: true,
        message: "加载 SVG 失败",
        type: "error",
      });
    });
  }
};

const convertToSVG = () => {
  const node = document.getElementById("myDiv");
  domtoimage
    .toSvg(node)
    .then((dataUrl) => {
      console.log("SVG 转换完成:", dataUrl);
      svgContent.value = dataUrl.replace(
        /^data:image\/svg\+xml;charset=utf-8,/,
        ""
      );
    })
    .catch((error) => {
      console.error("Error while converting to SVG:", error);
    });
};

const go = () => {
  let url = form.url.replace(/#/g, "%23");
  if (!validateUrl(url)) {
    return;
  }

  window.location.href = url;
};

const validateUrl = (url, type = "url") => {
  const decodedUrl = decodeURIComponent(url);

  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (!urlPattern.test(decodedUrl)) {
    ElMessage({
      showClose: true,
      message: `${type}格式有误`,
      type: "warning",
    });
    return false;
  }

  if (decodedUrl.length > 300) {
    ElMessage({
      showClose: true,
      message: `${type}太长`,
      type: "warning",
    });
    return false;
  }

  return true;
};

const copySVG = () => {
  if (svgContent.value) {
    navigator.clipboard
      .writeText(svgContent.value)
      .then(() => {
        ElMessage({
          showClose: true,
          message: "SVG 内容已复制",
          type: "success",
        });
      })
      .catch((error) => {
        console.error("复制失败:", error);
        ElMessage({
          showClose: true,
          message: "复制失败，请重试",
          type: "error",
        });
      });
  } else {
    ElMessage({
      showClose: true,
      message: "尚未生成 SVG",
      type: "warning",
    });
  }
};

const downloadSVG = () => {
  if (svgContent.value) {
    const blob = new Blob([svgContent.value], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "badge.svg";
    a.click();
    URL.revokeObjectURL(url);
  } else {
    ElMessage({
      showClose: true,
      message: "尚未生成 SVG",
      type: "warning",
    });
  }
};

// OnMounted lifecycle hook
onMounted(() => {
  loadSvg();
  setTimeout(() => {
    convertToSVG();
  }, 500);

  form.url = window.location.href;
});
</script>

<style scoped>
.logo-container {
  margin-right: 5px;
}
.badge {
  display: inline-flex;
  border-radius: 6px;
  overflow: hidden;
  font-family: Georgia, serif;
  font-size: 12px;
  font-weight: bold;
  line-height: 12px;
  text-align: center;
}

.badge-left {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 5px 8px;
}

.badge-right {
  color: white;
  padding: 5px 8px;
}

.cursor {
  cursor: pointer;
}

.right-text {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.form-container {
  display: flex;
}
</style>
