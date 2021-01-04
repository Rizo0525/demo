let dateModule = require("../js/date.js")
let maprenderModule = require("../js/map.js")
window.onload = function () {

    let s = new dateModule.d({
        inputEl:'#inputdate',
        el:'#date'
    });
    document.querySelector('#inputdate').val="2020-01-08"
    maprenderModule.renderMap("../output/2020-01-08.json")
    function getInputvalue() {
        console.log(s.choiceDate.date);
        document.querySelector('#china-map').innerHTML = ''
        maprenderModule.renderMap(`../output/${s.choiceDate.date}.json`)
    }

   window.getInputvalue = getInputvalue;
}