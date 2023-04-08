let vidcount = 14;
let vidcounter = 0;
let videos = [];

let currVideos = [];

let transitionw = 0, transitionh = 0, transitionwincr = 0, transitionhincr = 0;
let transitiontime = 50;
let alphaincr = 255 / transitiontime;
let alpha = 1;



let vidtimer = 0;


function setup() {
  cnv = createCanvas(displayWidth, displayHeight);
  background(0);
  for (i = 0; i < vidcount; i++) {
    let vid = createVideo('Media/memory' + i + '.mp4');
    let scaledsize = scaledims(vid.size().width, vid.size().height);
    
    vid.size(scaledsize.scaledwidth, scaledsize.scaledheight);
    videos[i] = { video: vid, width: vid.size().width, height: vid.size().height, duration: vid.duration() };
    videos[i].video.hide();
  }
  transitionwincr = videos[0].width / transitiontime;
  transitionhincr = videos[0].height / transitiontime;
  //console.log("transitionw "+ transitionw+" videowidth: "+videos[0].width);
  nextVideo();
}

function draw() {
  

  background(0,2);
  if (currVideos.length > 2) {
    currVideos.shift()
  }

//  console.log(currVideos.length)


  for (let i = 0; i < currVideos.length; i++) {

    const last = i === currVideos.length - 1;
    const currWidth = last ? transitionw : videos[i].width;
    const currHeight = last ? transitionh : videos[i].height;
    const { x, y } = currVideos[i].position;      
    translate(x, y);      
    let alpha = currVideos[i].alpha;
    if (alpha < 255) alpha++;
    //console.log(alpha);
    currVideos[i].alpha = alpha;
    fill(0,100);
    //tint(255,100);
    noStroke();
    rect(0, 0, currWidth, currHeight); //center      
    tint(255, alpha);
    image(currVideos[i].video, 0, 0, currWidth, currHeight); //center      
  }


  // const currVideo = currVideos[currVideos.length - 1];
  
  // const currVideoObj = currVideo.video;
  // if (transitionw < currVideoObj.width && transitionh < currVideoObj.height) {
  //   //console.log(currVideoObj);
  //   alpha += alphaincr;
  //   console.log("alpha: " + alpha);
  //   fill(0, alpha);
  //   noStroke();
  //   console.log(currVideo.position);
  //   rect(currVideo.position.x, currVideo.position.y, currVideoObj.width, currVideoObj.height);    
  //   transitionw += transitionwincr;
  //   transitionh += transitionhincr;
  // }

  

}


function scaledims(w, h) {
  let ratio = w / h;
  console.log("ratio: " + ratio);
  let sw;
  let sh;
  if (ratio > 1) { //if wide video
    sw = displayWidth / 2;
    sh = sw / ratio;
  }
  else { //if tall video
    sh = displayheight / 1.5;
    sw = sh * ratio;
  }
  return ({ scaledwidth: sw, scaledheight: sh });
}

let currHeight = 0;

function randomPosition(){
  const padding = 100;
  let x = padding + random(0, displayWidth - padding - videos[0].width);
  let y = padding + random(0, displayHeight - padding - videos[0].height);
  return ({x: x, y: y});
}


function nextVideo() {
  //position = randomPosition();
  if (vidcounter < vidcount - 1) {
    vidcounter++;
  }
  else {
    vidcounter = 0;
  } //reset videos at beginning after showing all
  vidLoad();
  transitionw = 0, transitionh = 0, alpha = 1; //sets new video starting width
  transitionwincr = videos[0].width / transitiontime;
  transitionhincr = videos[0].height / transitiontime;

  // fullscreen(1);
}

function mousePressed() {
  nextVideo();
}

// This function is called when the video loads
function vidLoad() {
  const currVideo = videos[vidcounter].video;  
  currVideo.loop();
  currVideo.volume(0);
  const position = randomPosition();
  currVideos.push({ 
    video: currVideo,
    alpha: 0,
    position
  });
}