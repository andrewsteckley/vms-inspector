ww = 2894 // width of hires images
hh = 3797 // height of hires images
image_aspect = hh/ww
lenses_on = true


function imageZoom(src_img_ID, magnified_img_1_ID, magnified_img_2_ID) {
  var src_img, lens, result, cx, cy;
  src_img = document.getElementById(src_img_ID);
  mag_img_1 = document.getElementById(magnified_img_1_ID);
  mag_img_2 = document.getElementById(magnified_img_2_ID);

  /* keep only the specified width */
//  src_img.offsetHeight = src_img.offsetWidth * image_aspect;
<!--  src_img.height = src_img.width * image_aspect;-->

  /*create lens: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");

  /*create wide_lens: */
  wide_lens = document.createElement("DIV");
  wide_lens.setAttribute("class", "img-zoom-lens-wide");


  image_aspect = src_img.height / src_img.width
//  mag_img_1.width = src_img.width
//  mag_img_1.height = src_img.height
  mag_img_2.width = 2*src_img.width
  mag_img_2.height = src_img.height

    console.log("img src="+src_img.src)
    console.log("src_img.width="+src_img.width)
    console.log("src_img.naturalWidth="+src_img.naturalWidth)
    console.log("src_img.naturalHeight="+src_img.naturalHeight)
    console.log("src_img.clientWidth="+src_img.clientWidth)
    console.log("src_img.clientHeight="+src_img.clientHeight)



  /* set other sizes and positions */
  lens_width = Number(0.1 * src_img.width)
  lens_height = Number(0.1 * src_img.height)
  lens.style.width = lens_width + 'px';
  lens.style.height = lens_height + 'px';

  wide_lens_width = src_img.width
  wide_lens_height = Number(0.05 * src_img.height)
  wide_lens.style.width = wide_lens_width + 'px';
  wide_lens.style.height = wide_lens_height + 'px';

  /*insert lens:*/
  src_img.parentElement.insertBefore(lens, src_img);
  src_img.parentElement.insertBefore(wide_lens, src_img);

  mag_1_magnification_x = mag_img_1.offsetWidth / lens.offsetWidth;
  mag_1_magnification_y = mag_img_1.offsetHeight / lens.offsetHeight;

  mag_2_magnification_x = mag_img_2.offsetWidth / wide_lens.offsetWidth;
  mag_2_magnification_y = mag_img_2.offsetHeight / wide_lens.offsetHeight;


  /*set background properties for the result DIV:*/
  mag_img_1.style.backgroundImage = "url('" + src_img.src + "')";
  mag_img_1.style.backgroundSize = (src_img.width * mag_1_magnification_x) + "px " + (src_img.height * mag_1_magnification_y) + "px";

  mag_img_2.style.backgroundImage = "url('" + src_img.src + "')";
  mag_img_2.style.backgroundSize = (src_img.width * mag_2_magnification_x) + "px " + (src_img.height * mag_2_magnification_y) + "px";
//  alert("mag_img_2.style.backgroundSize="+mag_img_2.style.backgroundSize)

  /*execute a function when someone moves the cursor over the image, or the lens:*/

  src_img.addEventListener("mousemove", moveLenses);
//  src_img.addEventListener("mousemove", moveWideLense);
  src_img.addEventListener("click", toggleLenses);

  lens.addEventListener("mousemove", moveLenses);
  lens.addEventListener("click", toggleLenses);

  wide_lens.addEventListener("mousemove", moveLenses);
  wide_lens.addEventListener("click", toggleLenses);


  /*and also for touch screens:*/
//  lens.addEventListener("touchmove", moveLense);
//  src_img.addEventListener("touchmove", moveLense);
//  wide_lens.addEventListener("touchmove", moveWideLense);
//  src_img.addEventListener("touchclick", toggleLenses);

    lens_half_width = Number(lens.offsetWidth / 2)
    lens_half_height = Number(lens.offsetHeight / 2)
    wide_lens_half_width = Number(wide_lens.offsetWidth / 2)
    wide_lens_half_height = Number(wide_lens.offsetHeight / 2)


  function toggleLenses(e) {
    lenses_on = !lenses_on
//    print("toggling")
  }

  function moveLenses(e) {
    if (!lenses_on ) {
        return;
    }
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();

    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);

    /*calculate the position of the lens:*/
    mag_1_rect_left = pos.x_into_img - lens_half_width;
    mag_1_rect_top  = pos.y_into_img - lens_half_height;

    mag_2_rect_left = pos.x_into_img - wide_lens_half_width;
    mag_2_rect_top  = pos.y_into_img - wide_lens_half_height;

    /*prevent the lens from being positioned outside the image:*/
    if (mag_1_rect_left > src_img.width - lens.offsetWidth)  {mag_1_rect_left = src_img.width  - lens.offsetWidth;}
    if (mag_1_rect_left < lens_half_width) {mag_1_rect_left = 0;}
    if (mag_1_rect_top > (src_img.height - lens.offsetHeight)) {mag_1_rect_top  = src_img.height - lens.offsetHeight;}
    if (mag_1_rect_top < 0 ) {mag_1_rect_top = 0;}

    if (mag_2_rect_left > src_img.width - wide_lens.offsetWidth) {mag_2_rect_left = src_img.width - wide_lens.offsetWidth;}
    if (mag_2_rect_left < wide_lens_half_width) {mag_2_rect_left = 0;}
    if (mag_2_rect_top > src_img.height - wide_lens.offsetHeight) {mag_2_rect_top = src_img.height - wide_lens.offsetHeight;}
    if (mag_2_rect_top < 0) {mag_2_rect_top = 0;}

    lens_left = pos.src_img_client_rec_left  + mag_1_rect_left
    lens_top = mag_1_rect_top + pos.mag_img_2_client_rec_height + pos.unidentified_vertical_offset

    wide_lens_left = pos.src_img_client_rec_left  + mag_2_rect_left
    wide_lens_top =  mag_2_rect_top + pos.mag_img_2_client_rec_height + pos.unidentified_vertical_offset

    lens.style.left = lens_left + "px";
    lens.style.top = lens_top + "px";

    wide_lens.style.left = wide_lens_left + "px";
    wide_lens.style.top = wide_lens_top + "px";

    /*display what the lens "sees":*/
    mag_img_1.style.backgroundPosition =
                                        "-" + (mag_1_rect_left * mag_1_magnification_x) + "px " +
                                        "-" + (mag_1_rect_top * mag_1_magnification_y) + "px";
    mag_img_2.style.backgroundPosition = "-" + (0) + "px " +
                                         "-" + (mag_2_rect_top * mag_2_magnification_y) + "px";
}

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    src_img_client_rec = src_img.getBoundingClientRect();
    mag_img_2_client_rec = mag_img_2.getBoundingClientRect();
    unidentified_vertical_offset = 13;

    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x_into_img = e.pageX - src_img_client_rec.left;
    y_into_img = e.pageY - src_img_client_rec.top;

    /*consider any page scrolling:*/
    x_into_img = x_into_img - window.pageXOffset;
    y_into_img = y_into_img - window.pageYOffset;

    return {x_into_img : x_into_img,
    y_into_img : y_into_img,
    pageX: e.pageX,
    pageY: e.pageY,
    src_img_client_rec_left: src_img_client_rec.left,
    src_img_client_rec_top:src_img_client_rec.top,
    mag_img_2_client_rec_height: mag_img_2_client_rec.height,
    mag_img_2_client_rec_top:mag_img_2_client_rec.top,
    unidentified_vertical_offset: unidentified_vertical_offset};
  }
}


function ToggleDisplayHideRows(checkbox){
    row_id_to_toggle = `src_${checkbox.id}`
    rows_to_toggle  = document.querySelectorAll(`.${row_id_to_toggle}`);
    len = rows_to_toggle.length
    if (checkbox.checked) {
        for (let i = 0; i < len; i++) {
            row_to_toggle = rows_to_toggle[i]
            row_to_toggle.style.display = 'table-row';
        }
    }else{
        for (let i = 0; i < len; i++) {
            row_to_toggle = rows_to_toggle[i]
		    row_to_toggle.style.display = 'none';
        }
    }
}


function prevImg(){
  document.getElementById("previous").src = "left_icon.png";
};
function prevHoverImg(){
  document.getElementById("previous").src = "left_hover_icon.png";
};

function nextImg(){
  document.getElementById("next").src = "right_icon.png";
};
function nextHoverImg(){
  document.getElementById("next").src = "right_hover_icon.png";
};

function tocImg(){
  document.getElementById("toc").src = "toc_icon.png";
};
function tocHoverImg(){
  document.getElementById("toc").src = "toc_hover_icon.png";
};

