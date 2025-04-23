
# count-down


### 描述

显示倒计时.


### 安装

```shell
npm i --save @kne/count-down
```


### 概述

显示倒计时

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
const {default:CountDown} = _CountDown;

const BaseExample = ()=>{
    return <div>
        <CountDown />
    </div>;
};

render(<BaseExample />);

```


### API

| 属性名        | 说明            | 类型                    | 默认值     |
|------------|---------------|-----------------------|---------|
| duration   | 倒计时总时间        | number                | 60      |
| autoplay   | 初始化完成后自动开始计时  | boolean               | true    |
| unit       | 倒计时单位         | string(dayjs可接受的时间单位) | seconds |
| format     | 显示格式化         | string                | mm:ss   |
| onProgress | 倒计时单位时间间隔触发一次 | function              | -       |
| onComplete | 倒计时完成后触发      | function              | -       |

### ref.current

| 属性名     | 说明                    | 类型       | 默认值 |
|---------|-----------------------|----------|-----|
| restart | 重新开始倒计时               | function | -   |
| pause   | 暂停倒计时                 | function | -   |
| start   | 开始倒计时                 | function | -   |
| switch  | 开始/暂停倒计时(根据当前状态来进行切换) | function | -   |
| getTime | 获取当前剩余时间              | function | -   |
