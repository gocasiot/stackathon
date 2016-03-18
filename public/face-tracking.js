var vid = document.getElementById('videoel');
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');
var ctrack = new clm.tracker({useWebGL : true});
ctrack.init(pModel);
var initialYPosition, currentPositions, currentXPosition, currentYPosition, yDelta;
var facePoint = 62;
var videoStarted = false;

$('#overlay').click(function(){
	if(!videoStarted) {
		videoStarted = true;
		startVideo();
	} else {
		videoStarted = false;
		stopVideo();
	}
});


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// check for camerasupport
if (navigator.getUserMedia) {
	// set up stream
	
	var videoSelector = {video : true};
	if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
		var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
		if (chromeVersion < 20) {
			videoSelector = "video";
		}
	};

	navigator.getUserMedia(videoSelector, function( stream ) {
		if (vid.mozCaptureStream) {
			vid.mozSrcObject = stream;
		} else {
			vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
		}
		vid.play();
	}, function() {

		document.getElementById('gum').className = "hide";
		document.getElementById('nogum').className = "nohide";
		alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
	});
} 


function startVideo() {
	// start video
	vid.play();
	// start tracking
	ctrack.start(vid);
	// start loop to draw face
	drawLoop(videoStarted);
	alert('App Running');
}

function stopVideo() {
	vid.pause();
	ctrack.stop();
	drawLoop(videoStarted);
	alert('App Stopped');
}

// function pageScroll() {
// 	window.scrollBy(0,50); // horizontal and vertical scroll increments. 50px
// 	scrolldelay = setTimeout('pageScroll()',200); // scrolls every 200 milliseconds
// }

// function stopScroll() {
// 	clearTimeout(scrolldelay);
// }



function drawLoop() {
	if(videoStarted){
		requestAnimFrame(drawLoop);
		overlayCC.clearRect(0, 0, 400, 300);
		//psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);

		currentPositions = ctrack.getCurrentPosition();
		currentXPosition = currentPositions[facePoint][0].toFixed(2);
		console.log(currentXPosition);
		currentYPosition = currentPositions[facePoint][1].toFixed(2);

		yDelta = currentYPosition - 70;
		if(currentXPosition > 180) window.history.back();
		if(currentXPosition < 30) window.history.forward();

		if (currentPositions) {
			if(Math.abs(yDelta) > 10) window.scrollBy(0, 0.25*yDelta);
			ctrack.draw(overlay);
		}
	} else {
		return;
	}
}
