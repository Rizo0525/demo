function renderMap(url){
    console.log(url);
    let data;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {/*XHR对象获取到返回信息后执行*/
        if (request.readyState === 4 && request.status === 200) {/*返回状态为200，即为数据获取成功*/
            data = JSON.parse(request.responseText);
        }
    }
    request.open("get", url, false);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/


    let myChart = echarts.init(document.getElementById('china-map'));
    let oBack = document.getElementById("back");

    let provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

    let provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];


    let chinaPieces = [
        {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '确诊500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '确诊100-499人', color: '#974236'},
        {min: 10, max: 99, label: '确诊10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7'},
    ];

    let proPieces = [
        {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '确诊500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '确诊100-499人', color: '#974236'},
        {min: 10, max: 99, label: '确诊10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7'},
    ];

    oBack.onclick = function () {
        initEcharts("china", "中国");
    };

    initEcharts("china", "中国");

    // 初始化echarts
    function initEcharts(pName, Chinese_) {
        let tmpSeriesData = [];
        if (pName === 'china') {
            data.forEach((item)=>{
                //执行代码
                let ser = {
                    name: item.province,
                    value: item.confirmed
                };

                tmpSeriesData.push(ser);
            })
        }else {
            data.forEach((item)=>{
                //执行代码
                if (item.province === pName) {

                    let ser = {
                        name: item.city,
                        value: item.confirmed
                    }
                    tmpSeriesData.push(ser);
                }
            })
        }


        let pieces = pName === "china" ? chinaPieces : proPieces;

        let option = {
            title: {
                text: pName + '疫情图',
                left: 'center'
            },
            tooltip:{
                trigger:'item'
            },
            visualMap: {
                // mix:0,
                // max:10000,
                // text:["high","low"],
                type: 'piecewise',
                pieces: pieces,
                textStyle: {
                    color: '#000000'
                },
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                },
                top: '50%'
            },
            series: [
                {
                    name: pName,
                    type: 'map',
                    mapType: pName,
                    roam: false,//是否开启鼠标缩放和平移漫游
                    itemStyle: {//地图区域的多边形 图形样式
                        normal: {//是图形在默认状态下的样式
                            label: {
                                show: true,//是否显示标签
                                textStyle: {
                                    color: "rgba(255,255,255,0)"
                                }
                            }
                        },
                        emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                            label: { show: true }
                        }
                    },
                    data: tmpSeriesData,
                    top: "3%"//组件距离容器的距离
                }
            ]
        };

        myChart.setOption(option);

        myChart.off("click");

        if (pName === "china") { // 全国时，添加click 进入省级
            myChart.on('click', function (param) {
                //遍历取到provincesText 中的下标  去拿到对应的省js
                for (let i = 0; i < provincesText.length; i++) {
                    if (param.name === provincesText[i]) {
                        //显示对应省份的方法
                        showProvince(provincesText[i], provinces[i] );
                        break;
                    }
                }
            });
        } else { // 省份，添加双击 回退到全国
            myChart.on("dblclick", function () {
                initEcharts("china", "中国");
            });
        }
    }

    // 展示对应的省
    function showProvince(pName, Chinese_) {
        //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
        loadBdScript('$' + Chinese_ + 'JS', '../js/map/province/' + Chinese_ + '.js', function () {
            initEcharts(pName, Chinese_);
        });
    }

    // 加载对应的JS
    function loadBdScript(scriptId, url, callback) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        script.id = scriptId;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

}
exports.renderMap = renderMap