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
