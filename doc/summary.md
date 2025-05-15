### CountDown 倒计时组件

#### 组件概述
一个基于React的通用倒计时组件，支持自定义时长、格式、单位，提供播放控制、进度回调等功能。

#### 功能特性
- 🕒 支持秒/毫秒级倒计时
- ⏯️ 自动播放/手动暂停控制
- 🔄 可重置倒计时
- 📊 实时进度回调
- 🎚️ 自定义时间显示格式
- 🎛️ 支持ref控制方法

#### 基本用法
```jsx
import CountDown from './CountDown';

// 基础倒计时（60秒，自动播放）
<CountDown />

// 带格式和回调的倒计时
<CountDown 
  format="mm分ss秒" 
  onProgress={(time) => console.log('剩余:', time)}
  onComplete={() => console.log('倒计时结束')}
/>
```

#### 时间格式示例
- `HH:mm:ss` → 00:01:30
- `mm分ss秒` → 01分30秒
- `s[s]` → 90（纯秒数）

#### 注意事项
1. 需要项目安装dayjs及其duration插件
2. 单位切换时需确保duration值匹配单位
3. 精确控制建议使用milliseconds单位

### Timer 计时器组件文档

#### 组件概述
一个基于React的可控计时器组件，提供精确的时间控制、状态切换和实时回调功能，适合需要精细时间管理的场景。

#### 核心功能
- ⏱️ 精确计时控制
- ⏯️ 播放/暂停状态切换
- 🔄 时间重置功能
- 📊 实时获取当前时间
- 🎛️ 外部Ref控制接口

#### 基本用法
```jsx
import Timer from './Timer';

// 创建计时器引用
const timerRef = useRef();

// 渲染组件
<Timer ref={timerRef} />

// 控制示例
timerRef.current?.switch(); // 切换播放/暂停
```
