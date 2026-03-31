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
CountDown 是一个基于 React 的通用倒计时组件，支持自定义时长、格式、单位，提供完整的播放控制、进度回调等功能。组件使用 dayjs 及其 duration 插件进行时间计算，支持秒级和毫秒级计时，适用于验证码倒计时、活动倒计时等多种业务场景。

#### 主要特性

**核心功能**
- 支持自定义倒计时时长和单位（秒/毫秒）
- 自动播放或手动控制播放状态
- 提供 ref 控制接口，支持开始、暂停、重启等操作
- 实时进度回调，便于UI联动更新
- 完成回调，便于触发后续业务逻辑

**灵活配置**
- 可自定义时间显示格式（遵循 dayjs 格式规则）
- 支持函数式子组件，便于自定义渲染逻辑
- 默认60秒倒计时，可按需调整

#### 使用场景

**验证码倒计时**
```
场景：用户获取验证码后，60秒内不能重复获取
实现：使用默认60秒倒计时，结束后触发重新发送逻辑
```

**活动倒计时**
```
场景：秒杀、抢购等活动展示剩余时间
实现：设置较大时长，使用 HH:mm:ss 格式显示
```

**任务倒计时**
```
场景：限制用户操作时间，如考试、答题
实现：设置倒计时时长，进度回调实时更新UI
```

**自定义显示**
```
场景：需要特定格式的倒计时展示
实现：使用 format 属性自定义输出格式，或使用函数式子组件完全自定义渲染
```

### Timer 计时器组件

#### 组件概述
Timer 是一个基于 React 的可控计时器组件，提供精确的时间控制、状态切换和实时回调功能。与 CountDown 相比，Timer 从指定起点开始计时递增，适合需要累计时间或限制最大时长的场景。

#### 主要特性

**核心功能**
- 支持自定义起始时间点和最大时长限制
- 精确计时控制，支持秒级和毫秒级
- 播放/暂停状态自由切换
- 提供 ref 控制接口，支持远程操作
- 实时进度回调，获取当前计数值

**灵活配置**
- 可设置最大时长，超时自动停止
- 可自定义时间显示格式
- 支持函数式子组件，完全自定义渲染
- 默认从0开始计时，可指定起始值

#### 使用场景

**任务计时**
```
场景：记录用户完成某个任务所用时间
实现：从0开始计时，实时更新显示
```

**限时任务**
```
场景：限制用户操作总时长，如在线考试
实现：设置 duration 最大时长，超时触发完成回调
```

**工作计时**
```
场景：记录工作时间、学习时间等
实现：使用 ref 控制开始/暂停，支持中途暂停和继续
```

**精确计时**
```
场景：需要毫秒级精度的场景
实现：使用 milliseconds 单位进行精确计时
```


### 示例

#### 示例代码

- 基础示例
- 展示 CountDown 和 Timer 组件的基本用法
- _CountDown(@kne/current-lib_count-down)[import * as _CountDown from "@kne/count-down"],antd(antd)

```jsx
const { default: CountDown, Timer } = _CountDown;
const { Space, Card, Typography, Divider } = antd;

const { Title, Paragraph, Text } = Typography;

const BaseExample = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* CountDown 示例 */}
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Title level={4}>CountDown 倒计时组件</Title>
          <Paragraph>
            <Text>从60秒开始倒计时：</Text>
          </Paragraph>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff', textAlign: 'center', padding: 16 }}>
            <CountDown />
          </div>
          <Divider />
          <Paragraph>
            <Text>自定义格式（mm分ss秒）：</Text>
          </Paragraph>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a', textAlign: 'center', padding: 16 }}>
            <CountDown format="mm分ss秒" />
          </div>
        </Space>
      </Card>

      {/* Timer 示例 */}
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Title level={4}>Timer 计时器组件</Title>
          <Paragraph>
            <Text>从0开始计时：</Text>
          </Paragraph>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#722ed1', textAlign: 'center', padding: 16 }}>
            <Timer />
          </div>
          <Divider />
          <Paragraph>
            <Text>从30秒开始计时，限时60秒：</Text>
          </Paragraph>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#faad14', textAlign: 'center', padding: 16 }}>
            <Timer start={30} duration={60} format="mm:ss" />
          </div>
        </Space>
      </Card>
    </Space>
  );
};

render(<BaseExample />);

```

- CountDown 示例
- 展示 CountDown 倒计时组件的各种用法，包括自定义格式、Ref 控制、回调函数、验证码场景、秒杀活动等
- _CountDown(@kne/current-lib_count-down)[import * as _CountDown from "@kne/count-down"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default:CountDown } = _CountDown;
const { createWithRemoteLoader, getPublicPath } = remoteLoader;
const { Space, Card, Button, Typography, Alert, Switch } = antd;
const { useState, useRef } = React;

const { Title, Paragraph, Text } = Typography;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  const countdownRef = useRef();
  const [logMessages, setLogMessages] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogMessages(prev => [&#96;[${timestamp}] ${message}&#96;, ...prev].slice(0, 10));
  };

  return (
    <PureGlobal preset={{
      ajax: async api => {
        return { data: { code: 0, data: api.loader() } };
      },
      apis: {
        file: {
          staticUrl: getPublicPath('count-down') || window.PUBLIC_URL
        }
      }
    }}>
      <InfoPage>
        <InfoPage.Part title="CountDown 倒计时组件">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* 示例1: 默认倒计时 */}
            <Card title="默认倒计时（60秒）" size="small">
              <Space direction="vertical" align="center">
                <div style={{ fontSize: 32, fontWeight: 'bold', color: '#1890ff' }}>
                  <CountDown />
                </div>
                <Text type="secondary">默认60秒自动播放</Text>
              </Space>
            </Card>

            {/* 示例2: 自定义格式 */}
            <Card title="自定义时间格式" size="small">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
                  <Text>标准格式 (HH:mm:ss): </Text>
                  <Text strong style={{ marginLeft: 8, color: '#52c41a' }}>
                    <CountDown duration={3665} format="HH:mm:ss" />
                  </Text>
                </div>
                <div style={{ padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
                  <Text>中文格式 (mm分ss秒): </Text>
                  <Text strong style={{ marginLeft: 8, color: '#faad14' }}>
                    <CountDown duration={125} format="mm分ss秒" />
                  </Text>
                </div>
                <div style={{ padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
                  <Text>纯秒数 (s[s]): </Text>
                  <Text strong style={{ marginLeft: 8, color: '#ff4d4f' }}>
                    <CountDown duration={90} format="s[s]" />
                  </Text>
                </div>
              </Space>
            </Card>

            {/* 示例3: 不同时长的倒计时 */}
            <Card title="不同时长的倒计时" size="small">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space align="center">
                  <Text width={80}>30秒: </Text>
                  <Text code><CountDown duration={30} /></Text>
                </Space>
                <Space align="center">
                  <Text width={80}>2分钟: </Text>
                  <Text code><CountDown duration={120} /></Text>
                </Space>
                <Space align="center">
                  <Text width={80}>1小时: </Text>
                  <Text code><CountDown duration={3600} /></Text>
                </Space>
              </Space>
            </Card>

            {/* 示例4: Ref控制方法 */}
            <Card title="Ref 控制方法" size="small">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', padding: 16, background: '#f5f5f5', borderRadius: 4 }}>
                  <div style={{ fontSize: 28, fontWeight: 'bold', color: '#722ed1' }}>
                    <CountDown ref={countdownRef} duration={30} />
                  </div>
                </div>
                <Space wrap>
                  <Button type="primary" onClick={() => countdownRef.current?.restart()}>
                    重置
                  </Button>
                  <Button onClick={() => countdownRef.current?.start()}>
                    开始
                  </Button>
                  <Button onClick={() => countdownRef.current?.pause()}>
                    暂停
                  </Button>
                  <Button onClick={() => countdownRef.current?.switch()}>
                    切换
                  </Button>
                  <Button onClick={() => {
                    const time = countdownRef.current?.getTime();
                    addLog(&#96;当前剩余时间: ${time}秒&#96;);
                  }}>
                    获取时间
                  </Button>
                </Space>
              </Space>
            </Card>

            {/* 示例5: 回调函数 */}
            <Card title="回调函数监听" size="small">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <CountDown
                  duration={10}
                  onProgress={(time) => {
                    if (time <= 5 && time > 0) {
                      addLog(&#96;倒计时: ${time}秒 - 注意时间即将结束&#96;);
                    }
                  }}
                  onComplete={() => {
                    addLog('倒计时结束！触发完成回调');
                  }}
                />
                <Alert
                  message="日志"
                  description={
                    <div style={{ maxHeight: 150, overflow: 'auto' }}>
                      {logMessages.map((msg, index) => (
                        <div key={index} style={{ fontSize: 12, lineHeight: 1.8 }}>
                          {msg}
                        </div>
                      ))}
                      {logMessages.length === 0 && <Text type="secondary">暂无日志</Text>}
                    </div>
                  }
                  type="info"
                />
              </Space>
            </Card>

            {/* 示例6: 函数式子组件 */}
            <Card title="函数式子组件" size="small">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space>
                  <Text>自定义样式: </Text>
                  <CountDown duration={45}>
                    {(timeStr) => (
                      <span style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        borderRadius: 20,
                        fontWeight: 'bold',
                        fontSize: 20
                      }}>
                        {timeStr}
                      </span>
                    )}
                  </CountDown>
                </Space>
                <Space>
                  <Text>带图标: </Text>
                  <CountDown duration={60}>
                    {(timeStr) => (
                      <span style={{ fontSize: 24, color: '#ff4d4f' }}>
                        ⏰ {timeStr}
                      </span>
                    )}
                  </CountDown>
                </Space>
              </Space>
            </Card>

            {/* 示例7: 不自动播放 */}
            <Card title="手动控制播放" size="small">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space align="center">
                  <Text>不自动播放，手动点击开始: </Text>
                  <CountDown
                    duration={20}
                    autoplay={false}
                    format="mm:ss"
                  />
                </Space>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  设置 autoplay={false}，需要调用 ref.start() 或 ref.restart() 开始倒计时
                </Text>
              </Space>
            </Card>

            {/* 示例8: 验证码场景 */}
            <Card title="验证码倒计时场景" size="small">
              <VerificationCodeExample />
            </Card>

            {/* 示例9: 秒杀活动倒计时 */}
            <Card title="秒杀活动倒计时" size="small">
              <FlashSaleExample />
            </Card>

          </Space>
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

// 验证码倒计时示例
const VerificationCodeExample = () => {
  const [canSend, setCanSend] = useState(true);
  const [phone, setPhone] = useState('138****8888');

  const handleSendCode = () => {
    setCanSend(false);
  };

  const handleComplete = () => {
    setCanSend(true);
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space align="center">
        <Text strong>手机号: {phone}</Text>
        <Button
          type="primary"
          disabled={!canSend}
          onClick={handleSendCode}
        >
          {canSend ? '获取验证码' : <CountDown duration={60} onComplete={handleComplete} />}
        </Button>
      </Space>
      <Text type="secondary" style={{ fontSize: 12 }}>
        模拟真实的验证码发送场景，60秒内不能重复发送
      </Text>
    </Space>
  );
};

// 秒杀活动倒计时示例
const FlashSaleExample = () => {
  const [endTime] = useState(new Date(Date.now() + 2 * 60 * 60 * 1000)); // 2小时后
  const [remaining] = useState(7200); // 2小时（7200秒）

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div style={{
        padding: '16px',
        background: '#fff0f6',
        borderRadius: 8,
        border: '1px solid #ffadd2'
      }}>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: 16, color: '#c41d7f' }}>
            ⚡ 限时秒杀
          </Text>
          <div style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#c41d7f',
            fontFamily: 'monospace'
          }}>
            <CountDown duration={remaining} format="HH:mm:ss" />
          </div>
          <Text type="secondary">距离活动结束还剩</Text>
        </Space>
      </div>
      <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#c41d7f' }}>¥99</div>
          <Text type="secondary">秒杀价</Text>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, color: '#999', textDecoration: 'line-through' }}>¥299</div>
          <Text type="secondary">原价</Text>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, color: '#52c41a', fontWeight: 'bold' }}>限量100件</div>
          <Text type="secondary">库存</Text>
        </div>
      </Space>
    </Space>
  );
};

render(<BaseExample />);

```

- Timer 示例
- 展示 Timer 计时器组件的各种用法，包括自定义起始点、设置最大时长、Ref 控制、工作计时器、在线考试等
- _CountDown(@kne/current-lib_count-down)[import * as _CountDown from "@kne/count-down"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { default: CountDown, Timer } = _CountDown;
const { Space, Card, Button, Typography, Alert, Progress, Statistic, Row, Col } = antd;
const { useState, useRef } = React;

const { Title, Text } = Typography;

const BaseExample = () => {
  const [logMessages, setLogMessages] = useState([]);

  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setLogMessages(prev => [&#96;[${timestamp}] ${message}&#96;, ...prev].slice(0, 10));
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* 示例1: 基础计时器 */}
      <Card title="基础计时器（从0开始）" size="small">
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#1890ff' }}>
            <Timer />
          </div>
          <Text type="secondary">默认从0开始自动计时</Text>
        </Space>
      </Card>

      {/* 示例2: 自定义起始点 */}
      <Card title="从指定起点开始计时" size="small">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="center">
            <Text width={120}>从30秒开始: </Text>
            <Text code style={{ fontSize: 20 }}>
              <Timer start={30} />
            </Text>
          </Space>
          <Space align="center">
            <Text width={120}>从1分钟开始: </Text>
            <Text code style={{ fontSize: 20 }}>
              <Timer start={60} format="mm:ss" />
            </Text>
          </Space>
          <Space align="center">
            <Text width={120}>从5分钟开始: </Text>
            <Text code style={{ fontSize: 20 }}>
              <Timer start={300} format="mm:ss" />
            </Text>
          </Space>
        </Space>
      </Card>

      {/* 示例3: 设置最大时长 */}
      <Card title="设置最大时长" size="small">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>限时2分钟（从0开始计时到120秒）</Text>
            <div style={{ marginTop: 8, padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: '#52c41a', textAlign: 'center' }}>
                <Timer start={0} duration={120} format="mm:ss" />
              </div>
            </div>
          </div>
          <div>
            <Text strong>限时30秒（从10秒开始计时到40秒）</Text>
            <div style={{ marginTop: 8, padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: '#faad14', textAlign: 'center' }}>
                <Timer start={10} duration={30} format="mm:ss" />
              </div>
            </div>
          </div>
        </Space>
      </Card>

      {/* 示例4: Ref控制方法 */}
      <Card title="Ref 控制方法" size="small">
        <TimerControlExample />
      </Card>

      {/* 示例5: 不同时间格式 */}
      <Card title="自定义时间格式" size="small">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
            <Text>标准格式 (HH:mm:ss): </Text>
            <Text strong style={{ marginLeft: 8, color: '#1890ff' }}>
              <Timer start={3665} format="HH:mm:ss" />
            </Text>
          </div>
          <div style={{ padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
            <Text>中文格式 (mm分ss秒): </Text>
            <Text strong style={{ marginLeft: 8, color: '#52c41a' }}>
              <Timer start={125} format="mm分ss秒" />
            </Text>
          </div>
          <div style={{ padding: 8, background: '#f0f0f0', borderRadius: 4 }}>
            <Text>纯秒数 (s[s]): </Text>
            <Text strong style={{ marginLeft: 8, color: '#ff4d4f' }}>
              <Timer start={90} format="s[s]" />
            </Text>
          </div>
        </Space>
      </Card>

      {/* 示例6: 回调函数 */}
      <Card title="回调函数监听" size="small">
        <TimerCallbackExample addLog={addLog} logMessages={logMessages} />
      </Card>

      {/* 示例7: 函数式子组件 */}
      <Card title="函数式子组件" size="small">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space>
            <Text>进度条样式: </Text>
            <Timer start={0} duration={120}>
              {timeStr => (
                <Space direction="vertical" style={{ width: 200 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>{timeStr}</Text>
                    <Text type="secondary">/ 02:00</Text>
                  </div>
                  <Progress percent={30} showInfo={false} strokeColor="#1890ff" />
                </Space>
              )}
            </Timer>
          </Space>
          <Space>
            <Text>仪表盘样式: </Text>
            <Timer start={0} duration={60}>
              {timeStr => (
                <div style={{ textAlign: 'center' }}>
                  <Statistic value={timeStr} valueStyle={{ fontSize: 32, color: '#1890ff' }} suffix="秒" />
                </div>
              )}
            </Timer>
          </Space>
        </Space>
      </Card>

      {/* 示例8: 工作计时器 */}
      <Card title="工作计时器场景" size="small">
        <WorkTimerExample />
      </Card>

      {/* 示例9: 在线考试计时 */}
      <Card title="在线考试计时器" size="small">
        <ExamTimerExample />
      </Card>

      {/* 示例10: 对比 CountDown 和 Timer */}
      <Card title="CountDown vs Timer 对比" size="small">
        <ComparisonExample />
      </Card>
    </Space>
  );
};

// Timer 控制示例
const TimerControlExample = () => {
  const timerRef = useRef();

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', padding: 16, background: '#f5f5f5', borderRadius: 4 }}>
        <div style={{ fontSize: 28, fontWeight: 'bold', color: '#722ed1' }}>
          <Timer ref={timerRef} start={0} format="mm:ss" />
        </div>
      </div>
      <Space wrap>
        <Button type="primary" onClick={() => timerRef.current?.restart()}>
          重置
        </Button>
        <Button onClick={() => timerRef.current?.start()}>开始</Button>
        <Button onClick={() => timerRef.current?.pause()}>暂停</Button>
        <Button onClick={() => timerRef.current?.switch()}>切换</Button>
        <Button
          onClick={() => {
            const time = timerRef.current?.getTime();
            console.log('当前时间:', time);
          }}>
          获取时间
        </Button>
      </Space>
    </Space>
  );
};

// Timer 回调示例
const TimerCallbackExample = ({ addLog, logMessages }) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Timer
        start={0}
        duration={30}
        onProgress={time => {
          if (time > 0 && time % 10 === 0) {
            addLog(&#96;已计时: ${time}秒&#96;);
          }
        }}
        onComplete={() => {
          addLog('计时结束！达到最大时长30秒');
        }}
      />
      <Alert
        message="日志"
        description={
          <div style={{ maxHeight: 150, overflow: 'auto' }}>
            {logMessages.map((msg, index) => (
              <div key={index} style={{ fontSize: 12, lineHeight: 1.8 }}>
                {msg}
              </div>
            ))}
            {logMessages.length === 0 && <Text type="secondary">暂无日志</Text>}
          </div>
        }
        type="info"
      />
    </Space>
  );
};

// 工作计时器示例
const WorkTimerExample = () => {
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [workTime, setWorkTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);

  const handleComplete = () => {
    setIsWorkMode(!isWorkMode);
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div
        style={{
          padding: '16px',
          background: isWorkMode ? '#e6f7ff' : '#f6ffed',
          borderRadius: 8,
          border: &#96;1px solid ${isWorkMode ? '#91d5ff' : '#b7eb8f'}&#96;
        }}>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: 18, color: isWorkMode ? '#1890ff' : '#52c41a' }}>
            {isWorkMode ? '💼 工作时间' : '☕ 休息时间'}
          </Text>
          <div
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: isWorkMode ? '#1890ff' : '#52c41a',
              fontFamily: 'monospace'
            }}>
            <Timer key={isWorkMode ? 'work' : 'break'} start={0} duration={isWorkMode ? 25 * 60 : 5 * 60} format="mm:ss" onComplete={handleComplete} />
          </div>
          <Text type="secondary">{isWorkMode ? '番茄工作法：工作25分钟' : '休息5分钟'}</Text>
        </Space>
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="今日工作时长" value={workTime} suffix="分钟" valueStyle={{ color: '#1890ff' }} />
        </Col>
        <Col span={12}>
          <Statistic title="今日休息时长" value={breakTime} suffix="分钟" valueStyle={{ color: '#52c41a' }} />
        </Col>
      </Row>
    </Space>
  );
};

// 在线考试计时示例
const ExamTimerExample = () => {
  const [examStatus, setExamStatus] = useState('waiting'); // waiting, started, ended

  const handleStart = () => {
    setExamStatus('started');
  };

  const handleComplete = () => {
    setExamStatus('ended');
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Card
        size="small"
        style={{
          background: examStatus === 'waiting' ? '#f5f5f5' : examStatus === 'started' ? '#fff7e6' : '#f6ffed'
        }}>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: 16 }}>
            📝 {examStatus === 'waiting' ? '等待开始考试' : examStatus === 'started' ? '考试进行中' : '考试已结束'}
          </Text>

          {examStatus === 'waiting' && (
            <Button type="primary" size="large" onClick={handleStart}>
              开始考试
            </Button>
          )}

          {examStatus === 'started' && (
            <>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#fa8c16',
                  fontFamily: 'monospace'
                }}>
                <Timer key="exam" start={0} duration={60 * 60} format="HH:mm:ss" onComplete={handleComplete} />
              </div>
              <Text type="secondary">剩余时间：60分钟</Text>
            </>
          )}

          {examStatus === 'ended' && (
            <>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#52c41a'
                }}>
                00:00:00
              </div>
              <Text type="success">考试时间已到，请立即提交试卷</Text>
            </>
          )}
        </Space>
      </Card>

      <div style={{ padding: 12, background: '#fafafa', borderRadius: 4 }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text strong>考试信息</Text>
          <Text>科目：JavaScript 基础测试</Text>
          <Text>总分：100分</Text>
          <Text>时长：60分钟</Text>
          <Text>题目数：50题</Text>
        </Space>
      </div>
    </Space>
  );
};

// CountDown 和 Timer 对比示例
const ComparisonExample = () => {
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="CountDown (倒计时)" headStyle={{ background: '#fff1f0', borderColor: '#ffa39e' }}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: '#ff4d4f' }}>
                <CountDown duration={60} format="mm:ss" />
              </div>
              <Text type="secondary">从60秒递减到0</Text>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Timer (计时器)" headStyle={{ background: '#f6ffed', borderColor: '#b7eb8f' }}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: '#52c41a' }}>
                <Timer start={0} duration={60} format="mm:ss" />
              </div>
              <Text type="secondary">从0秒递增到60</Text>
            </Space>
          </Card>
        </Col>
      </Row>
      <Alert
        message="区别说明"
        description={
          <div>
            <Text strong>CountDown：</Text>从指定时长开始递减，常用于倒计时、验证码等场景
            <br />
            <Text strong>Timer：</Text>从起点开始递增，可设置最大时长，常用于计时器、工作记录等场景
          </div>
        }
        type="info"
      />
    </Space>
  );
};

render(<BaseExample />);

```

### API

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
