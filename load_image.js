var ffi = require('ffi'),
    ref = require('ref');

if ( ! process.argv[2] ) {
	console.error('I need one argument!');
	return;
}

var OpenCV = ffi.Library('libopencv_highgui', {
	'cvCreateCameraCapture': [ 'pointer', [ 'int' ] ],
	'cvQueryFrame': [ 'pointer', [ 'pointer' ] ],
	'cvLoadImageM': [ 'pointer', [ 'string', 'int' ] ],
	'cvNamedWindow': [ 'void', [ 'string', 'int' ] ],
	'cvShowImage': [ 'void', [ 'string', 'pointer' ] ],
	'cvWaitKey': [ 'int', [ 'int' ] ]
});

OpenCV.cvNamedWindow('CAMERA_OUTPUT', 1);
var capture = OpenCV.cvCreateCameraCapture(0);

while ( true ) {
	var frame = OpenCV.cvQueryFrame(capture);
	OpenCV.cvShowImage('CAMERA_OUTPUT', frame);
	var key = OpenCV.cvWaitKey(10);
	if ( key === 27 ) {
		break;
	}
}

/*var image = OpenCV.cvLoadImageM(process.argv[2], 0);

console.log(image);

if ( ! image.isNull() ) {
	OpenCV.cvShowImage(process.argv[2], image);
	OpenCV.cvWaitKey(0);
}*/