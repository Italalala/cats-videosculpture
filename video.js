let vidcount = 14;
let vidcounter= -1;
let videos = [];

let transitionw=0, transitionh=0, transitionwincr=0, transitionhincr=0;
let transitiontime = 50;
let alphaincr=255/transitiontime;
let alpha=1;


function setup() {
  cnv = createCanvas(displayWidth, displayHeight);
  background(0);
  for (i=0; i<vidcount; i++){
    let vid= createVideo('Media/memory'+i+'.mp4');
    let scaledsize = scaledims(vid.size().width,vid.size().height);
    vid.size(scaledsize.scaledwidth, scaledsize.scaledheight);
    videos[i]={video: vid, width: vid.size().width, height: vid.size().height, duration: vid.duration()};
    videos[i].video.hide();
  }
transitionwincr=videos[0].width/transitiontime;
transitionhincr=videos[0].height/transitiontime;
console.log("transitionw "+ transitionw+" videowidth: "+videos[0].width);
}

function draw(){
  if(vidcounter>=0){
    if(transitionw<videos[vidcounter].width && transitionh<videos[vidcounter].height){
      alpha+=alphaincr;
      console.log("alpha: "+alpha);
      background(0,0,0,alpha);
      transitionw+=transitionwincr;
      transitionh+=transitionhincr; 
    }

    image(videos[vidcounter].video, (displayWidth-transitionw)/2, (displayHeight-transitionh)/2,transitionw, transitionh); //center
    fill(0,0,0,255-alpha);
    rect((displayWidth-transitionw)/2, (displayHeight-transitionh)/2, transitionw, transitionh);
  }
}


function scaledims(w,h){
 let ratio= w/h;
 console.log("ratio: "+ratio);
 let sw;
 let sh;
 if (ratio>1){ //if wide video
  sw=displayWidth/2;
  sh=sw/ratio;
 }
 else{ //if tall video
  sh=displayheight/1.5;
  sw=sh*ratio;
 }
 return({scaledwidth: sw, scaledheight: sh});
}

function mousePressed(){
 if(vidcounter<vidcount-1){ 
  vidcounter++; 
 }
 else{
  vidcounter=0;
  } //reset videos at beginning after showing all
  vidLoad();
  transitionw=0,transitionh=0,alpha=1; //sets new video starting width
  transitionwincr=videos[0].width/transitiontime;
  transitionhincr=videos[0].height/transitiontime;
  // fullscreen(1);
}

// This function is called when the video loads
function vidLoad() {   
  videos[vidcounter].video.loop();
  videos[vidcounter].video.volume(0);
}