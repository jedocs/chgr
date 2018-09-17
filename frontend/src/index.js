import './index.css'

window.addEventListener('load', () => {
    'use strict'

    let byId = id => document.getElementById(id)
    let ws = new WebSocket('ws://' + window.location.host + '/ws')
    ws.binaryType = 'arraybuffer'
    ws.addEventListener('open', () => {
    
        window.setInterval(() => {
            reqData()
        }, 50)
    })
    
    var canvas = document.getElementById("background");
    if (canvas.getContext) { // Canvas Support
       canvas.height = 800;//window.innerHeight;
	   canvas.width = window.innerWidth;
       var ctx = canvas.getContext("2d");
       // Work with context
       var grd=ctx.createLinearGradient(0,0,ctx.canvas.height,ctx.canvas.width);
       grd.addColorStop(0,"rgba(100, 150, 255, 0.95)" );
       grd.addColorStop(1,"rgba(100, 150, 255, 0.95)" );
       //ctx.globalAlpha=0.95;
       ctx.fillStyle=grd;
       ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height);
       ctx.fill();
    }
        
    //var canvas = document.getElementById("canvas1")
	var dist_gauge = new LinearGauge({
    renderTo: 'distance',
    width: 130, //canvas.width*0.5,//495 ,
    height: 600,
    minValue: 0,
    maxValue: 200,
    fontTitleSize: 40,
    fontNumbersSize: 35,
    title: "distance, mm",
    majorTicks: [
        "0",
        "50",
        "100",
        "150",
        "200"
    ],
    highlights: [
		{ "from": 0, "to": 50, "color": "rgba(255, 50, 50, .5)" },
        { "from": 50, "to": 80, "color": "rgba(255, 255, 50, .5)" },
        { "from": 80, "to": 120, "color": "rgba(50, 255, 50, .5)" },
		{ "from": 120, "to": 200, "color": "rgba(255, 255, 50, .5)" }
    ],
    highlightsWidth: 20,
    minorTicks: 5,
    strokeTicks: true,
    colorPlate: "rgba(255,255,255, 0)",
    colorTitle: "rgba(0,0,0, 1)",
    colorNumbers: "rgba(0,0,0, 1)", 
    colorUnits: "rgba(0,0,0, 1)",
    //colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    barBeginCircle: false,
    tickSide: "left",
    numberSide: "left",
    needleSide: "left",
    needleType: "line",
    needleWidth: 3,
    colorNeedle: "#222",
    colorNeedleEnd: "#222",
    animation: false,
    barWidth: 5,
    ticksWidth: 30,
    ticksWidthMinor: 20

}).draw();
/*
  var batt_chg_gauge = new LinearGauge({
    renderTo: 'batt_chg',
    width: 600,
    height: 250,
    units: "batt. voltage",
    minValue: 250,
    maxValue: 375,
    fontTitleSize: 30,
    majorTicks: [
        "250",
        "275",
        "300",
        "325",
        "350",
        "375",
        "400"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
		{"from": 345, "to": 375, "color": "rgba(255, 50, 50, .5)" },
        {"from": 290, "to": 345, "color": "rgba(50, 255, 50, .5)" },
        {"from": 270, "to": 290, "color": "rgba(255, 255, 50, .5)" },
        {"from": 250, "to": 270, "color": "rgba(255, 50, 50, .5)" },
    ],
    //colorPlate: "#fff",
    colorPlate: "rgba(255,255,255, 0)",
    colorBarStroke: "rgba(55, 55, 55, .5)",
    colorBar: "rgba(255, 100, 50, .5)",
    colorBarProgress: "rgba(20, 200, 20, .5)",
    colorTitle: "rgba(0,0,0, 1)",
    colorNumbers: "rgba(0,0,0, 1)", 
    colorUnits: "rgba(0,0,0, 1)",
    value: 50,
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    animation: false,
    tickSide: "left",
    numberSide: "left",
    needleSide: "left",
    barStrokeWidth: 7,
    barBeginCircle: false,
    valueBox: false
}).draw();
*/
 
 //var sp_canvas = document.getElementById("speed")
	//sp_canvas.position(50,50)
   var speed_gauge = new RadialGauge({
    renderTo: 'speed',
    width: 600,
    height: 600,
    units: "Km/h",
    minValue: 0,
    maxValue: 35,
    majorTicks: [
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30",
        "35"
        
    ],
    minorTicks: 5,
    strokeTicks: true,
    highlights: [
        {"from": 30, "to": 35, "color": "rgba(200, 50, 50, .5)"},
        {"from": 0, "to": 30, "color": "rgba(210, 210, 210, .5)"}
    ],
    colorPlate: "rgba(210, 210, 210, 0)", //"#fff",
    colorTitle: "rgba(0,0,0, 1)",
    colorNumbers: "rgba(0,0,0, 1)", 
    colorUnits: "rgba(0,0,0, 1)",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animation: false,
    valueBox: false
}).draw();
   
   var chg_pwr_gauge = new RadialGauge({
    renderTo: 'chg_pwr',
    width: 400,
    height: 400,
    title: "charge power",
    units: "kW",
    minValue: 0,
    startAngle: 90,
    ticksAngle: 180,
    valueBox: false,
    maxValue: 4,
    
    majorTicks: [
        "0",
        "0.5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4"
    ],
    
    minorTicks: 5,
    strokeTicks: true,
    highlights: [
		{ "from": 0, "to": 3, "color": "rgba(50, 255, 50, .5)" },
        { "from": 3, "to": 3.5, "color": "rgba(255, 255, 50, .5)" },
        { "from": 3.5, "to": 4, "color": "rgba(200, 50, 50, .5)" }
    ],
    colorPlate: "rgba(255,255,255, 0)",
    colorTitle: "rgba(0,0,0, 1)",
    colorNumbers: "rgba(0,0,0, 1)", 
    colorUnits: "rgba(0,0,0, 1)",
    //colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animation: false
}).draw();
   
   var drive_pwr_gauge = new RadialGauge({
    renderTo: 'drive_pwr',
    width: 400,
    height: 400,
    title: "drive power",
    units: "kW",
    minValue: 0,
    startAngle: 90,
    ticksAngle: 180,
    valueBox: false,
    maxValue: 4,
    majorTicks: [
        "0",
        "0.5",
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4"
        ],
    minorTicks: 5,
    strokeTicks: true,
    highlights: [
		{ "from": 0, "to": 3, "color": "rgba(50, 255, 50, .5)" },
        { "from": 3, "to": 3.5, "color": "rgba(255, 255, 50, .5)" },
        { "from": 3.5, "to": 4, "color": "rgba(200, 50, 50, .5)" }
    ],
    colorPlate: "rgba(255,255,255, 0)",
    colorTitle: "rgba(0,0,0, 1)",
    colorNumbers: "rgba(0,0,0, 1)", 
    colorUnits: "rgba(0,0,0, 1)",
    //colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animation: false
}).draw();
     
    ws.addEventListener('message', e => {
        let dview = new DataView(e.data)
        
        if (e.data.byteLength === 10) {
            let speed=(dview.getUint8(0)+dview.getUint8(1)*128)/4096
            let chg_pwr=(dview.getUint8(2)+dview.getUint8(3)*128)/4096
            let drive_pwr=(dview.getUint8(4)+dview.getUint8(5)*128)/4096
            let distance=(dview.getUint8(6)+dview.getUint8(7)*128)
            let vbat=(dview.getUint8(8)+dview.getUint8(9)*128)/4096
			distance=(distance-794)/3178
            //batt_chg_gauge.value = dview.getUint8(7)
            speed_gauge.value = 40*speed
            dist_gauge.value = 200*distance
            drive_pwr_gauge.value = 4*drive_pwr
            chg_pwr_gauge.value = 4*chg_pwr
  //          batt_chg_gauge=100*vbat
        } 
    })
 
    function reqData() {
        ws.send((new Uint8Array([1])).buffer)
    }
})
