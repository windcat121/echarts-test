// 柱状图1模块
(function() {
    // 实例化对象
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    // 指定配置和数据
    var option = {
        color: ["#2f89cf"],
        //提示框
        tooltip: {
            trigger: "axis", //触发类型:axis类目轴或item非类目轴
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        //图表大小
        grid: {
            left: "0%",
            top: "10px",
            right: "0%",
            bottom: "4%",
            containLabel: true //grid 区域是否包含坐标轴的刻度标签
        },
        //x轴
        xAxis: [{
            type: "category",
            boundaryGap: true, // 坐标轴两边留白(默认就是true)
            data: [
                "旅游行业",
                "教育培训",
                "游戏行业",
                "医疗行业",
            ],
            //坐标轴刻度相关设置
            axisTick: {
                alignWithLabel: true //刻度线和标签对齐
            },
            //坐标轴刻度标签
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: "12"
                }
            },
            //坐标轴轴线
            axisLine: {
                show: false
            }
        }],
        yAxis: [{
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: "12"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    // width: 1,
                    type: "solid"
                }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线(默认数值轴显示，类目轴不显示)
                lineStyle: {
                    // color: 'yellow'
                    color: "rgba(255,255,255,.1)"
                }
            }
        }],
        series: [{
            name: "直接访问",
            type: "bar",
            barWidth: "35%", //柱子的宽度
            data: [200, 300, 300, 900],
            itemStyle: {
                barBorderRadius: 5 //圆角
            }
        }]
    };

    // 把配置给实例对象
    myChart.setOption(option);

    //让图表跟随屏幕自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });

    // 数据变化
    var dataAll = [
        { year: "2019", data: [200, 300, 300, 900] },
        { year: "2020", data: [300, 400, 350, 800] }
    ];

    //jquery写法：点击不同的a标签，改变series中的data
    $(".bar h2 ").on("click", "a", function() {
        //console.log($(this).index());//0或1
        option.series[0].data = dataAll[$(this).index()].data;
        myChart.setOption(option);
    });
})();

// 柱状图2模块:学习进度
(function() {
    //找到画图的区域
    var myChart = echarts.init(document.querySelector(".horization .chart"));
    //第一类柱子的颜色
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    var option = {
        grid: {
            left: '20%',
            bottom: '18%',
            containLabel: false, //grid区域是否包含刻度标签
        },
        xAxis: {
            type: 'value',
            boundaryGap: 'true',
            //坐标轴轴线
            axisLine: {
                show: false
            }
        },
        yAxis: [{
                type: 'category',
                //是否反向坐标轴
                inverse: true,
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: "12"
                    }
                },
                axisTick: { // 不显示刻度
                    show: false,
                    alignWithLabel: true
                },
                axisLine: { //不显示y轴线条
                    show: false
                },
                data: ['NODE', 'VUE', 'javascript', 'CSS3', 'HTML5']
            },
            {
                type: 'category',
                inverse: true,
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: "12"
                    }
                },
                axisTick: { // 不显示刻度
                    show: false,
                    alignWithLabel: true
                },
                axisLine: { //不显示y轴线条
                    show: false
                },
                data: [100, 200, 300, 400, 500]
            }
        ],
        series: [{
                type: 'bar',
                name: "条",
                //相当于CSS中的z-index,一个柱子设为0，一个柱子设为1，表示两个柱子叠加效果
                yAxisIndex: 0,
                // 柱子之间的距离
                barCategoryGap: 50,
                data: [70, 80, 10, 78, 69],
                barWidth: 10, //柱子的宽度
                //柱子的样式
                itemStyle: {
                    barBorderRadius: 5, //圆角
                    color: function(params) { //给柱子设置颜色
                        //console.log(params);params指的是柱子对象， dataIndex 是当前柱子的索引号
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    }
                },
                // 柱子上的文本标签
                label: {
                    show: true,
                    // 图形内显示
                    position: 'inside',
                    // 文字的显示格式:c指的是data中的数据值
                    formatter: "{c}%"
                }
            },
            {
                name: "框",
                type: 'bar',
                yAxisIndex: 1,
                barCategoryGap: 50,
                data: [100, 100, 100, 100, 100],
                barWidth: 15, //柱子的宽度
                itemStyle: {
                    color: 'none',
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15 //圆角
                }
            }
        ]
    };
    myChart.setOption(option);
    //让图表跟随屏幕自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

//折线图1：游客与粉丝数量趋势图
(function() {
    var myChart = echarts.init(document.querySelector(".count .chart"));
    var option = {
        //系列的颜色
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            right: '3%', //图例组件离容器右侧的距离
            textStyle: { //图例文字的样式
                color: 'rgba(255, 255, 255, 0.5)'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.5)'
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.5)'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        series: [{
                name: '新增粉丝',
                type: 'line',
                // 折线修饰为圆滑
                smooth: true,
                stack: '总量',
                data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
            },
            {
                name: '新增游客',
                type: 'line',
                // 折线修饰为圆滑
                smooth: true,
                stack: '总量',
                data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            }
        ]
    };
    myChart.setOption(option);

    //让图表跟随屏幕自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });

    var yearData = [{
            year: '2019', // 年份
            data: [ // 两个数组是因为有两条线
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ]
        },
        {
            year: '2020', // 年份
            data: [ // 两个数组是因为有两条线
                [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
            ]
        }
    ];
    //jquery写法：点击不同的a标签，改变series中的data
    $(".count h2 ").on("click", "a", function() {
        //console.log($(this).index()); //0或1
        option.series[0].data = yearData[$(this).index()].data[0];
        option.series[1].data = yearData[$(this).index()].data[1];
        myChart.setOption(option);
    });
})();

//折线图2：复杂趋势图
(function() {
    //1找到chart
    var myChart = echarts.init(document.querySelector(".trend .chart"));
    //2设定配置项
    var option = {
        tooltip: {
            trigger: 'axis',

        },
        legend: {
            right: '3%', //图例组件离容器右侧的距离
            textStyle: { //图例文字的样式
                color: 'rgba(255, 255, 255, 0.5)'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.5)'
            },
            axisTick: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.5)'
            },
            axisTick: false,
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }],
        series: [{
                name: '邮件营销',
                type: 'line',
                smooth: true,
                // 单独修改线的样式
                lineStyle: {
                    color: "#0184d5",
                    width: 3
                },
                areaStyle: {
                    // 渐变色，只需要复制即可
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1, [{
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)" //图形阴影的模糊大小

                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 8,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 3
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1, [{
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 8,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };
    //3将配置项option设给chart
    myChart.setOption(option);
    //4让图表跟随屏幕自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

//饼图：年龄分布
(function() {
    var myChart = echarts.init(document.querySelector(".age .chart"));
    var option = {
        color: [
            "#065aab",
            "#066eab",
            "#0682ab",
            "#0696ab",
            "#06a0ab",
        ],
        tooltip: {
            trigger: 'item', //类目触发，axis是坐标轴触发
            formatter: '{a}<br />{b}:{c}({d}%)'
                //a:年龄分布:series里的name
                //b:搜索引擎：series里的data的name
                //c:1048：series里的data的value
                //d:echarts自己将值换算的百分数
        },
        legend: {
            bottom: '0%',
            // 距离底部为0%
            bottom: "0%",
            // 小图标的宽度和高度
            itemWidth: 10,
            itemHeight: 10,
            textStyle: { //图例文字的样式
                color: 'rgba(255, 255, 255, 0.5)'
            }

        },
        series: [{
            name: '年龄分布',
            type: 'pie',
            // 设置饼形图在容器中的位置           
            center: ["50%", "50%"],
            //内圆半径和外圆半径
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            //// 不显示标签文字
            label: {
                show: false
            },
            // 不显示连接线(图形和文字之间的线)
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
                { value: 300, name: '视频广告' }
            ]
        }]
    };
    myChart.setOption(option);

    //4让图表跟随屏幕自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
})();

//玫瑰饼图
(function() {
    var myChart = echarts.init(document.querySelector(".rose .chart"));

    var option = {
        color: [
            "#065aab",
            "#066eab",
            "#0682ab",
            "#0696ab",
            "#06a0ab",
        ],
        tooltip: {
            trigger: 'item', //类目触发，axis是坐标轴触发
            formatter: '{a}<br />{b}:{c}({d}%)'
                //a:年龄分布:series里的name
                //b:搜索引擎：series里的data的name
                //c:1048：series里的data的value
                //d:自己换算的百分数
        },
        legend: {
            // 距离底部为0%
            bottom: "0%",
            // 小图标的宽度和高度
            itemWidth: 10,
            itemHeight: 10,
            textStyle: { //图例文字的样式
                color: 'rgba(255, 255, 255, 0.5)'
            }

        },
        series: [{
            name: '地区分布',
            type: 'pie',
            // 设置饼形图在容器中的位置           
            center: ["50%", "50%"],
            //内圆半径和外圆半径
            radius: ['10%', '60%'],
            roseType: "radius", //饼形图的显示模式:半径模式
            avoidLabelOverlap: false,
            //显示标签文字
            label: {
                show: true,
                // color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '15',

            },
            // 显示连接线(图形和文字之间的线)
            labelLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                },
                smooth: 0.2,
                //以下两个指线的长度
                length: 10, //连接扇形图线长
                length2: 20 //连接文字线长
            },
            data: [
                { value: 1048, name: '西安' },
                { value: 735, name: '深圳' },
                { value: 580, name: '杭州' },
                { value: 484, name: '安康' },
                { value: 300, name: '上海' }
            ]
        }]
    };
    myChart.setOption(option);

    //4让图表跟随屏幕自适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });

})();

//地图模块
(function() {
    var myChart = echarts.init(document.querySelector('.map .chart'));

    //地图的经纬度相关数据(不要改！！！)
    var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028],
    };

    //航线数据
    var XAData = [
        [{ name: '西安' }, { name: '拉萨', value: 100 }],
        [{ name: '西安' }, { name: '西宁', value: 100 }],
        [{ name: '西安' }, { name: '深圳', value: 100 }],
    ];

    var XNData = [
        [{ name: '西宁' }, { name: '北京', value: 100 }],
        [{ name: '西宁' }, { name: '上海', value: 100 }],
    ];

    var YCData = [
        [{ name: '深圳' }, { name: '西安', value: 100 }]

    ];

    var planePath =
        'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    //var planePath = 'arrow';
    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];

            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value,
                });
            }
        }
        return res;
    };

    var color = ['red', 'green', 'cyan']; //航线的颜色
    var series = [];
    [
        ['西安', XAData],
        ['西宁', XNData],
        ['深圳', YCData],
    ].forEach(function(item, i) {
        series.push({ //不带飞机的线条
            name: item[0] + ' Top3',
            type: 'lines', //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: 'red', //arrow箭头的颜色
                symbolSize: 3,
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2,
                },
            },
            data: convertData(item[1]),
        }, { //带飞机的线条
            name: item[0] + ' Top3',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15,
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2,
                },
            },
            data: convertData(item[1]),
        }, { //终点城市的圈圈效果
            name: item[0] + ' Top3',
            type: 'effectScatter', //带有涟漪特效动画的散点（气泡）图
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke',
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                },
            },
            symbolSize: function(val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i],
                },
                emphasis: {
                    areaColor: '#2B91B7',
                },
            },
            data: item[1].map(function(dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                };
            }),
        });
    });


    var option = {
        tooltip: {
            trigger: 'item',
            //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            formatter: function(params, ticket, callback) {
                if (params.seriesType == 'effectScatter') { //图上的城市大圆点
                    return '线路：' + params.data.name + '' + params.data.value[2];
                } else if (params.seriesType == 'lines') { //图上的线路
                    return params.data.fromName + '>' + params.data.toName + '<br />' + params.data.value;
                } else {
                    return params.name;
                }
            },
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            bottom: '0%',
            // data: ['西安 Top3', '西宁 Top3', '深圳 Top3'],
            textStyle: {
                color: '#fff',
            },
            selectedMode: 'multiple',
        },
        geo: {
            map: 'china',
            zoom: 1.2, //地图放大
            label: {
                emphasis: {
                    show: true,
                    color: '#fff',
                },
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: 'rgba(2, 28, 121,0.8)', //地图省份背景
                    borderColor: '#195BB9',
                    borderWidth: 1,
                },
                emphasis: {
                    areaColor: '#2B91B7',
                },
            },
        },
        series: series,
    };

    myChart.setOption(option);

    //缩放，适配屏幕
    window.addEventListener("resize", function() {
        myChart.resize();
    });



})();

var t = null;
t = setTimeout(time, 1000); //開始运行
function time() {
    clearTimeout(t); //清除定时器
    dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours(); //获取时
    var m = dt.getMinutes(); //获取分
    var s = dt.getSeconds(); //获取秒
    document.querySelector(".showTime").innerHTML = '当前时间：' + y + "年" + mt + "月" + day + "日-" + h + "时" + m + "分" + s + "秒";
    t = setTimeout(time, 1000); //设定定时器，循环运行     
}