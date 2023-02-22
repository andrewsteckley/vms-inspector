ww = 2894
hh = 3797
image_aspect = hh/ww
lenses_on = true

function imageZoom(imgID, result_1_ID, result_2_ID, result_3_ID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result_1 = document.getElementById(result_1_ID);
  result_2 = document.getElementById(result_2_ID);
  result_3 = document.getElementById(result_3_ID);

  /* keep only the specified width */
  img.offsetHeight = img.offsetWidth * image_aspect;
<!--  img.height = img.width * image_aspect;-->

  /*create lens: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");

  /*create lens_wide: */
  lens_wide = document.createElement("DIV");
  lens_wide.setAttribute("class", "img-zoom-lens-wide");


  /* set other sizes and positions */
  lens_width = (0.1 * img.width)
  lens_height = (0.1 * img.height)
//  lens_size = (0.1 * img.height)
  lens.style.width = lens_width + 'px';
  lens.style.height = lens_height + 'px';

  lens_wide_width = img.width
  lens_wide_height = (0.05 * img.height)
  lens_wide.style.width = img.width + 'px';
  lens_wide.style.height = lens_wide_height + 'px';

  result_1.style.width = img.offsetWidth;
  result_1.style.height = img.offsetHeight;
  result_1.offsetWidth = img.offsetWidth;
  result_1.offsetHeight = img.offsetHeight;
  result_2.offsetWidth = 2*img.offsetWidth;
  result_2.offsetHeight = 2*img.offsetHeight;

  result_3.style.width = img.offsetWidth;
  result_3.style.height = img.offsetHeight;
  result_3.offsetWidth = img.offsetWidth;
  result_3.offsetHeight = img.offsetHeight;

  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  img.parentElement.insertBefore(lens_wide, img);

  /*calculate the ratio between result DIVs and lens:*/
//  hor_offset = ((img.offsetWidth - img.width)/2)
//  hor_offset = ((img.offsetWidth - img.width)/2)+1500
//  ver_offset = ((img.offsetHeight - img.height)/2)+1500
  cx_1 = result_1.offsetWidth / lens.offsetWidth;
  cy_1 = result_1.offsetHeight / lens.offsetHeight;
  cx_2 = result_2.offsetWidth / lens_wide.offsetWidth;
  cy_2 = result_2.offsetHeight / lens_wide.offsetHeight;


  /*set background properties for the result DIV:*/
  result_1.style.backgroundImage = "url('" + img.src + "')";
  result_1.style.backgroundSize = (img.width * cx_1) + "px " + (img.height * cy_1) + "px";
  result_2.style.backgroundImage = "url('" + img.src + "')";
  result_2.style.backgroundSize = (img.width *  cx_2) + "px " + (img.height * cy_2) + "px";
  result_3.style.backgroundImage = "url('" + img.src + "')";
  result_3.style.backgroundSize = (img.width * cx_1) + "px " + (img.height * cy_1) + "px";

  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLenses);
  lens_wide.addEventListener("mousemove", moveLenses);
  img.addEventListener("mousemove", moveLenses);
  lens_wide.addEventListener("click", toggleLenses);
  img.addEventListener("click", toggleLenses);

  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLenses);
  img.addEventListener("touchmove", moveLenses);
  lens_wide.addEventListener("touchmove", moveLenses);
//  img.addEventListener("touchclick", toggleLenses);


  function toggleLenses(e) {
    lenses_on = !lenses_on
//    print("toggling")
  }

function moveLenses(e) {
    if (!lenses_on ) {
        return;
    }
//    print(lenses_on)
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
//    y2 = y;
    y2 = y + (lens.offsetHeight / 4 );
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    lens_wide.style.top = y2 + "px";
    /*display what the lens "sees":*/
    result_1.style.backgroundPosition = "-" + (x * cx_1) + "px -" + (y * cy_1) + "px";
<!--    result_2.style.backgroundPosition = "-" + (x * cx_2) + "px -" + (y * cy_2) + "px";-->
    result_2.style.backgroundPosition = "-" + (0) + "px -" + (y2 * cy_2) + "px";
}

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
//  alert("redy")
//  capture_element = document.getElementById(capture_ID);
//  capture_element.addEventListener("click", oncapture);
//  crop_setup()


//        $('#capture').click(function(){
//        alert("redy")
//       entry = $('#message').html()
//
//        tx = $('#x').val();
//        ty = $('#y').val();
//        tx2 = $('#x2').val();
//        ty2 = $('#y2').val();
//        tw = $('#w').val();
//        th = $('#h').val();
//        entry = entry + tx  + ' ' + ty + ' ' + tx2 + ' ' + ty2 + ' ' + tw +' ' + th + "<br>"
////        alert( tx  + ' ' + ty + ' ' + tx2 + ' ' + ty2 + ' ' + tw +' ' + th)
////        alert(t);
//
//        //The new text that we want to show.
//        var newText = 'This text has been changed!';
//
//        //Change the text using the text method.
//        $('#message').html(entry);
//
//    });



}


function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}



function crop_setup(){
    // for sample 1
    alert("crop setup")
    $('#myresult3').Jcrop({ // we linking Jcrop to our image with id=cropbox1
        aspectRatio: 0,
        onChange: updateCoords,
        onSelect: updateCoords
    });
};

function updateCoords(c) {
    alert("updateing")
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);

    $('#x2').val(c.x2);
    $('#y2').val(c.y2);


    var rx = 200 / c.w; // 200 - preview box size
    var ry = 200 / c.h;

    $('#preview').css({
        width: Math.round(rx * 800) + 'px',
        height: Math.round(ry * 600) + 'px',
        marginLeft: '-' + Math.round(rx * c.x) + 'px',
        marginTop: '-' + Math.round(ry * c.y) + 'px'
    });
};

//function oncapture(e){
////    alert("oncpatuer")
//       entry = $('#message').html()
//
//        tx = $('#x').val();
//        ty = $('#y').val();
//        tx2 = $('#x2').val();
//        ty2 = $('#y2').val();
//        tw = $('#w').val();
//        th = $('#h').val();
//        entry = entry + tx  + ' ' + ty + ' ' + tx2 + ' ' + ty2 + ' ' + tw +' ' + th + "<br>"
//        $('#message').html(entry);
//}


//setup() {
//
//        $('#capture').click(function(){
//        alert("redy")
//       entry = $('#message').html()
//
//        tx = $('#x').val();
//        ty = $('#y').val();
//        tx2 = $('#x2').val();
//        ty2 = $('#y2').val();
//        tw = $('#w').val();
//        th = $('#h').val();
//        entry = entry + tx  + ' ' + ty + ' ' + tx2 + ' ' + ty2 + ' ' + tw +' ' + th + "<br>"
////        alert( tx  + ' ' + ty + ' ' + tx2 + ' ' + ty2 + ' ' + tw +' ' + th)
////        alert(t);
//
//        //The new text that we want to show.
//        var newText = 'This text has been changed!';
//
//        //Change the text using the text method.
//        $('#message').html(entry);
//
//    });
//   };

 $(document).ready(function () {

        $('#capture').click(function(){
       entry = $('#message').html()

        tx = $('#x').val();
        ty = $('#y').val();
        tx2 = $('#x2').val();
        ty2 = $('#y2').val();
        tw = $('#w').val();
        th = $('#h').val();
        entry = entry + tx  + ' ' + ty + ' ' + tx2 + ' ' + ty2 + ' ' + tw +' ' + th + "<br>"
//        alert( tx  + ' ' + ty + ' ' + tx2 + ' ' + ty2 + ' ' + tw +' ' + th)
//        alert(t);

        //The new text that we want to show.
        var newText = 'This text has been changed!';

        //Change the text using the text method.
        $('#message').html(entry);

    });
        });


