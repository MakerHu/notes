<template>
    <button class="toggle-button" @click="toggleTheme">*</button>
    <!-- <div class="logo-container">
        <img class="logo" :src="withBase(frontmatter.hero.image.src)" :alt="frontmatter.hero.image.alt" />
    </div> -->
    <div class="title-container">
        <h1 class="title">{{ frontmatter.hero.name }}</h1>
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
            backgroundColor: ball.color
            }"
        >
            <div class="image-container">
                <img class="image" :src="withBase(ball.icon)" :alt="frontmatter.hero.image.alt" />
            </div>

            <div class="ball-tag">
                {{ ball.name }}
            </div>
            
        </div>
    </div>
  </template>
  
  <script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { useData, useRouter, withBase } from 'vitepress'

    const { isDark, frontmatter } = useData()
    const router = useRouter()

    const radius = ref(60)

    const toggleTheme = () => {
        isDark.value = !isDark.value;
    };

    const goToPage = (link) => {
        router.go(withBase(link));
    }
    
    const paddingTop = 70
    const phoneRadius = 50
    const ipadRadius = 75
    const pcRadius = 90
    const isPhone = window.matchMedia('(max-width: 768px)');
    isPhone.addEventListener('change', (event) => {
        if (event.matches) {
            radius.value = phoneRadius
        }
    });
    const isPad = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
    isPad.addEventListener('change', (event) => {
        if (event.matches) {
            radius.value = ipadRadius
        }
    });
    const isPc = window.matchMedia('(min-width: 1025px)');
    isPc.addEventListener('change', (event) => {
        if (event.matches) {
            radius.value = pcRadius
        }
    });

    const frameWidth = ref(window.innerWidth * 0.95); // 长方形的宽
    const frameHeight = ref((window.innerHeight - paddingTop) * 0.95); // 长方形的高
    const framePosition = reactive({})

    // const balls = ref(Array.from({ length: 10 }, () => createBall()));
    const balls = reactive([]);

    // 监听屏幕宽度变化
    window.addEventListener('resize', () => {
        frameWidth.value = window.innerWidth * 0.95; // 长方形的宽
        frameHeight.value = (window.innerHeight - paddingTop) * 0.95; // 长方形的高
        updateFramePosition()
    })

    function createBall(feature) {
        return {
            name: feature.title,
            x: Math.random() * (frameWidth.value - radius.value * 2) + framePosition.left + radius.value, // 确保小球在框内
            y: Math.random() * (frameHeight.value - radius.value * 2) + framePosition.top + radius.value,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            // color: randomColor(),
            color: '#efefef',
            r: radius,
            link: feature.link,
            icon: feature.icon
        };
    }

    function randomColor() {
      return `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    function updateBalls() {
      balls.forEach((ball) => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // 边缘碰撞检测（框内运动）
        if (ball.x < framePosition.left + ball.r) {
            ball.x = framePosition.left + ball.r
            ball.vx *= -1; // 反弹
        }
        if (ball.x > framePosition.right - ball.r) {
            ball.x = framePosition.right - ball.r
            ball.vx *= -1; // 反弹
        }
        if (ball.y < framePosition.top + ball.r) {
            ball.y = framePosition.top + ball.r
            ball.vy *= -1; // 反弹
        }
        if (ball.y > framePosition.bottom - ball.r) {
            ball.y = framePosition.bottom - ball.r
            ball.vy *= -1; // 反弹
        }

        // 小球之间的碰撞检测
        balls.forEach((otherBall, j) => {
          if (ball !== otherBall) {
                const dx = ball.x - otherBall.x;
                const dy = ball.y - otherBall.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < ball.r * 2) {
                    const newDx = ball.r * dx/distance;
                    const newDy = ball.r * dy/distance;
                    const centerX = (ball.x + otherBall.x)/2;
                    const centerY = (ball.y + otherBall.y)/2;

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
    }

    const updateFramePosition = () => {
        framePosition.top = (window.innerHeight - paddingTop - frameHeight.value) / 2
        framePosition.left = (window.innerWidth - frameWidth.value) / 2
        framePosition.bottom = (window.innerHeight - paddingTop + frameHeight.value) / 2
        framePosition.right = (window.innerWidth + frameWidth.value) / 2
    }

    onMounted(() => {

        updateFramePosition()
        
        if (isPhone.matches) {
            radius.value = phoneRadius
        } else if (isPad.matches) {
            radius.value = ipadRadius
        } else if (isPc.matches) {
            radius.value = pcRadius
        }

        frontmatter.value.features.forEach((data) => {
            balls.push(createBall(data))
        })

        setInterval(updateBalls, 16);
    });
  </script>
  
  <style scoped>
    .toggle-button {
        position: fixed;
        top: 20px; /* 距离顶部 20px */
        right: 20px; /* 距离右侧 20px */
        width: 30px; /* 按钮的宽度 */
        height: 30px; /* 按钮的高度，和宽度相等形成圆形 */
        background-color: #588efa; /* 按钮的背景颜色 */
        color: white; /* 按钮文本颜色 */
        border: none; /* 去掉默认边框 */
        border-radius: 50%; /* 使按钮变成圆形 */
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        cursor: pointer; /* 鼠标悬停时显示为点击手型 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加轻微阴影效果 */
        z-index: 1000; /* 确保按钮在页面的最前方 */
    }

    .toggle-button:hover {
        background-color: #377aff; /* 鼠标悬停时按钮颜色变化 */
    }

    .title-container {
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        height: 70px;
        /* margin-top: 20px; */
        padding-top: 20px;
    }

    .title {
        font-size: 32px;
        line-height: 1;
        text-align: center; /* 水平居中 */
        background-image: linear-gradient(to right, #97fbb0, #0008ff); /* 设置渐变色 */
        background-clip: text; /* 将背景裁剪到文字范围 */
        -webkit-background-clip: text; /* 将背景裁剪到文字范围 */
        -webkit-text-fill-color: transparent; /* 使文字的填充颜色透明，显示背景渐变 */
        position: relative; /* 为伪元素定位准备 */
        padding: 10px 0; /* 增加上下的间距以避免与横线重叠 */
    }

    .title::before,
    .title::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px; /* 横线高度 */
        background-color: rgb(255, 255, 255); /* 横线颜色 */
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
    border: 2px solid rgb(255, 255, 255);
    border-radius: 10px;
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
  