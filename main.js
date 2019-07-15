window.onload = () => {
    let svgNameSpace = "http://www.w3.org/2000/svg";
    let bookedColor = '#ffad99';
    let freeColor = '#99ff99';
    let icoWidth = 3;
    let rangeOfTemp = 25;
    let rangeOfOpacity = 120;

    let rooms = [
        {
            "bookable": true,
            "co2": 300,
            "waitingTimeSec": 0,
            "lux": 153.04,
            "name": "Room 1",
            "temperature": 26,
            "presence": true,
            "booked": false,
            "id": 'product-04-X03-D'
        },
        {
            "bookable": true,
            "co2": 620.16,
            "waitingTimeSec": 0,
            "lux": 153.04,
            "name": "Room 2",
            "temperature": 15,
            "presence": true,
            "booked": false,
            "id": 'product-04-Y04-C'
        },
        {
            "bookable": true,
            "co2": 620.16,
            "waitingTimeSec": 0,
            "lux": 153.04,
            "name": "Room 3",
            "temperature": 23.5,
            "presence": true,
            "booked": true,
            "id": 'product-04-X11-C'
        },
        {
            "bookable": true,
            "co2": 620.16,
            "waitingTimeSec": 0,
            "lux": 153.04,
            "name": "Room 4",
            "temperature": 23.5,
            "presence": true,
            "booked": false,
            "id": 'product-04-X-11-I'
        },
        {
            "bookable": true,
            "co2": 350,
            "waitingTimeSec": 0,
            "lux": 153.04,
            "name": "Room 5",
            "temperature": 30,
            "presence": true,
            "booked": false,
            "id": 'product-04-Y12-J'
        },
        {
            "bookable": false,
            "name": "WC",
            "id": 'product-04-Y05-Ha'
        },
        {
            "bookable": false,
            "name": "WC",
            "id": 'product-04-X07-Hb'
        },
        {
            "bookable": false,
            "name": "Elevator",
            "id": 'product-04-X10-Ib'
        },
        {
            "bookable": false,
            "name": "Elevator",
            "id": 'product-04-Y10-Ia'
        }
    ];

    let bookable = [];
    let nonBookable = [];
//---------------------------------------------------------------
    let tempLayer;
    let zoomInformer = document.getElementById('zoomInformer');
    let zoomer = document.getElementById('zoomer');
    let pointerSvg = document.getElementById('coordSVG');
    let svgObj = document.getElementById('svgObj');
    let svgDocument = svgObj.contentDocument;
    let grid = svgDocument.getElementById('svg');
    let main = document.getElementById('main');

//----------------filter all rooms (parsm - bookkable)----------------------------
    filterBookable(rooms);
    function filterBookable(arr) {
        bookable = arr.filter(space => space.bookable === true);
        nonBookable = arr.filter(space => space.bookable === false);
    }
//---------------------------showFree & bokkable----------------------------------------
function highlightRooms() {
    bookable.forEach(el => {
        let color = el.booked ? bookedColor: freeColor;
        console.log(el.id, color)
        grid.getElementById(el.id).firstElementChild.style.cssText = `fill: ${color}; opacity: 0.7`;
    })
}




//----------------show signs and temp------------------------------
    showSigns();
    showTemp();
    highlightRooms();
//--------------------------showSigns------------------------------
    function showSigns() {
        let signGroupSVG = document.createElementNS(svgNameSpace, 'g');
        signGroupSVG.setAttributeNS(null, 'id', 'signs');

        nonBookable.forEach(el => {
            let {xCenter, yCenter} = getCenterOfRoom(el.id);
            let layer = createEl(xCenter, yCenter, el.name);
            signGroupSVG.appendChild(layer); 
        });
        grid.appendChild(signGroupSVG);
    }
//-----------------ShowTemp--------------------------------
function showTemp() {
    let signGroupSVG = document.createElementNS(svgNameSpace, 'g');
    signGroupSVG.setAttributeNS(null, 'id', 'temp');
    signGroupSVG.setAttributeNS(null, 'style', 'opacity:0');

    bookable.forEach(el => {
        let {xCenter, yCenter} = getCenterOfRoom(el.id);
        let layer = createTempSign(xCenter, yCenter, el.temperature);
        signGroupSVG.appendChild(layer);
    })
    grid.appendChild(signGroupSVG);
    tempLayer = grid.getElementById('temp');
}

//----------getCenter of room--------------------------------
    function getCenterOfRoom(id) {
            let elDOM = grid.getElementById(id);
            let {left, top, width, height} = elDOM.getBoundingClientRect();
            let xCenter = left + width/2;
            let yCenter = top + height/2;
            return {xCenter, yCenter}
    }

//--------------click-----------------------------
    grid.addEventListener("click", click);

    function click(e) {
        console.log(e.target.parentElement.id);
    }

//---------------create elem---------------------------
function createEl(x, y, fileName) {
    let img = document.createElementNS(svgNameSpace, 'image');
    img.setAttributeNS(null, 'x', x - icoWidth/2);
    img.setAttributeNS(null, 'y', y - icoWidth/2);
    img.setAttributeNS(null, 'width', icoWidth);
    img.setAttributeNS(null, 'height', icoWidth);
    img.setAttributeNS(null, 'href', `../svg/ico/transIco/${fileName}.svg`);
    return img;
}
//---------------------------------------------------------
function createTempSign(x, y, temp) {
    let color = temp > rangeOfTemp? 'green': 'red';
    let g = document.createElementNS(svgNameSpace, 'g');

    let circle = document.createElementNS(svgNameSpace, 'circle');
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'fill', color);
    circle.setAttributeNS(null, 'r', 1);
//---------------not work!!!!why?????----------------------
    let text = document.createElementNS(svgNameSpace, 'text');
    text.setAttributeNS(null,"font-size","3");
    text.setAttributeNS(null, 'x', x);
    text.setAttributeNS(null, 'y', y);
    text.setAttributeNS(null, 'dy', 0.35);
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.setAttributeNS(null, 'font-size', '1px');
    text.setAttributeNS(null, 'style', 'fill:white');
    text.setAttributeNS(null, 'font-weight', 'bold');
    let textNode = document.createTextNode(temp);
    text.appendChild(textNode);
    g.appendChild(circle);
    g.appendChild(text);
    return g;
}

//-------------coord of pointer-------------------------

grid.addEventListener('mousemove', function(event) {
    pointerSvg.innerHTML = event.clientX + ' : ' + event.clientY;
});

//---------------------------------------------------
let zoomPace = 10;

grid.addEventListener('wheel', zoom)
 function zoom(e) {
    let curZoom = +zoomer.value
    let zoomVal = e.deltaY > 0? curZoom - zoomPace: curZoom + zoomPace;

    updateLayers(zoomVal);
    zoomInformer.textContent = Math.round(zoomVal) + "%";
    zoomer.value = zoomVal;
 }

//----------------input zoom------------------
zoomer.addEventListener("input", function (e) {
    let curZoom = e.currentTarget.valueAsNumber
    updateLayers(curZoom);
    zoomInformer.textContent = Math.round(curZoom ) + "%";
}, false);

function updateLayers(zoomVal) {
    svgObj.style.transform = "scale(" + zoomVal / 100 + ")";

    tempLayer.style.opacity = calculateOpacity(zoomVal, rangeOfOpacity);
}

let calculateOpacity = function(zoomVal, rangeOfOpacity){
    let result = (zoomVal -  rangeOfOpacity);
    if(result < 0)
        return 0;
    if(result > 1)
        return 1;
    return result;
}
// //-------------------------------------------------------
// grid.addEventListener('mousedown', start_drag);
// grid.addEventListener('mousemove', while_drag);
// grid.addEventListener('mouseup', stop_drag);
// main.addEventListener('mousedown', start_drag);
// main.addEventListener('mousemove', while_drag);
// main.addEventListener('mouseup', stop_drag);
// svgObj.addEventListener('mousedown', start_drag);
// svgObj.addEventListener('mousemove', while_drag);
// svgObj.addEventListener('mouseup', stop_drag);

// let start_dr;

// function start_drag(e) {
//     console.log('start_drag');
//     start_dr = {};
//     start_dr.x = e.clientX;
//     start_dr.y = e.clientY;
// }

// function while_drag(e) {
    
//     console.log('while_drag**');
//     if (start_dr) {
//         if (Math.abs(e.clientX - start_dr.x) > 0.6);
//          main.scrollLeft += e.clientX - start_dr.x < 0 ? 5 : -5;
//          svgDocument.css.style.top = '10px'

//         if (Math.abs(e.clientY - start_dr.y) > 0.6);
//         main.scrollTop += e.clientY - start_dr.y < 0 ? 5: -5;
//         start_dr.x = e.clientX;
//         start_dr.y = e.clientY;
//     }
// }

// function stop_drag() {
//     console.log('start_dr', start_dr )
//     console.log('stop_drag');
//     start_dr= null;
//     console.log('start_dr', start_dr )
// }

}


