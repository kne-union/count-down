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
