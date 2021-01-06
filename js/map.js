window.curdata = null;
window.tmpSeriesData = [];
window.pieces;
window.str;
function getDate(date) {
    window.curdate = date
}
function getData(url) {
    // console.log(url);
    let data = null;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {/*XHR对象获取到返回信息后执行*/
        if (request.readyState === 4 && request.status === 200) {/*返回状态为200，即为数据获取成功*/
            data = JSON.parse(request.responseText);
        }
    }
    request.open("get", url, false);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    return data;
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
// 展示对应的省
function showProvince(pName, Chinese_,data) {
    // console.log(data);
    //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
    loadBdScript('$' + Chinese_ + 'JS', '../js/map/province/' + Chinese_ + '.js', function () {
        initEcharts(pName, Chinese_,data);
    });
}

function dataManage(pName,data) {

    tmpSeriesData = []

    if($('.buttons>button:nth-of-type(1)').hasClass('select')){
        if (pName === 'china') {
            provincesText1.forEach(function (value,index) {
                data.forEach((item)=>{
                    if(item.province===value){
                        //执行代码
                        let ser = {
                            name: provincesText[index],
                            value: item.confirmed
                        };

                        tmpSeriesData.push(ser);
                    }
                })
            })
            str = `${curdate} 全国累计确诊总人数为:${data[0].confirmed}人`
            // console.log(str);
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
        pieces = pName === "china" ? chinaPieces1 : proPieces1;
    }
    else if($('.buttons>button:nth-of-type(2)').hasClass('select')){
        if (pName === 'china') {
            provincesText1.forEach(function (value,index) {
                data.forEach((item)=>{
                    if(item.province===value){
                        //执行代码
                        let ser = {
                            name: provincesText[index],
                            value: item.cured
                        };

                        tmpSeriesData.push(ser);
                    }
                })
            })
            str = `${curdate} 全国累计治愈总人数为:${data[0].cured}人`
        }else {
            data.forEach((item)=>{
                //执行代码
                if (item.province === pName) {

                    let ser = {
                        name: item.city,
                        value: item.cured
                    }
                    tmpSeriesData.push(ser);
                }
            })
        }
        pieces = pName === "china" ? chinaPieces2 : proPieces2;
    }
    else if($('.buttons>button:nth-of-type(3)').hasClass('select')){
        if (pName === 'china') {
            provincesText1.forEach(function (value,index) {
                data.forEach((item)=>{
                    if(item.province===value){
                        //执行代码
                        let ser = {
                            name: provincesText[index],
                            value: item.dead
                        };

                        tmpSeriesData.push(ser);
                    }
                })
            })
            str = `${curdate} 全国累计死亡总人数为:${data[0].dead}人`
        }else {
            data.forEach((item)=>{
                //执行代码
                if (item.province === pName) {

                    let ser = {
                        name: item.city,
                        value: item.dead
                    }
                    tmpSeriesData.push(ser);
                }
            })
        }
        pieces = pName === "china" ? chinaPieces3 : proPieces3;
    }

    console.log(pName,tmpSeriesData);
}

// 初始化echarts
function initEcharts(pName, Chinese_,data) {


    dataManage(pName,data)


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
            top: '55%'
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
        ],
        graphic:[{
            type:'group',
            left: 'center',
            button:130,
            children:[
                {
                    type:'text',
                    z:100,
                    // left: 'center',
                    // top:'middle',
                    position:[270,500],
                    style:{
                        fill:"#333",
                        text:str,
                        font:'14px Microsoft YaHei'
                    }
                }
            ]
        }]
    };
    myChart.clear()
    myChart.setOption(option,true);

    myChart.off("click");

    if (pName === "china") { // 全国时，添加click 进入省级
        myChart.on('dblclick', function (param) {
            // console.log(tmpSeriesData);
            // console.log(param.name);
            //遍历取到provincesText 中的下标  去拿到对应的省js
            for (let i = 0; i < provincesText.length; i++) {
                if (param.name === provincesText[i]) {
                    //显示对应省份的方法
                    console.log("wuhusad12",curdata);
                    showProvince(provincesText[i], provinces[i],curdata);
                    break;
                }
            }
        });
    } else { // 省份，添加双击 回退到全国
        myChart.on("click", function () {
            // initEcharts("china", "中国",data);
        });
    }

}

function renderMap(url){



    window.myChart = echarts.init(document.getElementById('china-map'));
    window.oBack = document.getElementById("back");

    window.provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];

    window.provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];
    window.provincesText1 = ['上海市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '北京市', '天津市', '重庆市', '香港', '澳门'];

    window.chinaPieces1 = [
        {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '确诊500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '确诊100-499人', color: '#974236'},
        {min: 10, max: 99, label: '确诊10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7'},
    ];

    window.proPieces1 = [
        {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '确诊500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '确诊100-499人', color: '#974236'},
        {min: 10, max: 99, label: '确诊10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7'},
    ];

    window.chinaPieces2 = [
        {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '治愈500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '治愈100-499人', color: '#974236'},
        {min: 10, max: 99, label: '治愈10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '治愈1-9人', color: '#f5bba7'},
    ];

    window.proPieces2 = [
        {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '治愈500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '治愈100-499人', color: '#974236'},
        {min: 10, max: 99, label: '治愈10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '治愈1-9人', color: '#f5bba7'},
    ];

    window.chinaPieces3 = [
        {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '死亡500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '死亡100-499人', color: '#974236'},
        {min: 10, max: 99, label: '死亡10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '死亡1-9人', color: '#f5bba7'},
    ];

    window.proPieces3 = [
        {min: 1000, max: 1000000, label: '死亡等于1000人', color: '#372a28'},
        {min: 500, max: 999, label: '死亡500-999人', color: '#4e160f'},
        {min: 100, max: 499, label: '死亡100-499人', color: '#974236'},
        {min: 10, max: 99, label: '死亡10-99人', color: '#ee7263'},
        {min: 1, max: 9, label: '死亡1-9人', color: '#f5bba7'},
    ];


    let opromise = new Promise(function (resolve, reject) {
        let data = getData(url)
        setTimeout(function () {
            resolve(data)
        },500)
    })

    opromise.then(function (data) {
        oBack.onclick = function () {
            initEcharts("china", "中国",data);
        };

        curdata = data;

        initEcharts("china", "中国",data);
    })


}
function refreshData(data){
    curdata = data;
    // console.log('????',data);
    window.option = myChart.getOption()
    // initEcharts("china", "中国",data);
    dataManage('china',data)
    option.series[0].data = tmpSeriesData;
    // console.log(option.graphic[0],option.graphic[0].elements[1].style);
    // console.log(option.series[0]);
    option.graphic[0].elements[1].style.text=str
    myChart.setOption(option);

    oBack.onclick = function () {
        // initEcharts("china", "中国",data);
        dataManage('china',data)
        option.series[0].data = tmpSeriesData;
        myChart.setOption(option);
    };
}
exports.renderMap = renderMap
exports.getData = getData
exports.refreshData = refreshData
exports.getDate = getDate