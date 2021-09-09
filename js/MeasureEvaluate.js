function MeasureGetDate() {
    let path = '../output/MeasureEvaluation.json'
    let request = new XMLHttpRequest();
    let data = null
    request.onreadystatechange = function () {/*XHR对象获取到返回信息后执行*/
        if (request.readyState === 4 && request.status === 200) {/*返回状态为200，即为数据获取成功*/
            data = JSON.parse(request.responseText);
        }
    }
    request.open("get", path, false);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    return data;
}
function MeasureInit() {
    let data = MeasureGetDate()
    console.log(data);
    let provinces = []

    data.forEach(function (v) {
        provinces.push(v.province)
    })
    console.log(provinces);
    let tmp = []
    data.forEach(function (v) {
        let tmp1 = []
        tmp1.push(v.deathRate);
        tmp1.push(v.cureRate);
        tmp1.push(v.rebounce);
        tmp1.push(v.control);
        tmp1.push(v.class);
        tmp.push(tmp1)
    })
    console.log(tmp);

    let dv1 = []
    let dv4 = []
    tmp.forEach(function (v) {
        dv1 = []
        dv1.push(v)
        dv4.push(dv1)
    })


    // console.log('div',dv2);
    // console.log('dv3',dv3);
    let schema = [
        {name: 'deathRate', index: 0, text: '死亡率(%)'},
        {name: 'cureRate', index: 1, text: '治愈率(%)'},
        {name: 'rebounce', index: 2, text: '疫情反弹控制力'},
        {name: 'control', index: 3, text: '控制力度'},
        {name: 'class', index: 4, text: '防疫等级'},
    ];

    let lineStyle = {
        normal: {
            width: 2,
            opacity: 0.5
        }
    };

    let series=[];    //定义一个数组变量用于存放配置


    function rgb() {//rgb颜色随机
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let rgb = `rgb(${r},${g},${b})`;
        return rgb;
    }
    let color = []
    for(let i =0;i<34;i++){
        color.push(rgb())
    }

    for(let i = 0;i<provinces.length;i++){
        series.push({
            name: provinces[i],
            type: 'parallel',
            lineStyle: lineStyle,
            data: dv4[i],
            color:color
        });
    }

    console.log(series);

    let chart  = echarts.init(document.getElementById('MeausreEva'));
    let option = {
        title: {
            text: `疫情防控措施评估`,
            left:'center',
            textStyle:{
                color:'#5ea8c9',
                fontFamily:'宋体',
                fontSize:16
            }
        },
        backgroundColor: '#ccc',
        color:color,
        legend: {
            bottom: 30,
            data: provinces,
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1
        },
        // dataZoom: {
        //     show: true,
        //     orient: 'vertical',
        //     parallelAxisIndex: [0]
        // },
        parallelAxis: [
            {dim: 0, name: schema[0].text},
            {dim: 1, name: schema[1].text},
            {dim: 2, name: schema[2].text},
            {dim: 3, name: schema[3].text},
            {dim: 4, name: schema[4].text,
                type: 'category', data: ['优', '良','中']}
        ],
        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 60,
        //     dimension: 2,
        //     inRange: {
        //         color: ['#d94e5d','#eac736','#50a3ba'].reverse(),
        //         // colorAlpha: [0, 1]
        //     }
        // },
        parallel: {
            left: '5%',
            right: '18%',
            bottom: 100,
            parallelAxisDefault: {
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                axisLine: {
                    lineStyle: {
                        color: '#aaa'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#fff'
                }
            }
        },
        series: series
    };

    chart.setOption(option)
}
exports.MeasureInit = MeasureInit
