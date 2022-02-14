//Setting map on warious screens
//Landscape screens
if(screen.width > window.innerWidth)
{
  let correctWidth = window.innerWidth;
}
else
{
  let correctWidth = screen.width;
}
if(correctWidth > screen.height)
{
 if(screen.width < 1200)
 {
   document.getElementById('zoom-container').style.width = correctWidth - 60 + 'px';
   document.getElementById('zoom-container').style.height = (correctWidth - 60) / 2 + 'px';
   document.getElementById('wrap-zoom').style.width = correctWidth - 60 + 'px';
   document.getElementById('wrap-zoom').style.height = (correctWidth - 60) / 2 + 'px';
   document.getElementById('img-map').style.width = correctWidth - 60 + 'px';
   document.getElementById('img-map').style.height = correctWidth - 60 / 2 + 'px';
 }
}
// Portrait screens
else
{
 document.getElementById('img-map').src = 'https://uploads-ssl.webflow.com/60e6c9a6b5e67e31c5e15e06/60e6c9a6b5e67e5d84e15fd1_Map_more_area_vertical.png';
 if((correctWidth - 60) * 2 < screen.height)
 {
   document.getElementById('zoom-container').style.width = correctWidth - 60 + 'px';
   document.getElementById('zoom-container').style.height = (correctWidth - 60) * 2 + 'px';
   document.getElementById('wrap-zoom').style.width = correctWidth - 60 + 'px';
   document.getElementById('wrap-zoom').style.height = (correctWidth - 60) * 2 + 'px';
   document.getElementById('img-map').style.width = correctWidth - 60 + 'px';
   document.getElementById('img-map').style.height = (correctWidth - 60) * 2 + 'px';
 }
 else
 {
   document.getElementById('zoom-container').style.width = (screen.height / 2) - 60 + 'px';
   document.getElementById('zoom-container').style.height = (screen.height / 2 - 60) * 2 + 'px';
   document.getElementById('wrap-zoom').style.width = screen.height / 2 - 60 + 'px';
   document.getElementById('wrap-zoom').style.height = (screen.height / 2 - 60) * 2 + 'px';
   document.getElementById('img-map').style.width = screen.height / 2 - 60 + 'px';
   document.getElementById('img-map').style.height = (screen.height / 2 - 60) * 2 + 'px';
 }
}

// Zoom and pan
var zoomer = (function () {
   var wrapElement = null,
     x_cursor = 0,
     y_cursor = 0,
     x_wrapElement = 0,
     y_wrapElement = 0,
     orig_width = document.getElementById('wrap-zoom').getBoundingClientRect().width,
     orig_height = document.getElementById('wrap-zoom').getBoundingClientRect().height,
     current_top = 0,
     current_left = 0,
     zoom_factor = 2.0,
   mapImg = document.getElementById('img-map');
 var new_width = (orig_width * zoom_factor);
   var new_heigth = (orig_height * zoom_factor);
 wrapElement = document.getElementById('wrap-zoom');
 wrapElement.style.width = new_width + 'px';
 wrapElement.style.height = new_heigth + 'px';
 if(correctWidth > screen.height)
 {
   wrapElement.style.left = '-528px';
   wrapElement.style.top = '-414px';
 }
 else
 {
   wrapElement.style.left = '-141px';
   wrapElement.style.top = '-596px';

 }

 mapImg.style.width = new_width + 'px';
 mapImg.style.height = new_heigth + 'px';
 wrapElement = null;

   return {
       zoom: function (zoomincrement) {
           wrapElement = document.getElementById('wrap-zoom');
           zoom_factor = zoom_factor + zoomincrement;
           if (zoom_factor <= 1.0)
           {
               zoom_factor = 1.0;
               wrapElement.style.top =  '0px';
               wrapElement.style.left = '0px';
           }
     if(zoom_factor > 5.0)
     {
       zoom_factor = 5.0;
     }

           new_width = (orig_width * zoom_factor);
           new_heigth = (orig_height * zoom_factor);

           if (current_left < (orig_width - new_width))
           {
               current_left = (orig_width - new_width);
           }
           if (current_top < (orig_height - new_heigth))
           {
               current_top = (orig_height - new_heigth);
           }
           wrapElement.style.left = current_left + 'px';
           wrapElement.style.top = current_top + 'px';
           wrapElement.style.width = new_width + 'px';
           wrapElement.style.height = new_heigth + 'px';
     mapImg.style.width = new_width + 'px';
           mapImg.style.height = new_heigth + 'px';

           wrapElement = null;
       },

       start_drag: function () {
         if (zoom_factor <= 1.0)
         {
            return;
         }
         wrapElement = this;
         x_wrapElement = window.event.clientX - document.getElementById('wrap-zoom').offsetLeft;
         y_wrapElement = window.event.clientY - document.getElementById('wrap-zoom').offsetTop;

       },

   startDragTouch: function () {
     if (zoom_factor <= 1.0)
         {
            return;
         }
     event.preventDefault();
     var touch = event.touches[0];
         wrapElement = this;
         x_wrapElement = touch.clientX - document.getElementById('wrap-zoom').offsetLeft;
         y_wrapElement = touch.clientY - document.getElementById('wrap-zoom').offsetTop;
   },
       stop_drag: function () {
         if (wrapElement !== null) {
           if (zoom_factor <= 1.0)
           {
             wrapElement.style.left = '0px';
             wrapElement.style.top =  '0px';
           }

           }
         wrapElement = null;
       },

       stopDragTouch: function () {
         if (wrapElement !== null) {
       event.preventDefault();
           if (zoom_factor <= 1.0)
           {
             wrapElement.style.left = '0px';
             wrapElement.style.top =  '0px';
           }

           }
         wrapElement = null;
       },

   while_drag: function () {
           if (wrapElement !== null)
           {
               var x_cursor = window.event.clientX;
               var y_cursor = window.event.clientY;
               var new_left = (x_cursor - x_wrapElement);
               if (new_left > 0)
               {
                   new_left = 0;
               }
               if (new_left < (orig_width - wrapElement.offsetWidth))
               {
                   new_left = (orig_width - wrapElement.offsetWidth);
               }
               var new_top = ( y_cursor - y_wrapElement);
               if (new_top > 0)
               {
                   new_top = 0;
               }
               if (new_top < (orig_height - wrapElement.offsetHeight))
               {
                   new_top = (orig_height - wrapElement.offsetHeight);
               }
               current_left = new_left;
               wrapElement.style.left = new_left + 'px';
               current_top = new_top;
               wrapElement.style.top = new_top + 'px';

           }
       },
   whileDragTouch: function () {
     event.preventDefault();
           if (wrapElement !== null)
           {
   var touch = event.touches[0];
               var x_cursor = touch.clientX;
               var y_cursor = touch.clientY;
               var new_left = (x_cursor - x_wrapElement);
               if (new_left > 0)
               {
                   new_left = 0;
               }
               if (new_left < (orig_width - wrapElement.offsetWidth))
               {
                   new_left = (orig_width - wrapElement.offsetWidth);
               }
               var new_top = ( y_cursor - y_wrapElement);
               if (new_top > 0)
               {
                   new_top = 0;
               }
               if (new_top < (orig_height - wrapElement.offsetHeight))
               {
                   new_top = (orig_height - wrapElement.offsetHeight);
               }
               current_left = new_left;
               wrapElement.style.left = new_left + 'px';
               current_top = new_top;
               wrapElement.style.top = new_top + 'px';

           }
       }
   };
} ());

document.getElementById('zoomout').addEventListener('click', function() {
 zoomer.zoom(-0.25);
});
document.getElementById('zoomin').addEventListener('click', function() {
 zoomer.zoom(0.25);
});

document.getElementById('wrap-zoom').addEventListener('mousedown', zoomer.start_drag);
document.getElementById('zoom-container').addEventListener('mousemove', zoomer.while_drag);
document.getElementById('zoom-container').addEventListener('mouseup', zoomer.stop_drag);
document.getElementById('zoom-container').addEventListener('mouseout', zoomer.stop_drag);
// Touch devices
document.getElementById('wrap-zoom').addEventListener('touchstart', zoomer.startDragTouch);
document.getElementById('zoom-container').addEventListener('touchmove', zoomer.whileDragTouch);
document.getElementById('zoom-container').addEventListener('touchend', zoomer.stopDragTouch);

// popWraps and pins
let objectInfo = document.getElementsByClassName('olimpiade__object-info');
const mapInfo = [];
for(let i = 0; i < objectInfo.length; i++)
{
  mapInfo.push([]);
  for(let j = 0; j < objectInfo[i].children.length; j++)
  {
    mapInfo[i].push(objectInfo[i].children[j].innerHTML);
  }
}
let selectedPin = '';
// Putting pins
let map = document.getElementById('wrap-zoom');
let pinHight = 44;
let pinWidthCorrection = 15;
function putPins ()
{
 let dropDown = document.getElementById('selectedobject');
 for(let i = 0; i < mapInfo.length; i++)
 {
     let pin = document.createElement('div');
     let pinImg = document.createElement('img');
     pinImg.src = 'https://uploads-ssl.webflow.com/60e6c9a6b5e67e31c5e15e06/60e6c9a6b5e67e2021e160a8_ff7f00%20.svg';
     pinImg.className = 'map__img-pin';
     pin.className = 'map__pin';
     pin.id = 'pin_' + i;
     pin.style.top = 'calc(' + mapInfo[i][3] + '% - ' + pinHight + 'px)';
     pin.style.left = 'calc(' + mapInfo[i][4] + '% - ' + pinWidthCorrection + 'px)';
     pin.append(pinImg);
     // Creating pin number
     let pinNum = document.createElement('div');
     pinNum.className = 'map__pin-num';
     pinNum.innerHTML = (i + 1);
     pin.append(pinNum);
     map.append(pin);
 }
}
function createPopup(id)
{
 let mapModal = document.createElement('div');
 mapModal.className = 'modal';
 mapModal.style.display = 'block';
 let mapModalContent = document.createElement('div');
 mapModalContent.className = 'modal__content';
 mapModal.append(mapModalContent);
 let popWrap = document.createElement('div');
 popWrap.className = 'map__wrap-popup';
 let popHeading = document.createElement('h3');
 popHeading.className = 'olimpiade__heading_strech';
 popHeading.innerHTML = mapInfo[id][0];
 popWrap.append(popHeading);
 let popImg = document.createElement('img');
 popImg.className = 'map__img-popup';
 popImg.src = mapInfo[id][2];
 let popImgWrap = document.createElement('div');
 popImgWrap.className = 'map__wrap-img mb_20';
 popImgWrap.append(popImg);
 popWrap.append(popImgWrap);
 let popInfo = document.createElement('div');
 popInfo.className = 'olimpiade_paragraph txt_align_justify';
 popInfo.innerHTML = mapInfo[id][1];
 popWrap.append(popInfo);
 // Close btn
 let popClose = document.createElement('div');
 popClose.className = 'wrap-btn-close popup__wrap-btn-close';
 let popCloseBarA = document.createElement('div');
 popCloseBarA.className = 'wrap-btn-close__bar wrap-btn-close__bar_top';
 popClose.append(popCloseBarA);
 let popCloseBarB = document.createElement('div');
 popCloseBarB.className = 'wrap-btn-close__bar wrap-btn-close__bar_bottom';
 popClose.append(popCloseBarB);
 mapModalContent.append(popClose);
 // Add to body
 mapModalContent.append(popWrap);
 document.body.append(mapModal);
 // Closeing popup
 mapModal.addEventListener('click', (e) =>
 {
   document.body.removeChild(mapModal);
 });

}
putPins();

let pins = document.getElementsByClassName('map__pin');
for(let i = 0; i < pins.length; i++)
{
 pins[i].addEventListener('click', (e) =>
 {
   createPopup(e.target.parentNode.id.split('_')[1]);
 });
 pins[i].addEventListener('touchstart', (e) =>
 {
   createPopup(e.target.parentNode.id.split('_')[1]);
 });
}
