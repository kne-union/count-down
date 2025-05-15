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