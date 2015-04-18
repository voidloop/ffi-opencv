var ffi = require('ffi'),
    ref = require('ref');

var OpenCV = ffi.Library('libopencv_highgui', {
	'cvCreateCameraCapture': [ 'pointer', [ 'int' ] ],
	'cvQueryFrame': [ 'pointer', [ 'pointer' ] ],
	'cvReleaseCapture': [ 'void', [ 'pointer' ] ], // ref to pointer
	'cvNamedWindow': [ 'void', [ 'string', 'int' ] ],
	'cvShowImage': [ 'void', [ 'string', 'pointer' ] ],
	'cvDestroyWindow': [ 'void', [ 'string'] ],
	'cvWaitKey': [ 'int', [ 'int' ] ]
});

OpenCV.cvNamedWindow('CAMERA_OUTPUT', 1);
var capture = OpenCV.cvCreateCameraCapture(0);

while ( true ) {
	var frame = OpenCV.cvQueryFrame(capture);
	OpenCV.cvShowImage('CAMERA_OUTPUT', frame);
	var key = OpenCV.cvWaitKey(10);
	if ( 27 === key ) {
		break;
	}
}

OpenCV.cvReleaseCapture(capture.ref());
OpenCV.cvDestroyWindow('CAMERA_OUTPUT');
