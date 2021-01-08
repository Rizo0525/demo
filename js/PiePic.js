function BindData(pName,str,first_ten){

    let colors = d3.scaleOrdinal(d3.schemeCategory20);
    let svg = d3.select(".PiePic")
        .append("svg")
        .attr("height", 290)
        .attr("width", 300)

    let pie = d3.pie()
        .value(d => d.value)
        .sort(d => d.value)
        .padAngle(0.01)

    let pie_data = pie(first_ten);//用数据实例化饼图生成器
    // console.log('pie_data',pie_data);//查看

    let arc = d3.arc() //创建弧生成器基本大小
        .outerRadius(70)//设置弧生成器，此行设置外半径
        .innerRadius(40)//设置弧生成器，此行设置内半径

    let arc2 = d3.arc()//定义另外一种弧生成器放大
        .innerRadius(80)
        .outerRadius(38)

    let arcs = svg.selectAll("g")//每个扇形
        .data(pie_data)
        .enter()
        .append("g")
        .attr("transform","translate("+120+","+160+")")
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
    // console.log('arcs.groups[0]',arcs._groups[0]);
    // let svg2 = d3.select(".PiePic")//图例
    //     .append("svg")
    //     .attr("width", 80)
    //     .attr("height", 260);

    svg.selectAll("rect")
        .data(first_ten.map(function (item) {
            return item.name
        }))
        .enter()
        .append("rect")
        .attr("y", function (d, i) {
            return 100+i * 12;
        })
        .attr("x", function (d) {
            return 210;
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


    svg.selectAll("text")
        .data(first_ten.map(function (item) {
            return item.name
        }))
        .enter()
        .append("text")
        .attr("transform", function (d, i) {
            return "translate(" + 230 + "," + (i * 12 + 108) + ")";
        })
        .attr("fill", '\nblack')
        .attr("font-size", 10)
        .text(function (d, i) {
            return d;
        });

    arcs.selectAll("text")
        .data(pie_data)
        .enter()
        .append("text")
        .attr("font-size", 9)
        .attr("transform", d => "translate(" + arc.centroid(d) + ")")
        .attr("text-anchor","middle")
        .attr("font-size",7 )
        .text(d => d.data.value.toFixed(1));

    // console.log(d3.select('.PiePic>svg'));
    if(pName==='china'){
        d3.select('.PiePic>svg:nth-of-type(1)')
            .append('text')
            .attr('x',5)
            .attr('y',20)
            .text(`${curdate}全国累计${str}人数Top10省份`)
            .attr('fill','#5ea8c9')
            .attr('font-weight','bold')
            .attr('font-family','宋体')
            .attr('font-size','16')
    }else{
        d3.select('.PiePic>svg:nth-of-type(1)')
            .append('text')
            .attr('x',5)
            .attr('y',20)
            .text(`${curdate}${pName}累计${str}人数Top10省份`)
            .attr('fill','#5ea8c9')
            .attr('font-weight','bold')
            .attr('font-family','宋体')
            .attr('font-size','16')
    }

}
function refreshPiePic(pName,str,data){

    // console.log('refreshData:',data);

    $('.PiePic').html("")

    let sheng_data=[];//存放34个区域的所有信息,每个里面存的是类

    data.forEach(function (v) {
        if(v.value===0){
            return ;
        }
        sheng_data.push(v)
    })

    // console.log('sheng_data:',sheng_data);//34个地方
    sort_sheng_data = sheng_data.sort((a,b)=>{
        return (a.value < b.value)?1:-1
    })

    // console.log('sheng_data',sort_sheng_data);
    let first_ten = [];//前十个省份
    if (sort_sheng_data.length>=10){
        for (let i =0;i<10;i++){
            first_ten.push(sort_sheng_data[i])
        }
    }
    else
    {
        for (let i=0;i<sort_sheng_data.length;i++){
            first_ten.push(sort_sheng_data[i])
        }
    }
    // console.log('first_ten:',first_ten);

    let first_ten1 = []
    first_ten.forEach(function (v) {
        first_ten1.push({name:v.name,value:Math.log(v.value)+1})
    })
    // console.log('first_ten1:changed',first_ten1);

    // console.log(d3.select('.PiePic>svg'));

    BindData(pName,str,first_ten1)

}
// exports.DrawPiePic = DrawPiePic
exports.refreshPiePic = refreshPiePic