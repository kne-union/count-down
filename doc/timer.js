const { default: CountDown, Timer } = _CountDown;
const { Space, Card, Button, Typography, Alert, Progress, Statistic, Row, Col } = antd;
const { useState, useRef } = React;

const { Title, Text } = Typography;

const BaseExample = () => {
  const [logMessages, setLogMessages] = useState([]);

  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setLogMessages(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 10));
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
            addLog(`已计时: ${time}秒`);
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
          border: `1px solid ${isWorkMode ? '#91d5ff' : '#b7eb8f'}`
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
