window.tmp = []

function addZero(num){
    num = String(num)
    if(num.length===1){
        num = 0 + num
    }
    return num
}
function drawBrokenLine() {
    let date1=new Date(2019,11,1);
    let date2=new Date(2020,11,8);
    let daymis=24*3600*1000;
    let now=date1;
    let opromise
    window.myChart3 = echarts.init(document.getElementById('brokenLine'));
    while(now<date2){
        let time = now.getFullYear()+"-"+(addZero(now.getMonth()+1))+"-"+addZero(now.getDate())
        let path = `../output/${time}.json`
        opromise = new Promise(function (resolve) {
            d3.json(path,function (json) {
                tmp.push(json[0])
            })
            setTimeout(function () {
                resolve(tmp)
            },500)
        })
        //请求数据
        now=new Date(now.getTime()+daymis);
    }
    opromise.then(function (data) {
        // console.log('data:',data);
        let tmpdata = []
        let str;
        data.sort(function (a,b) {
            return (a.date>b.date)?1:-1
        })
        console.log(data);
        data.forEach(function (v,i) {
            tmpdata.push({date:v.date,value:v.confirmed})
        })
        str = '确诊'

        let option = {
            title: {
                text: `全国疫情${str}人数汇总图`,
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
                data: tmpdata.map(function (item) {
                    return item.date
                })
            },
            yAxis: {type: 'value'},
            series: [{
                data: tmpdata.map(function (item) {
                    return item.value
                }),
                type: 'line'
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
        
        myChart3.setOption(option);

    })
}
function refreshBrokenLine() {
    // console.log(tmp);

    setTimeout(function () {
        let tmpdata = []
        let str;
        // console.log('tmp:',tmp);
        if($('.buttons>button:nth-of-type(1)').hasClass('select')){
            tmp.forEach(function (v,i) {
                let obj = {date:v.date,value:v.confirmed}
                tmpdata.push(obj)
            })
            str = '确诊'
            // console.log('tmp1:',tmp);
            // console.log(str);
            // console.log('tmpdata:',tmpdata);
        }
        else if($('.buttons>button:nth-of-type(2)').hasClass('select')){
            tmp.forEach(function (v,i) {
                tmpdata.push({date:v.date,value:v.cured})
            })
            str = '治愈'
        }
        else if($('.buttons>button:nth-of-type(3)').hasClass('select')){
            tmp.forEach(function (v,i) {
                tmpdata.push({date:v.date,value:v.dead})
            })
            str = '死亡'
        }
        let option = myChart3.getOption()
        // console.log(option.title);
        // console.log(option.title[0].text);
        option.title[0].text = `全国疫情 ${str} 人数汇总图`
        // console.log(tmpdata);
        option.series[0].data = tmpdata.map(function (item) {
            return item.value
        })
        // console.log(option.series[0]);
        myChart3.setOption(option)
    },1000)



}
exports.drawBrokenLine = drawBrokenLine
exports.refreshBrokenLine = refreshBrokenLine