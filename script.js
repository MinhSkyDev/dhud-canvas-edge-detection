
function draw(v,c,bc,cw,ch) {
    if(v.paused || v.ended) return false;
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
    console.log(idata);
    c.putImageData(idata,0,0);
    // Start over!
    //setTimeout(draw,20,v,c,bc,cw,ch);
}

function grabScreen(){
  let player = document.getElementById('player')
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  //grab a frame from the video
  ctx.drawImage(player, 0, 0,450,450);
  var back = document.createElement('canvas');
  var backcontext = back.getContext('2d');

  draw(player,ctx,backcontext,player.videoWidth,player.videoHeight)
}




document.addEventListener('DOMContentLoaded', ()=>{
  let player = document.getElementById('player');
  player.addEventListener('timeupdate', (ev)=>{
      //click the video to grab a screenshot and display in the canvas
      grabScreen();
      console.log("Im here!");
  });
});
