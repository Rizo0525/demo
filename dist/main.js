(()=>{var e={553:function(e,t){let n=function(e,t){"use strict";return function(e,t){var n=new Array(19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42448,83315,21200,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46496,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19415,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448),a=(new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"),new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸"),new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"),new Date);function i(e){var t,a=348;for(t=32768;t>8;t>>=1)a+=n[e-1900]&t?1:0;return a+o(e)}function o(e){return r(e)?65536&n[e-1900]?30:29:0}function r(e){return 15&n[e-1900]}function c(e){var t,a,c,s,h=0,l=(e-new Date(1900,0,31))/864e5;for(this.dayCyl=l+40,this.monCyl=14,t=1900;t<2050&&l>0;t++)l-=h=i(t),this.monCyl+=12;for(l<0&&(l+=h,t--,this.monCyl-=12),this.year=t,this.yearCyl=t-1864,a=r(t),this.isLeap=!1,t=1;t<13&&l>0;t++)a>0&&t==a+1&&0==this.isLeap?(--t,this.isLeap=!0,h=o(this.year)):(c=this.year,s=t,h=n[c-1900]&65536>>s?30:29),1==this.isLeap&&t==a+1&&(this.isLeap=!1),l-=h,0==this.isLeap&&this.monCyl++;0==l&&a>0&&t==a+1&&(this.isLeap?this.isLeap=!1:(this.isLeap=!0,--t,--this.monCyl)),l<0&&(l+=h,--t,--this.monCyl),this.month=t,this.day=l+1}function s(e,t,n){var a=new c(new Date(e,t,n));return function(e,t){t=parseInt(t);var n,a=new Array("日","正","二","三","四","五","六","七","八","九","十","冬","腊"),i=new Array("初","十","廿","卅","　"),o=new Array("日","一","二","三","四","五","六","七","八","九","十");switch(n=a[e]+"月",t){case 10:n+="初十";break;case 20:n+="二十";break;case 30:n+="三十";break;default:n+=i[Math.floor(t/10)],n+=o[t%10]}return n}(a.month,a.day)}function h(e){return 1==(e=String(e)).length&&(e=0+e),e}function l(e){e=e||{},this.inputEl=e.inputEl,this.el=e.el,this.input=null,this.div="div",this.dom=null;var t=new Date;this.today1={nowFullYear:t.getFullYear(),nowMonth:t.getMonth()+1,nowDay:t.getDate(),nowDays:t.getDay(),date:function(){return this.nowFullYear+"-"+this.nowMonth+"-"+this.nowDay}},this.today={nowFullYear:2019,nowMonth:12,nowDay:1,nowDays:7,date:function(){return this.nowFullYear+"-"+this.nowMonth+"-"+this.nowDay}},this.weeks=["日","一","二","三","四","五","六"],this.yearDom=null,this.weekDom=null,this.monthDom=null,this.currectYear=this.today.nowFullYear,this.currectMonth=this.today.nowMonth,this.showDate=function(){return this.currectYear+"年"+h(this.currectMonth)+"月"},this.showFullDate=function(e){return this.currectYear+"-"+h(this.currectMonth)+"-"+h(e)},this.choiceDateFn=function(e){return this.currectYear+"-"+this.currectMonth+"-"+e},this.choiceDate={},this.currectChoice=null,this.isShow=!1,this.todayDom=null,this.showDateDom=null,this.init()}return a.getFullYear(),a.getMonth(),a.getDate(),l.prototype={init:function(){this.initInput(),this.initDomBox(),this.initDom()},initInput:function(){var e=this;this.input=document.querySelector(this.inputEl),this.parent=document.querySelector(this.el),this.dom=document.createElement(this.div),this.parent.appendChild(this.dom),this.isShow||(this.dom.style.display="none"),this.input.addEventListener("focus",(function(t){e.isShow=!0,e.isShow&&(e.dom.style.display="block",$(".show-month>div:nth-of-type(8)").siblings().hasClass("active")||$(".show-month>div:nth-of-type(8)").addClass("active"))})),document.addEventListener("click",(function(t){var n=t.target;if(null!=n.parentNode){for(;n;){if(n==e.input||n==e.dom)return;n=n.parentNode}e.isShow=!1,e.isShow||(e.dom.style.display="none")}}))},initDomBox:function(){var e=this.div;this.yearDom=document.createElement(e),this.weekDom=document.createElement(e),this.monthDom=document.createElement(e),this.monthDom.classList.add("show-month"),this.btsDom=document.createElement(e),this.btsDom.classList.add("bts"),this.dom.appendChild(this.yearDom),this.dom.appendChild(this.weekDom),this.dom.appendChild(this.monthDom),this.dom.appendChild(this.btsDom)},initDom:function(){this.dom.classList.add("date-js"),this.renderYearDom(),this.renderWeekDom(),this.renderMonthDom(),this.initBtsDom()},initBtsDom:function(){var e=this.div,t=this,n=document.createElement(e),a=document.createElement(e);n.classList.add("bt"),n.innerHTML="今日",n.addEventListener("click",(function(){t.currectYear=t.today1.nowFullYear,t.currectMonth=t.today1.nowMonth,t.renderMonthDom(t.showDateDom),t.showCurrectDate(t.showDateDom),t.currectChoice&&t.currectChoice.classList.remove("active"),t.currectChoice=t.todayDom,t.currectChoice.classList.add("active");var e=Number(t.todayDom.getAttribute("data-year")),n=Number(t.todayDom.getAttribute("data-month")),a=t.todayDom.innerHTML;t.input.value=e+"-"+h(n)+"-"+h(a),t.choiceDate.date=e+"-"+h(n)+"-"+h(a),t.choiceDate.month=n,t.choiceDate.year=e})),a.classList.add("bt"),a.innerHTML="确定",a.addEventListener("click",(function(){t.isShow=!1,t.isShow||(t.dom.style.display="none")})),this.btsDom.appendChild(n),this.btsDom.appendChild(a)},showCurrectDate:function(e){e.innerHTML=this.showDate()},renderYearDom:function(){var e=this.div,t=this,n=this.yearDom;n.classList.add("show-year");var a=this.showDateDom=document.createElement(e);a.classList.add("show-date"),this.showCurrectDate(a);var i=document.createElement(e);i.innerHTML="«",i.classList.add("change-date"),i.addEventListener("click",(function(){t.currectYear--,t.currectChoice=null,t.renderMonthDom(),t.showCurrectDate(a)}));var o=document.createElement(e);o.innerHTML="<",o.classList.add("change-date"),o.addEventListener("click",(function(){t.currectMonth--,t.currectChoice=null,0==t.currectMonth&&(t.currectMonth=12,t.currectYear--),t.renderMonthDom(),t.showCurrectDate(a)}));var r=document.createElement(e);r.innerHTML="»",r.classList.add("change-date"),r.addEventListener("click",(function(){t.currectYear++,t.currectChoice=null,t.renderMonthDom(),t.showCurrectDate(a)}));var c=document.createElement(e);c.innerHTML=">",c.classList.add("change-date"),c.addEventListener("click",(function(){t.currectMonth++,t.currectChoice=null,13==t.currectMonth&&(t.currectMonth=1,t.currectYear++),t.renderMonthDom(),t.showCurrectDate(a)})),n.appendChild(i),n.appendChild(o),n.appendChild(a),n.appendChild(c),n.appendChild(r)},renderWeekDom:function(){var e=this.div,t=this.weekDom;t.classList.add("show-week");for(var n=this.weeks,a=n.length,i=document.createDocumentFragment(),o=0;o<a;o++){var r=document.createElement(e);r.classList.add("week-day"),r.innerHTML=n[o],i.appendChild(r)}t.appendChild(i)},fn:function(){this.value=this.choiceDate.date,console.log(this.value)},renderMonthDom:function(t){for(var n=this,a=this.div,i=this.monthDom,o=(this.today1,this.currectYear),r=this.currectMonth,c=this.month(o,r),l=document.createDocumentFragment(),d=c.length,u=0;u<d;u++){var m=document.createElement(a);m.innerHTML=c[u].day,m.classList.add("month-day"),c[u].month==this.currectMonth&&c[u].year==this.currectYear||m.classList.add("not-this-month");var p=s(c[u].year,c[u].month-1,c[u].day);m.title=p,c[u].date==this.today1.date()&&m.classList.add("today"),m.setAttribute("data-month",c[u].month),m.setAttribute("data-year",c[u].year),c[u].date==this.choiceDate.date&&this.currectMonth==this.choiceDate.month&&this.currectYear==this.choiceDate.year&&(m.classList.add("active"),this.currectChoice=m),c[u].date==this.today1.date()&&(this.todayDom=m),m.addEventListener("click",(function(){$(".show-month>div:nth-of-type(8)").removeClass("active"),null!=n.currectChoice&&(n.currectChoice.classList.remove("active"),n.choiceDate={});var t=Number(this.getAttribute("data-year")),a=Number(this.getAttribute("data-month")),i=this.innerHTML;n.input.value=t+"-"+h(a)+"-"+h(i),n.choiceDate.date=t+"-"+h(a)+"-"+h(i),e.getInputvalue(),n.choiceDate.month=a,n.choiceDate.year=t,n.currectChoice=this,this.classList.add("active"),a!=n.currectMonth&&(n.currectMonth=a,n.currectYear=t,n.showCurrectDate(n.showDateDom),n.renderMonthDom(!0))})),l.appendChild(m)}i.innerHTML="",i.appendChild(l),t&&(n.dom.style.display="block")},month:function(e,t){var n=new Date(e,t,0).getDate(),a=this.weeks,i=this.showMonth=[],o=new Date(e,t-1,1).getDay();o=0==o?7:o;var r,c,s,h,l=new Date(e,t-1,0).getDate();t-1<=0?(r=12,c=e-1):(r=t-1,c=e);for(var d=l-o+1;d<=l;d++)i.push({year:c,month:r,date:c+"-"+r+"-"+d,day:d});for(d=1;d<=n;d++)a[new Date(e,t-1,d).getDay()],i.push({year:e,month:t,date:e+"-"+t+"-"+d,day:d});t+1>=13?(s=1,h=e+1):(s=t+1,h=e);for(var u=42-i.length,m=1;m<=u;m++)i.push({year:h,month:s,date:e+"-"+s+"-"+m,day:m});return i}},l.prototype.constructor=l,e.DateJs=l,l}(e)}("undefined"!=typeof window?window:this);t.d=n},123:(e,t)=>{function n(e){let t,n=new XMLHttpRequest;return n.onreadystatechange=function(){4===n.readyState&&200===n.status&&(t=JSON.parse(n.responseText))},n.open("get",e,!1),n.send(null),t}function a(e,t,n){!function(e,t,n){let a=document.createElement("script");a.type="text/javascript",a.readyState?a.onreadystatechange=function(){"loaded"!==a.readyState&&"complete"!==a.readyState||(a.onreadystatechange=null,n())}:a.onload=function(){n()},a.src=t,a.id=e,document.getElementsByTagName("head")[0].appendChild(a)}("$"+t+"JS","../js/map/province/"+t+".js",(function(){i(e,0,n)}))}function i(e,t,n){let o;window.tmpSeriesData=[],$(".buttons>button:nth-of-type(1)").hasClass("select")?("china"===e?provincesText1.forEach((function(e,t){n.forEach((n=>{if(n.province===e){let e={name:provincesText[t],value:n.confirmed};tmpSeriesData.push(e)}}))})):n.forEach((t=>{if(t.province===e){let e={name:t.city,value:t.confirmed};tmpSeriesData.push(e)}})),o="china"===e?chinaPieces1:proPieces1):$(".buttons>button:nth-of-type(2)").hasClass("select")?("china"===e?provincesText1.forEach((function(e,t){n.forEach((n=>{if(n.province===e){let e={name:provincesText[t],value:n.cured};tmpSeriesData.push(e)}}))})):n.forEach((t=>{if(t.province===e){let e={name:t.city,value:t.cured};tmpSeriesData.push(e)}})),o="china"===e?chinaPieces2:proPieces2):$(".buttons>button:nth-of-type(3)").hasClass("select")&&("china"===e?provincesText1.forEach((function(e,t){n.forEach((n=>{if(n.province===e){let e={name:provincesText[t],value:n.dead};tmpSeriesData.push(e)}}))})):n.forEach((t=>{if(t.province===e){let e={name:t.city,value:t.dead};tmpSeriesData.push(e)}})),o="china"===e?chinaPieces3:proPieces3),console.log(tmpSeriesData),console.log(e);let r={title:{text:e+"疫情图",left:"center"},tooltip:{trigger:"item"},visualMap:{type:"piecewise",pieces:o,textStyle:{color:"#000000"},inRange:{color:["lightskyblue","yellow","orangered"]},top:"50%"},series:[{name:e,type:"map",mapType:e,roam:!1,itemStyle:{normal:{label:{show:!0,textStyle:{color:"rgba(255,255,255,0)"}}},emphasis:{label:{show:!0}}},data:tmpSeriesData,top:"3%"}]};myChart.setOption(r),myChart.off("click"),"china"===e?myChart.on("click",(function(e){console.log(e.name);for(let t=0;t<provincesText.length;t++)if(e.name===provincesText[t]){console.log(provincesText[t],provinces[t]),console.log(n),a(provincesText[t],provinces[t],n);break}})):myChart.on("dblclick",(function(){i("china",0,n)}))}t.renderMap=function(e){let t=n(e);window.myChart=echarts.init(document.getElementById("china-map")),window.oBack=document.getElementById("back"),window.provinces=["shanghai","hebei","shanxi","neimenggu","liaoning","jilin","heilongjiang","jiangsu","zhejiang","anhui","fujian","jiangxi","shandong","henan","hubei","hunan","guangdong","guangxi","hainan","sichuan","guizhou","yunnan","xizang","shanxi1","gansu","qinghai","ningxia","xinjiang","beijing","tianjin","chongqing","xianggang","aomen"],window.provincesText=["上海","河北","山西","内蒙古","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","广西","海南","四川","贵州","云南","西藏","陕西","甘肃","青海","宁夏","新疆","北京","天津","重庆","香港","澳门"],window.provincesText1=["上海市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区","北京市","天津市","重庆市","香港","澳门"],window.chinaPieces1=[{min:1e3,max:1e6,label:"大于等于1000人",color:"#372a28"},{min:500,max:999,label:"确诊500-999人",color:"#4e160f"},{min:100,max:499,label:"确诊100-499人",color:"#974236"},{min:10,max:99,label:"确诊10-99人",color:"#ee7263"},{min:1,max:9,label:"确诊1-9人",color:"#f5bba7"}],window.proPieces1=[{min:1e3,max:1e6,label:"大于等于1000人",color:"#372a28"},{min:500,max:999,label:"确诊500-999人",color:"#4e160f"},{min:100,max:499,label:"确诊100-499人",color:"#974236"},{min:10,max:99,label:"确诊10-99人",color:"#ee7263"},{min:1,max:9,label:"确诊1-9人",color:"#f5bba7"}],window.chinaPieces2=[{min:1e3,max:1e6,label:"大于等于1000人",color:"#372a28"},{min:500,max:999,label:"治愈500-999人",color:"#4e160f"},{min:100,max:499,label:"治愈100-499人",color:"#974236"},{min:10,max:99,label:"治愈10-99人",color:"#ee7263"},{min:1,max:9,label:"治愈1-9人",color:"#f5bba7"}],window.proPieces2=[{min:1e3,max:1e6,label:"大于等于1000人",color:"#372a28"},{min:500,max:999,label:"治愈500-999人",color:"#4e160f"},{min:100,max:499,label:"治愈100-499人",color:"#974236"},{min:10,max:99,label:"治愈10-99人",color:"#ee7263"},{min:1,max:9,label:"治愈1-9人",color:"#f5bba7"}],window.chinaPieces3=[{min:1e3,max:1e6,label:"大于等于1000人",color:"#372a28"},{min:500,max:999,label:"死亡500-999人",color:"#4e160f"},{min:100,max:499,label:"死亡100-499人",color:"#974236"},{min:10,max:99,label:"死亡10-99人",color:"#ee7263"},{min:1,max:9,label:"死亡1-9人",color:"#f5bba7"}],window.proPieces3=[{min:1e3,max:1e6,label:"死亡等于1000人",color:"#372a28"},{min:500,max:999,label:"死亡500-999人",color:"#4e160f"},{min:100,max:499,label:"死亡100-499人",color:"#974236"},{min:10,max:99,label:"死亡10-99人",color:"#ee7263"},{min:1,max:9,label:"死亡1-9人",color:"#f5bba7"}],oBack.onclick=function(){i("china",0,t)},i("china",0,t)},t.getData=n,t.refreshData=function(e){myChart.getOption(),i("china",0,e),oBack.onclick=function(){i("china",0,e)}}}},t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,n),i.exports}(()=>{let e=n(553),t=n(123);window.onload=function(){let n=new e.d({inputEl:"#inputdate",el:"#date"});$("#inputdate").val("2019-12-01"),t.renderMap("../output/2019-12-01.json");let a=t.getData("../output/2019-12-01.json");$(".buttons>button").each((function(e,n){$(this).click((function(){$(this).addClass("select"),$(this).siblings().removeClass("select"),t.refreshData(a)}))})),window.getInputvalue=function(){a=t.getData(`../output/${n.choiceDate.date}.json`),t.refreshData(a)}}})()})();