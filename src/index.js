let dateModule = require("../js/date.js")
let maprenderModule = require("../js/map.js")
window.onload = function () {

    let s = new dateModule.d({
        inputEl:'#inputdate',
        el:'#date'
    });
    // document.querySelector('#inputdate').val="2020-01-08"
    $('#inputdate').val('2019-12-01')
    maprenderModule.renderMap("../output/2019-12-01.json")
    let data = maprenderModule.getData(`../output/2019-12-01.json`);
    function getInputvalue() {
        data = maprenderModule.getData(`../output/${s.choiceDate.date}.json`)
        maprenderModule.refreshData(data)
    }

    $(".buttons>button").each(function (index,value) {
        $(this).click(function () {
            $(this).addClass('select')
            $(this).siblings().removeClass('select')
            maprenderModule.refreshData(data)
        })
    })
    window.getInputvalue = getInputvalue;
}