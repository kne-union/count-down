| 属性名        | 说明            | 类型                    | 默认值     |
|------------|---------------|-----------------------|---------|
| duration   | 倒计时总时间        | number                | 60      |
| autoplay   | 初始化完成后自动开始计时  | boolean               | true    |
| unit       | 倒计时单位         | string(dayjs可接受的时间单位) | seconds |
| format     | 显示格式化         | string                | mm:ss   |
| onProgress | 倒计时单位时间间隔触发一次 | function              | -       |
| onComplete | 倒计时完成后触发      | function              | -       |

#### ref.current

| 属性名     | 说明                    | 类型       | 默认值 |
|---------|-----------------------|----------|-----|
| restart | 重新开始倒计时               | function | -   |
| pause   | 暂停倒计时                 | function | -   |
| start   | 开始倒计时                 | function | -   |
| switch  | 开始/暂停倒计时(根据当前状态来进行切换) | function | -   |
| getTime | 获取当前剩余时间              | function | -   |

### Timer

| 属性名        | 说明           | 类型                    | 默认值     |
|------------|--------------|-----------------------|---------|
| duration   | 计时总时间        | number                | 60      |
| autoplay   | 初始化完成后自动开始计时 | boolean               | true    |
| unit       | 计时单位         | string(dayjs可接受的时间单位) | seconds |
| format     | 显示格式化        | string                | mm:ss   |
| onProgress | 计时单位时间间隔触发一次 | function              | -       |
| onComplete | 计时完成后触发      | function              | -       |

#### ref.current

| 属性名     | 说明                   | 类型       | 默认值 |
|---------|----------------------|----------|-----|
| restart | 重新开始计时               | function | -   |
| pause   | 暂停计时                 | function | -   |
| start   | 开始计时                 | function | -   |
| switch  | 开始/暂停计时(根据当前状态来进行切换) | function | -   |
| getTime | 获取当前时间               | function | -   |