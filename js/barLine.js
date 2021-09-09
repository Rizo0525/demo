function DrawbarLine(pNname,strstr,data) {
    // console.log(strstr);
    let all_name = []
    let city_conformed = []//存34个区域确诊断人数

    data.forEach(function (v,i) {
        if(v.value===0){
            return ;
        }
        all_name.push(v.name)
        city_conformed.push(v.value)
    })
    // console.log(all_name);

    // console.log(city_conformed);
    window.myChart2 = echarts.init(document.getElementById('barLine'));

    // console.log(myChart.getOption());
    // if(myChart.getOption())

    let option = {
        title: {
            text: `${curdate}${pNname}${strstr}汇总图`,
            left:'center',
            textStyle:{
                color:'#5ea8c9',
                fontFamily:'宋体',
                fontSize:16
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            width:'auto',
            height:'auto',
            left: '15%'
        },
        xAxis: {
            type: 'category',
            data: all_name
        },
        yAxis: {type: 'value'},
        series: [{
            data: city_conformed,
            type: 'bar',
            itemStyle:{
                // color: '#5337c2'
            }
            // symbol: 'circle',
            // symbolSize: 0,
            // lineStyle: {
            //     width: 4,
            //     type: 'dashed'
            // },
            // itemStyle: {
            //     borderWidth: 3,
            // }
        }],
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100
            }
        ]
    };
    myChart2.setOption(option);
}
function refreshbarLine(pNname,strstr,data){
    let all_name = []
    let city_conformed = []//存34个区域确诊断人数

    data.forEach(function (v,i) {
        if(v.value===0){
            return ;
        }
        all_name.push(v.name)
        city_conformed.push(v.value)
    })

    let option = myChart2.getOption()
    // console.log(option.title);
    // console.log(option.title[0].text);
    console.log(option.series[0].itemStyle);
    if(strstr==='确诊'){
        option.series[0].itemStyle.color='#C23632'
    }
    else if(strstr==='治愈'){
        option.series[0].itemStyle.color='#5337c2'
    }
    else if(strstr==='死亡'){
        option.series[0].itemStyle.color='#c567cb'
    }

    option.title[0].text = `${curdate}${pNname}${strstr}汇总图`
    // console.log(tmpdata);
    option.xAxis[0].data = all_name
    option.series[0].data = city_conformed
    // console.log(option.series[0]);
    myChart2.setOption(option)
}
exports.refreshbarLine = refreshbarLine
exports.DrawbarLine = DrawbarLine