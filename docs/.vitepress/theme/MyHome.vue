<script setup>
import { ref, reactive, onMounted } from "vue";
import { useData, useRouter, withBase } from "vitepress";
import Toggle from "./component/Toggle.vue";

const { isDark, frontmatter } = useData();
const router = useRouter();

const radius = ref(60);

const paddingTop = 70;
const phoneRadius = 50;
const ipadRadius = 75;
const pcRadius = 90;

const frameWidth = ref(0); // 初始化为 0，稍后在 onMounted 中更新
const frameHeight = ref(0);
const framePosition = reactive({});
const balls = reactive([]);

// 跳转页面
const goToPage = (link) => {
  router.go(withBase(link));
};

// 创建球
const createBall = (feature) => {
  return {
    name: feature.title,
    x:
      Math.random() * (frameWidth.value - radius.value * 2) +
      framePosition.left +
      radius.value,
    y:
      Math.random() * (frameHeight.value - radius.value * 2) +
      framePosition.top +
      radius.value,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    color: "#efefef",
    r: radius,
    link: feature.link,
    icon: feature.icon,
  };
};

// 更新球的状态
const updateBalls = () => {
  balls.forEach((ball) => {
    ball.x += ball.vx;
    ball.y += ball.vy;

    // 边缘碰撞检测
    if (ball.x < framePosition.left + ball.r) {
      ball.x = framePosition.left + ball.r;
      ball.vx *= -1; // 反弹
    }
    if (ball.x > framePosition.right - ball.r) {
      ball.x = framePosition.right - ball.r;
      ball.vx *= -1; // 反弹
    }
    if (ball.y < framePosition.top + ball.r) {
      ball.y = framePosition.top + ball.r;
      ball.vy *= -1; // 反弹
    }
    if (ball.y > framePosition.bottom - ball.r) {
      ball.y = framePosition.bottom - ball.r;
      ball.vy *= -1; // 反弹
    }

    // 小球之间的碰撞检测
    balls.forEach((otherBall) => {
      if (ball !== otherBall) {
        const dx = ball.x - otherBall.x;
        const dy = ball.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.r * 2) {
          const newDx = (ball.r * dx) / distance;
          const newDy = (ball.r * dy) / distance;
          const centerX = (ball.x + otherBall.x) / 2;
          const centerY = (ball.y + otherBall.y) / 2;

          ball.x = centerX + newDx;
          otherBall.x = centerX - newDx;

          ball.y = centerY + newDy;
          otherBall.y = centerY - newDy;

          // 交换速度
          [ball.vx, otherBall.vx] = [otherBall.vx, ball.vx];
          [ball.vy, otherBall.vy] = [otherBall.vy, ball.vy];
        }
      }
    });
  });
};

// 更新方框的边界位置
const updateFramePosition = () => {
  framePosition.top = (window.innerHeight - paddingTop - frameHeight.value) / 2;
  framePosition.left = (window.innerWidth - frameWidth.value) / 2;
  framePosition.bottom =
    (window.innerHeight - paddingTop + frameHeight.value) / 2;
  framePosition.right = (window.innerWidth + frameWidth.value) / 2;
};

// 更新方框的尺寸
const updateFrameSize = () => {
  frameWidth.value = window.innerWidth * 0.95;
  frameHeight.value = (window.innerHeight - paddingTop) * 0.95;
  updateFramePosition();
};

// 根据屏幕大小调整参数大小
const updateParamsWhenWindowChange = () => {
  const isPhone = window.matchMedia("(max-width: 768px)");
  const isPad = window.matchMedia("(min-width: 769px) and (max-width: 1024px)");
  const isPc = window.matchMedia("(min-width: 1025px)");

  if (isPhone.matches) {
    radius.value = phoneRadius;
  } else if (isPad.matches) {
    radius.value = ipadRadius;
  } else if (isPc.matches) {
    radius.value = pcRadius;
  }

  isPhone.addEventListener("change", (event) => {
    if (event.matches) {
      radius.value = phoneRadius;
    }
  });

  isPad.addEventListener("change", (event) => {
    if (event.matches) {
      radius.value = ipadRadius;
    }
  });

  isPc.addEventListener("change", (event) => {
    if (event.matches) {
      radius.value = pcRadius;
    }
  });
};

onMounted(() => {
  updateParamsWhenWindowChange();

  updateFrameSize();

  window.addEventListener("resize", updateFrameSize);

  frontmatter.value.features.forEach((data) => {
    balls.push(createBall(data));
  });

  setInterval(updateBalls, 16);
});
</script>

<template>
  <div class="title-container">
    <h1 class="title">{{ frontmatter.hero.name }}</h1>
    <Toggle class="toggle" v-model="isDark" />
  </div>

  <div class="frame-container">
    <div class="frame"></div>
    <div
      v-for="(ball, index) in balls"
      :key="index"
      class="ball"
      @click="goToPage(ball.link)"
      :style="{
        left: ball.x - ball.r + 'px',
        top: ball.y - ball.r + 'px',
        backgroundColor: ball.color,
      }"
    >
      <div class="image-container">
        <img class="image" :src="withBase(ball.icon)" :alt="ball.name" />
      </div>
      <div class="ball-tag">{{ ball.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.toggle {
  position: absolute; /* 使按钮绝对定位 */
  right: calc(5vw / 2); /* 距离右侧 20px */
}

.title-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 70px;
  padding-top: 20px;
  position: relative;
}

.title {
  font-size: 32px;
  line-height: 1;
  text-align: center; /* 水平居中 */
  background-image: linear-gradient(
    to right,
    #97fbb0,
    #0008ff
  ); /* 设置渐变色 */
  background-clip: text; /* 将背景裁剪到文字范围 */
  -webkit-background-clip: text; /* 将背景裁剪到文字范围 */
  -webkit-text-fill-color: transparent; /* 使文字的填充颜色透明，显示背景渐变 */
  position: relative; /* 为伪元素定位准备 */
  padding: 10px 10px; /* 增加上下的间距以避免与横线重叠 */
  box-shadow: var(--cus-shadow-frame);
  border-radius: 5px;
}

.title::before,
.title::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px; /* 横线高度 */
  /* background-color: var(--vp-c-neutral); */
}

.title::before {
  top: 0; /* 横线放在文字上方 */
}

.title::after {
  bottom: 0; /* 横线放在文字下方 */
}

.frame-container {
  position: relative;
  width: 100vw;
  height: calc(100vh - 70px);
  overflow: hidden;
  /* background-color: #f0f0f0; */
}
.frame {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 95%;
  height: 95%;
  transform: translate(-50%, -50%);
  /* border: 2px solid rgb(255, 255, 255); */
  border-radius: 10px;
  box-shadow: var(--cus-shadow-frame);
}
.ball {
  width: 180px;
  height: 180px;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* 子元素按列排列 */
  justify-content: center;
  align-items: center;
  background: var(--cus-gradient-ball);
  box-shadow: var(--cus-shadow-ball);
}

.image-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 5px;
  background-color: #ff7c3f;
}

.image {
  border-radius: 3px;
}

.ball-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-weight: bolder;
  color: #333;
}

/* 手机屏幕 */
@media (max-width: 768px) {
  .title {
    font-size: 24px;
  }
  .ball {
    width: 100px;
    height: 100px;
  }
  .image-container {
    width: 40px;
    height: 40px;
  }
}

/* 平板屏幕 */
@media ((min-width: 769px) and (max-width: 1024px)) {
  .title {
    font-size: 28px;
  }
  .ball {
    width: 150px;
    height: 150px;
  }
  .image-container {
    width: 60px;
    height: 60px;
  }
}
</style>
