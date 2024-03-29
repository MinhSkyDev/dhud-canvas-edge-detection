document.addEventListener('DOMContentLoaded', function(){
	var v = document.getElementById('v');
	var canvas = document.getElementById('c');
	var context = canvas.getContext('2d');
	var back = document.createElement('canvas')
	var backcontext = back.getContext('2d');
 
	var cw,ch;
 
	v.addEventListener('play', function(){
		cw = v.clientWidth;
		ch = v.clientHeight;
		canvas.width = cw;
		canvas.height = ch;
		back.width = cw;
		back.height = ch;
		draw(v,context,backcontext,cw,ch);
	});
 
});
 
function draw(v,c,bc,cw,ch) {
	if(v.paused || v.ended)	return false;
	// First, draw it into the backing canvas
	bc.drawImage(v,0,0,cw,ch);
	// Grab the pixel data from the backing canvas
	var idata = bc.getImageData(0,0,cw,ch);
	var data = idata.data;
	var w = idata.width;
	var limit = data.length
	// Loop through the subpixels, convoluting each using an edge-detection matrix.
	for(var i = 0; i < limit; i++) {
		if( i%4 == 3 ) continue;
		data[i] = 127 + 2*data[i] - data[i + 4] - data[i + w*4];
	}
	// Draw the pixels onto the visible canvas
	c.putImageData(idata,0,0);
	// Start over!
	setTimeout(draw,20,v,c,bc,cw,ch);
}