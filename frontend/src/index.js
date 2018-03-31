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
       //canvas.height = window.innerHeight;
	   //canvas.width = window.innerWidth;
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
    width: 495,
    height: 80,
    minValue: 0,
    maxValue: 25,
    fontTitleSize: 40,
    fontNumbersSize: 35,
    title: "distance to client, cm",
    
    majorTicks: [
        "0",
        "5",
        "10",
        "15",
        "20",
        "25"
    ],
    highlights: [
		{ "from": 0, "to": 7, "color": "rgba(255, 50, 50, .5)" },
        { "from": 7, "to": 12, "color": "rgba(255, 255, 50, .5)" },
        { "from": 12, "to": 18, "color": "rgba(50, 255, 50, .5)" },
		{ "from": 18, "to": 25, "color": "rgba(255, 255, 50, .5)" }
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
    ticksWidthMinor: 20,
    valueBox: true
}).draw();

  var batt_chg_gauge = new LinearGauge({
    renderTo: 'batt_chg',
    width: 180,
    height: 350,
    units: "batt. chg., %",
    minValue: 0,
    maxValue: 100,
    fontTitleSize: 30,
    majorTicks: [
        "0",
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90",
        "100"
        
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {"from": 75, "to": 100, "color": "rgba(50, 255, 50, .5)" },
        {"from": 35, "to": 75, "color": "rgba(255, 255, 50, .5)" },
        {"from": 0, "to": 35, "color": "rgba(255, 50, 50, .5)" },
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

 
   var speed_gauge = new RadialGauge({
    renderTo: 'speed',
    width: 350,
    height: 350,
    units: "Km/h",
    minValue: 0,
    maxValue: 40,
    majorTicks: [
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30",
        "35",
        "40"
    ],
    minorTicks: 5,
    strokeTicks: true,
    highlights: [
        {"from": 35, "to": 40, "color": "rgba(200, 50, 50, .5)"},
        {"from": 0, "to": 35, "color": "rgba(210, 210, 210, .5)"}
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
    width: 300,
    height: 300,
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
    width: 300,
    height: 300,
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
        let command = dview.getUint8(0)
        if (command === 0 && e.data.byteLength === 3) {
            let batteryValue = dview.getInt16(1, true)/1024 
            batt_chg_gauge.value = 100 * (1-batteryValue)
            speed_gauge.value = 40 * batteryValue
            dist_gauge.value = 25 * batteryValue
            drive_pwr_gauge.value = 4 * batteryValue
            chg_pwr_gauge.value = 4 * (1-batteryValue)
            
        } 
    })
 
    function reqData() {
        ws.send((new Uint8Array([1])).buffer)
    }
})
