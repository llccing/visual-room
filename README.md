# visual-room

本项目是Three.js结合Vue全家桶的一个基础项目，在此之上你可以使用Three.js尽情发挥。

## 依赖
- Vue全家桶（Vue/Vue-router/Vuex）
- Three.js
- Tween.js
- bootstrap
- iview

## Getting started
```
yarn install 
yarn run serve
```

## 演示页面更新方式

```js
cd dist
git init
git add -A
git commit -m 'deploy'
// 这句最重要
git push -f git@github.com:llccing/visual-room.git master:gh-pages
```