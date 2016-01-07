// var jQuery = require('./build/js/jquery-1.7.2.min');
// const THREE = require("three-js")();
var Valiant360 = require('./build/jquery.valiant360');
var ipc = require('ipc');


var audioContext = new global.AudioContext()

console.log("Started");

var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));

console.log(dir);

// document.getElementById("valContainer").style.width = 860;
// document.getElementById("valContainer").style.height = 470;




// vc = document.createElement("valContainer");
// vc.style.width = window.innerWidth;
// vc.style.width = window.innerHeight;

$(document).ready(function() {


    // load new video file
    // $('.valContainer').Valiant360('loadVideo', 'build/overpass-clip.mp4');
    // $('.valContainer').Valiant360('play');

    // $('.valContainer').Valiant360();

    $('.valContainer').Valiant360({
        clickAndDrag: true,	// use click-and-drag camera controls
        flatProjection: false,	// map image to appear flat (often more distorted)
        fov: 35, 				// initial field of view
        hideControls: false,	// hide player controls
        lon: 0, 				// initial lon for camera angle
        lat: 0, 				// initial lat for camera angle
        loop: "loop", 			// video loops by default
        muted: true,			// video muted by default
        autoplay: false			// video autoplays by default
    });

    // console.log($('.valContainer').width());
    // $('.valContainer').width(850);
    // $('.valContainer').height(460);

    // $('.valContainer').Valiant360('resize',860,470);

    // $('.valContainer').width(860);
    // $('.valContainer').height(470);

    // console.log($('.valContainer').width());

    midiSync.initMidi();


    // play video
    // $('.valContainer').Valiant360('destroy');
    // $('.valContainer').Valiant360();

    // $('.valContainer').Valiant360('fullscreen');
    $('.valContainer').Valiant360('loadVideo', 'build/overpass-clip.mp4');
    $('.valContainer').Valiant360('play');

    // $('.valContainer').Valiant360('pause');
    // $('.valContainer').Valiant360().function() {
    //     loadVideo($(this), "build/WM-Goal_Clean.mp4");
    // });

    // $('.valContainer').Valiant360('unloadVideo');
    // $('.valContainer').Valiant360('loadVideo', 'build/WM-Goal_Clean.mp4');
    // $('.valContainer').Valiant360('loadVideo');

    // $('.valContainer').Valiant360('loadVideo');



});

midiSync.onStart = function() {

    console.log("MIDIStart");
    $('.valContainer').Valiant360('play');
}

midiSync.onStop = function() {

    console.log("MIDIStop");
    $('.valContainer').Valiant360('pause');
}

midiSync.seekTo = function(time) {

    // console.log(time);
    $('.valContainer').Valiant360('seekTo', time);
}





// $('.valiantContainer').Valiant360('onMouseDown', function(){
//
//
//     console.log("mouse down")
//
// });



// $('.valiantContainer').Valiant360('fullscreen');


// valiant360.play;

// pause video
// $('.valiantContainer').Valiant360('pause');



// load new photo file
// $('.valiantContainer').Valiant360('loadPhoto', 'path/to/file.jpg');
