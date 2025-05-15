
# count-down


### 描述

显示倒计时.


### 安装

```shell
npm i --save @kne/count-down
```


### 概述

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


### 示例


#### 示例样式

```scss
.ant-card {
  border-color: black;
  text-align: center;
  width: 200px;
}
```

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _CountDown(@kne/current-lib_count-down)[import * as _CountDown from "@kne/count-down"]

```jsx
const { default: CountDown, Timer } = _CountDown;

const BaseExample = () => {
  return (
    <><div>
      <CountDown />
    </div>
    <div>
      <Timer />
    </div>
    </>
  );
};

render(<BaseExample />);

```


### API

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| duration | number | 60 | 倒计时总时长（单位由unit决定） |
| autoplay | boolean | true | 是否自动开始倒计时 |
| unit | string | 'seconds' | 时间单位（'seconds'或'milliseconds'） |
| format | string | 'mm:ss' | 时间显示格式（dayjs格式） |
| onProgress | function | - | 进度回调 (currentTime) => void |
| onComplete | function | - | 完成回调 () => void |

#### Ref 方法
通过ref可调用以下控制方法：
```jsx
const countdownRef = useRef();

// 暂停
countdownRef.current?.pause();

// 继续
countdownRef.current?.continue();

// 重置
countdownRef.current?.restart();

<CountDown ref={countdownRef} />
```

### Timer

| 属性名       | 类型     | 默认值      | 必填 | 说明                                                                 |
|--------------|----------|-------------|------|----------------------------------------------------------------------|
| `start`      | number   | 0           | 否   | 计时器初始值（单位由`unit`决定）                                     |
| `duration`   | number   | 0           | 否   | 计时总时长，为0表示无限计时（单位由`unit`决定）                      |
| `autoplay`   | boolean  | true        | 否   | 是否自动开始计时                                                     |
| `unit`       | string   | 'seconds'   | 否   | 时间单位，可选值: 'seconds'（秒）或 'milliseconds'（毫秒）            |
| `format`     | string   | 'mm:ss'     | 否   | 时间显示格式（遵循dayjs格式规则）                                    |
| `onProgress` | function | -           | 否   | 计时进度回调函数，参数为当前时间值 `(currentTime: number) => void`   |
| `onComplete` | function | -           | 否   | 计时完成回调函数（当`duration>0`且`time>=duration`时触发）           |

#### 单位说明
- `seconds`: 秒级计时（1 = 1秒）
- `milliseconds`: 毫秒级计时（1000 = 1秒）

#### 格式示例
| 格式字符串 | 示例输出       | 说明                     |
|-----------|----------------|--------------------------|
| 'HH:mm:ss'| 00:01:30       | 标准时分秒格式           |
| 'mm:ss'   | 01:30          | 分钟秒格式（默认）       |
| 's[s]'    | 90             | 纯秒数显示               |
| 'm[m]s[s]'| 1m30s          | 自定义分钟秒组合         |

#### Ref 控制方法
通过ref可调用以下控制方法：

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| restart | - | void | 重置计时器 |
| switch | - | void | 切换暂停/继续状态 |
| getTime | - | number | 获取当前时间值 |

```jsx
// 典型控制流程示例
timerRef.current.restart();  // 重置
timerRef.current.switch();   // 开始计时
const currentTime = timerRef.current.getTime(); // 获取时间
```
