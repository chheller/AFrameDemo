$(function() {
  //Useful function
  function clamp(min, max, val){
    if(val < min)
      return min;
    if(val > max)
      return max;
    return val;
  }


  $(document).ready(function() {
    //Hide the intitial fields
    $(".sphere").hide();
    $(".cylinder").hide();
    //show shape button event registering
    $('#showcubes').click(showCubesClick);
    $('#showspheres').click(showSpheresClick);
    $('#showcylinders').click(showCylindersClick);
    //clear shape database event registering
    $('#clearcubes').click(clearCubesClick);
    $('#clearspheres').click(clearSpheresClick);
    $('#clearcylinders').click(clearCylinders);
    //form submit event registering
    $('#formsubmit').on("submit", formSubmit);
    //change form layout event registering
    $(".shapeform input").change(changeShape);
    //validation function event registering
    $(".shapeform input[name=posx]").change(validatePosX);
    $(".shapeform input[name=posy]").change(validatePosY);
    $(".shapeform input[name=posz]").change(validatePosZ);
    $(".shapeform input[name=rotx]").change(validateRotX);
    $(".shapeform input[name=roty]").change(validateRotY);
    $(".shapeform input[name=rotz]").change(validateRotZ);
    $(".shapeform input[name=cubeheight]").change(validateCubeHeight);
    $(".shapeform input[name=width]").change(validateWidth);
    $(".shapeform input[name=depth]").change(validateDepth);
    $(".shapeform input[name=height]").change(validateHeight);
    $(".shapeform input[name=radius]").change(validateRadius);
    $(".shapeform input[name=color]").change(validateColor);

  });

  //AJAX post to render cubes from database
   function showCubesClick() {
    $.post('/showcubes', function(res) {
      $('#shapes').append(res);
    });
  }
  function showSpheresClick() {
    $.post('/showspheres', function(res) {
      $('#shapes').append(res);
    });
  }
  function showCylindersClick() {
    $.post('/showcylinders', function(res) {
      $('#shapes').append(res);
    });
  }

  //AJAX post to drop the collections containing cube, cylinder and sphere documents
  function clearCubesClick() {
    $.post('/clearcollection', {collection: 'cubecollection'}, function(res) {
      alert("Cubes cleared");
    });
  }
  function clearSpheresClick() {
    $.post('/clearcollection', {collection: 'spherecollection'}, function(res) {
      alert("Spheres cleared");
    });
  }
  function clearCylinders() {
    $.post('/clearcollection', {collection: 'cylindercollection'}, function(res) {
      alert("Cylinders cleared");
    });
  }

  //AJAX post the result, preventing the default HTML redirect. This makes the page
  //more responsive and UX friendly
   function formSubmit(event) {

      $.post('/AFrameForm', $(this).serializeArray(), function(res) {
         $("#alertarea").append(res);
      });
      event.preventDefault();
    }

  //JQuery validation of each input field
  function validatePosX() {
     $("#posx").val(clamp(-50, 50, $("#posx").val()));
   }
  function validatePosY() {
    $("#posy").val(clamp(-50, 50, $("#posy").val()));
  }
  function validatePosZ() {
    $("#posz").val(clamp(-50, 50, $("#posz").val()));
  }

 function validateRotX() {
    $("#rotx").val(clamp(-180, 180, $("#rotx").val()));
  }

  function validateRotY() {
    $("#roty").val(clamp(-180, 180,  $("#roty").val()));
  }

 function validateRotZ() {
    $("#rotz").val(clamp(-180, 180, $("#rotz").val()));
  }

  function validateCubeHeight() {
    $("#cubeheight").val(clamp(0, 10, $("#cubeheight").val()));
  }

 function validateWidth() {
    $("#width").val(clamp(0, 10, $("#width").val()));
  }

  function validateDepth() {
    $("#depth").val(clamp(0, 10, $("#depth").val()));
  }

   function validateHeight() {
    $("#height").val(clamp(0, 10, $("#height").val()));
  }

   function validateRadius() {
    $("#radius").val(clamp(0, 10, $("#radius").val()));
  }

   function validateColor() {
    var regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
    if(!regColorcode.test($("#color").val()))
      $("#color").val("FFFFFF");
  }

  //Dynamically show and hide fields depending on the currently selected shape
  function changeShape() {
  //alert($('input[name=shape_filter]:checked', '.shapeform').val());
    if ($('input[name=shape_filter]:checked', '.shapeform').val() == 0) {
      $(".sphere").hide();
      $(".cube").show();
      $(".cylinder").hide();
    }
    if ($('input[name=shape_filter]:checked', '.shapeform').val() == 1) {
      $(".sphere").show();
      $(".cube").hide();
      $(".cylinder").hide();
    }
    if ($('input[name=shape_filter]:checked', '.shapeform').val() == 2) {
      $(".sphere").show();
      $(".cube").hide();
      $(".cylinder").show();
    }
  }
});
