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
    let myChart = echarts.init(document.getElementById('barLine'));

    // console.log(myChart.getOption());
    // if(myChart.getOption())

    let option = {
        title: {
            text: `${curdate}${pNname}${strstr}汇总图`,
            left:'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            width:'auto',
            height:'auto',
            left: '20%'
        },
        xAxis: {
            type: 'category',
            data: all_name
        },
        yAxis: {type: 'value'},
        series: [{
            data: city_conformed,
            type: 'bar'
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
    myChart.setOption(option);
}

exports.DrawbarLine = DrawbarLine