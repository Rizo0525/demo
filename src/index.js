let dateModule = require("../js/date.js")
let maprenderModule = require("../js/map.js")
let MeasureEvaluateModule = require("../js/MeasureEvaluate.js")
window.onload = function () {

    let s = new dateModule.d({
        inputEl:'#inputdate',
        el:'#date'
    });
    // document.querySelector('#inputdate').val="2020-01-08"
    $('#inputdate').val('2019-12-01')

    maprenderModule.getDate('2019-12-01')
    maprenderModule.renderMap("../output/2019-12-01.json")
    let data = maprenderModule.getData(`../output/2019-12-01.json`);
    function getInputvalue() {
        maprenderModule.getDate(s.choiceDate.date)
        data = maprenderModule.getData(`../output/${s.choiceDate.date}.json`)
        maprenderModule.refreshData(data)
    }

    $(".buttons>button").each(function (index,value) {
        $(this).click(function () {
            $(this).addClass('select')
            $(this).siblings().removeClass('select')
            // console.log(typeof $(this).text());
            $(this).siblings().css('background','none')
            if($(this).text()==='累计确诊'){
                $(this).css('background','#C23632')
            }
            else if($(this).text()==='累计治愈'){
                $(this).css('background','#5337c2')
            }
            else if($(this).text()==='累计死亡'){
                $(this).css('background','#c567cb')
            }
            maprenderModule.refreshData(data)
        })
    })


    function addZero(num){
        num = String(num)
        if(num.length===1){
            num = 0 + num
        }
        return num
    }

    let timerId = null;
    //播放暂停按钮点击
    $(".iconfont").click(function () {
        // $(this).hasClass("")
        // console.log(1);
        if($(this).hasClass('icon-kaishi')){
            $(this).removeClass('icon-kaishi')
            $(this).addClass('icon-zanting')

            timerId = setInterval(function () {
                let str = $('#inputdate').val()
                let str1;
                if(str.slice(5,6)=== '0' && str.slice(8,9)==='0'){
                    str1 = str.slice(0,5)+str.slice(6,8)+str.slice(9,10)
                }else if(str.slice(5,6)=== '0'){
                    str1 = str.slice(0,5)+str.slice(6,10)
                }else if(str.slice(8,9)==='0'){
                    str1 = str.slice(0,8)+str.slice(9,10)
                }else{
                    str1 = str;
                }
                let s = str1.split('-')
                let date1=new Date(s[0],parseInt(s[1])-1,parseInt(s[2])+1);
                let date2=new Date(2020,11,8);
                let daymis=24*3600*1000;
                let now=date1;
                if(now<date2){
                    // console.log(now.getFullYear()+"-"+(addZero(now.getMonth()+1))+"-"+addZero(now.getDate()));
                    data = null;
                    maprenderModule.getDate(now.getFullYear()+"-"+(addZero(now.getMonth()+1))+"-"+addZero(now.getDate()))
                    data = maprenderModule.getData(`../output/${now.getFullYear()+"-"+(addZero(now.getMonth()+1))+"-"+addZero(now.getDate())}.json`)
                    maprenderModule.refreshData(data)
                    $('#inputdate').val(`${now.getFullYear()+"-"+(addZero(now.getMonth()+1))+"-"+addZero(now.getDate())}`)
                    now=new Date(now.getTime()+daymis);

                }else{
                    //关闭定时器
                    clearInterval(timerId)
                }
            },200)


        }else if($(this).hasClass('icon-zanting')){
            $(this).removeClass('icon-zanting')
            $(this).addClass('icon-kaishi')
            //关闭定时器
            clearInterval(timerId)
            // console.log(timerId);
            maprenderModule.getDate($('#inputdate').val())
            data = maprenderModule.getData(`../output/${$('#inputdate').val()}.json`)
            maprenderModule.refreshData(data)
            // $('#inputdate').val()
        }
    })


    //刷新按钮
    $("#refresh").click(function () {
        window.history.go(0)
    })




    //详情对比按钮
    $('#detail').click(function () {
        $('.third_div').show()
        $('.first_div').css({
            opacity:0
        })
        $('.second_div').css({
            opacity:0
        })
        // $('body').css({
        //     opacity:0.5
        // })
        // $('.third_div').css({
        //     opacity:1
        // })
        MeasureEvaluateModule.MeasureInit()
    })

    $('.icon-ziyuan').click(function () {
        console.log(2);
        $('.third_div').hide()
        $('.first_div').css({
            opacity:1
        })
        $('.second_div').css({
            opacity:1
        })
    })

    window.getInputvalue = getInputvalue;
}