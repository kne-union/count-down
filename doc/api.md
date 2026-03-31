### CountDown

倒计时组件，从指定时长开始递减至0。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| duration | number | 60 | 倒计时总时长（单位由 unit 决定） |
| autoplay | boolean | true | 是否自动开始倒计时 |
| unit | string | 'seconds' | 时间单位，可选值: 'seconds'（秒）或 'milliseconds'（毫秒） |
| format | string | 'mm:ss' | 时间显示格式（遵循 dayjs 格式规则） |
| onProgress | function | - | 进度回调函数，参数为当前时间值 `(currentTime: number) => void` |
| onComplete | function | - | 倒计时结束回调函数 `() => void` |
| children | function or string | - | 可选，函数式子组件 `(timeStr: string) => ReactNode` 或直接显示时间字符串 |

#### Ref 方法

通过 ref 可调用以下控制方法：

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| restart | - | void | 重置倒计时到初始时长并开始计时 |
| pause | - | void | 暂停倒计时 |
| start | - | void | 继续倒计时（如果已暂停） |
| switch | - | void | 切换暂停/继续状态 |
| getTime | - | number | 获取当前剩余时间值 |

#### 单位说明

- `seconds`: 秒级倒计时（1 = 1秒）
- `milliseconds`: 毫秒级倒计时（1000 = 1秒）

#### 格式示例

| 格式字符串 | 示例输出 | 说明 |
|-----------|---------|------|
| 'HH:mm:ss' | 00:01:30 | 标准时分秒格式 |
| 'mm:ss' | 01:30 | 分钟秒格式（默认） |
| 'mm分ss秒' | 01分30秒 | 中文格式 |
| 's[s]' | 90 | 纯秒数显示 |

#### 使用示例

```jsx
// 基础用法
<CountDown />

// 带自定义格式
<CountDown format="HH:mm:ss" />

// 带回调函数
<CountDown
  onProgress={(time) => console.log('剩余:', time)}
  onComplete={() => console.log('倒计时结束')}
/>

// 函数式子组件
<CountDown>
  {(timeStr) => <span className="countdown">{timeStr}</span>}
</CountDown>

// 使用 ref 控制
const countdownRef = useRef();
<CountDown ref={countdownRef} />
// countdownRef.current?.pause()
// countdownRef.current?.restart()
```

### Timer

计时器组件，从指定起点开始递增计时，可设置最大时长。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| start | number | 0 | 计时器初始值（单位由 unit 决定） |
| duration | number | 0 | 计时总时长，为 0 表示无限计时（单位由 unit 决定） |
| autoplay | boolean | true | 是否自动开始计时 |
| unit | string | 'seconds' | 时间单位，可选值: 'seconds'（秒）或 'milliseconds'（毫秒） |
| format | string | 'mm:ss' | 时间显示格式（遵循 dayjs 格式规则） |
| onProgress | function | - | 计时进度回调函数，参数为当前时间值 `(currentTime: number) => void` |
| onComplete | function | - | 计时完成回调函数（当 duration > 0 且 time >= duration 时触发） |
| children | function or string | - | 可选，函数式子组件 `(timeStr: string) => ReactNode` 或直接显示时间字符串 |

#### Ref 方法

通过 ref 可调用以下控制方法：

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| restart | - | void | 重置计时器到初始值（start 属性值）并开始计时 |
| pause | - | void | 暂停计时 |
| start | - | void | 继续计时（如果已暂停） |
| switch | - | void | 切换暂停/继续状态 |
| getTime | - | number | 获取当前时间值 |

#### 单位说明

- `seconds`: 秒级计时（1 = 1秒）
- `milliseconds`: 毫秒级计时（1000 = 1秒）

#### 格式示例

| 格式字符串 | 示例输出 | 说明 |
|-----------|---------|------|
| 'HH:mm:ss' | 00:01:30 | 标准时分秒格式 |
| 'mm:ss' | 01:30 | 分钟秒格式（默认） |
| 'mm分ss秒' | 01分30秒 | 中文格式 |
| 'm[m]s[s]' | 1m30s | 分钟秒组合 |

#### 使用示例

```jsx
// 基础用法（从0开始计时）
<Timer />

// 从指定起点开始计时
<Timer start={30} />

// 设置最大时长
<Timer start={0} duration={120} />

// 带回调函数
<Timer
  onProgress={(time) => console.log('已用时间:', time)}
  onComplete={() => console.log('计时结束')}
/>

// 函数式子组件
<Timer>
  {(timeStr) => <span className="timer">{timeStr}</span>}
</Timer>

// 使用 ref 控制
const timerRef = useRef();
<Timer ref={timerRef} />
// timerRef.current?.pause()
// timerRef.current?.restart()
// timerRef.current?.switch()
```
