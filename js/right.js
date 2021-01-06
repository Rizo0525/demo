let file="2020-04-07.json";
let promise = new Promise(function (resolve, reject) {
    let data=[];
    d3.json(file,function (json) {
        data.push(json)
    })
    setTimeout(function () {
        resolve(data)
    },100)
})

promise.then(function (data) {
    sheng_data=[];//存放34个区域的所有信息,每个里面存的是类
    all_name = [];//只放34个地方的名字，只存名字
    for(let i =1;i< data[0].length;i++){
        if(data[0][i].city=="null"){//由给定数据发现null代表省，或者直辖市或者自治区
            sheng_data.push(data[0][i]);
        }
    }

    sort_sheng_data = sheng_data.sort((a,b)=>{
        return (a.confirmed < b.confirmed)?1:-1
    })
    console.log(sort_sheng_data);
    let first_ten=[];//前十个省份
    if (sort_sheng_data.length>=10){
        for (let i =0;i<10;i++){
            first_ten[i]=sort_sheng_data[i];
        }
    }
    else
    {
        for (let i=0;i<sort_sheng_data.length;i++){
            first_ten[i]=sort_sheng_data[i];
        }
    }
    let city_name = [];//存放前十个城市的名字
    console.log(first_ten.length);
    for(key in first_ten){
        if (first_ten.length ==10){
            first_ten[key].confirmed=Math.log(first_ten[key].confirmed);//对数放缩//注意死亡人数少的时候取对数值为0无显示，人多的时候取对数显示明显

        }
        city_name.push(first_ten[key].province);
    }
    console.log(city_name);//打印存城市的数组内容
    console.log(first_ten);

    let colors = d3.scaleOrdinal(d3.schemeCategory20);

    let svg = d3.select("body")
        .append("svg")
        .attr("height", 300)
        .attr("width", 300)

    var pie = d3.pie()
        .value(d => d.confirmed)
        .sort(d => d.confirmed)
        .padAngle(0.01)
    var pie_data = pie(first_ten);//用数据实例化饼图生成器
    console.log(pie_data);//查看

    var arc = d3.arc() //创建弧生成器基本大小
        .outerRadius(70)//设置弧生成器，此行设置外半径
        .innerRadius(40)//设置弧生成器，此行设置内半径

    var arc2 = d3.arc()//定义另外一种弧生成器放大
        .innerRadius(80)
        .outerRadius(38)

    var arcs = svg.selectAll("g")//每个扇形
        .data(pie_data)
        .enter()
        .append("g")
        .attr("transform","translate("+200+","+200+")")
        .on("mouseover", function(d) {

            d3.select(this).select("path").transition().attr("d", function(d) {
                // console.log(d);
                return arc2(d);
            })
        })
        .on("mouseout", function(d){
            d3.select(this).select("path").transition().attr("d", function(d){
                return arc(d);
            })
        })

    arcs.append("path")
        .attr("fill",function (d,i) {
            // console.log(colors(i))
            return colors(i);

        })
        .attr("d",function (d) {
            return arc(d);
        })

    let svg2 = d3.select("body")//图例
        .append("svg")
        .attr("width", 120)
        .attr("height", 500);

    svg2.selectAll("rect")
        .data(city_name)
        .enter()
        .append("rect")
        .attr("y", function (d, i) {
            return 280+i * 10;
        })
        .attr("x", function (d) {
            return 0;
        })
        .attr("width", 20)
        .attr("height", 10)
        .attr("fill", (d, i) => colors(i))
        .on("mouseover",function (d,i) {
            // console.log(colors(i));
            d3.select(arcs._groups[0][i]).select("path").transition().attr("d", function(d) {
                // console.log(d);
                return arc2(d);
            })
        })
        .on("mouseout", function(d,i){
            d3.select(arcs._groups[0][i]).select("path").transition().attr("d", function(d){
                return arc(d);
            })
        })




    svg2.selectAll("text")
        .data(city_name)
        .enter()
        .append("text")
        .attr("transform", function (d, i) {
            return "translate(" + 25 + "," + (i * 10 + 288) + ")";
        })
        .attr("fill", 'black')
        .attr("font-size", 10)
        .text(function (d, i) {
            return city_name[i];
        });

    arcs.selectAll("text")
        .data(pie_data)
        .enter()
        .append("text")
        .attr("font-size", 9)
        .attr("transform", d => "translate(" + arc.centroid(d) + ")")
        .attr("text-anchor","middle")
        .attr("font-size",7 )
        .text(d => d.data.confirmed.toFixed(1));











    for(let j =0; j<sheng_data.length;j++){
        all_name[j]=sheng_data[j].province//all_name里面只存34个地区名字,用于x轴显示
    }
    console.log(all_name);
    let city_conformed = []//存34个区域确诊断人数
    for(key in sheng_data){
        city_conformed.push(sheng_data[key].confirmed);
    }
    console.log(city_conformed);
    var myChart = echarts.init(document.getElementById('main'));

    var option = {
        title: {
            text: '确诊人数'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: all_name
        },
        yAxis: {type: 'value'},
        series: [{
            data: city_conformed,
            type: 'line',
            symbol: 'circle',
            symbolSize: 0,
            lineStyle: {
                width: 4,
                type: 'dashed'
            },
            itemStyle: {
                borderWidth: 3,
            }
        }],
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 25
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 25
            }
        ]
    };
    myChart.setOption(option);

})