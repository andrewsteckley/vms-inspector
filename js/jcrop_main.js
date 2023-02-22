$(function(){
    // for sample 1
    $('#cropbox1').Jcrop({ // we linking Jcrop to our image with id=cropbox1
        aspectRatio: 0,
        onChange: updateCoords,
        onSelect: updateCoords
    });
});

function updateCoords(c) {
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

//jQuery(window).load(function(){
//    $("#accordion").accordion({autoHeight: false,navigation: true});
//});

//function checkCoords() {
//    if (parseInt($('#w').val())) return true;
//    alert('Please select a crop region then press submit.');
//    return false;
//};


function test(){
    console.log($('#x'))
    $('#x1').html("clicked")
//    print("hello");
};


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



//function setup(){
//
//};


