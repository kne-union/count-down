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
    setLogMessages(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 10));
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
                    addLog(`当前剩余时间: ${time}秒`);
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
                      addLog(`倒计时: ${time}秒 - 注意时间即将结束`);
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
