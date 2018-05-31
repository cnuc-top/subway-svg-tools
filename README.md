# 地铁线路图 SVG 解析工具

Subway Svg Tools

本工具用于将 SVG 格式地铁线路图解析为 JSON 格式

## 图层命名设置

**使用 Adobe Illustrator**

| 图层名     | 类型     | 矢量类型 |
| ---------- | -------- | -------- |
| line       | 线路图   | polyline |
| station    | 普通车站 | circle   |
| station-ex | 换乘车站 | rect     |
| text       | 站名     | text     |

## 使用方法

将导出的 Svg 文件放入 **file 文件夹**

运行
```shell
npm install

node ./src
```

## 输出格式

```json
{
  "title": "ningbo-subway",
  "width": 1500,
  "height": 1200,
  "lines": [
    {
      "id": "line-1",
      "name": "1号线",
      "points": "110.5 616.5 1009 616.5 1316.5 616.5 1316.5 325 1474.5 325",
      "color": "#009dd7"
    }
    // ...
  ],
  "stations": [
    {
      "name": "鼓楼",
      "x": "526.5",
      "y": "612.2",
      "width": "16",
      "height": "9",
      "type": 2
    }
    // ...
  ],
  "texts": [
    { "title": "鼓楼", "x": 544.33, "y": 602.5 }
    // ...
  ]
}
```

## 相关项目

**网页展示：**

https://github.com/cnuc-top/ningbo-subway

**在线浏览：**

http://subway.cnnbuc.com