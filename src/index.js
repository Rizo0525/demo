let dateModule = require("../js/date.js")
window.onload = function () {

    let s = new dateModule.d({
        inputEl:'#inputdate',
        el:'#date'
    });
    // console.log(s.choiceDate.date);
    // $("#inputdate").bind('input porpertychange',function () {
    //     console.log($("#inputdate").val());
    // })
    // setInterval(function () {
    //     console.log($("#inputdate").val());
    // },1000)

}