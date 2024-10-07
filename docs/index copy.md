---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MakerHu的学习笔记"
  text: "不如学习"
  tagline: 学习过程才是最好玩儿的！
  image:
    src: /logo.png
    alt: logo
  actions:
    - theme: brand
      text: 分类一
      link: /mycategory1/
    - theme: alt
      text: 分类二
      link: /mycategory1/

features:
  - title: 分类一
    link: /mycategory1/
    details: 分类一的介绍
  - title: 分类二
    link: /mycategory2/
    details: 分类二的介绍
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  /* --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #2b87ff 30%, #79d9ff); */

  /* --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%); */
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #2b87ff 50%, #79d9ff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>