
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


var cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href =
"https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css";

document.head.appendChild(cssLink);

var script = document.createElement("script");
script.src =
  "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js";
document.head.appendChild(script);


let SpeechRecognition =
  window.webkitSpeechRecognition ||
  webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition ||
  window.oSpeechRecognition ||
  window.SpeechRecognition;
speechRecognition = new webkitSpeechRecognition();
speechRecognition.lang = "en-GB";
speechRecognition.continuous = false;
speechRecognition.interimResults = false;
speechRecognition.maxAlternatives = 1;

let overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.left = "0";
overlay.style.right = "0";
overlay.style.backgroundColor = "#fff";
overlay.style.height = "90px";
overlay.style.bottom = "0";
overlay.style.padding = "10px";
overlay.style.zIndex = "9999999999";
overlay.style.pointerEvents = "auto";
overlay.setAttribute("id", "container-speech");

let innerDiv = document.createElement("span");
innerDiv.style.backgroundColor = "#fff";
innerDiv.style.width = "90%";
innerDiv.style.height = "90%";
innerDiv.style.display = "block";
innerDiv.style.zIndex = "999999999999999";
innerDiv.style.fontSize = "30px";
innerDiv.style.fontWeight = "bold";
innerDiv.style.color = "#1a1c21";

innerDiv.innerHTML = "";
overlay.style.display = "none";
innerDiv.setAttribute("id", "txtSpeechOutput");

overlay.appendChild(innerDiv);
document.body.appendChild(overlay);

function positionOverlay() {
  const windowHeight = window.innerHeight;
  const overlayHeight = overlay.offsetHeight;
  if (overlayHeight < windowHeight) {
    overlay.style.top = windowHeight - overlayHeight + "px";
  } else {
    overlay.style.top = "0";
  }
}

positionOverlay();
window.addEventListener("resize", positionOverlay);
window.addEventListener("scroll", positionOverlay);

let visualAnimationStarted = false;

/**/

const maxDepth = 50;
const particleAmount = 700;
let maxDistributionX;
let maxDistributionY;
const particles = new Array(particleAmount);
/**/
const placeParticles = () => {
  for (let i = 0; i < particles.length; i += 1) {
    particles[i] = {
      x: random(-maxDistributionX, maxDistributionX),
      y: random(-maxDistributionY, maxDistributionY),
      z: random(1, maxDepth),
    };
  }
};


function getYPositionOfLogo() {
	const bannerRect = document.getElementsByClassName('page-home__hero')[0].getBoundingClientRect();
	return bannerRect.y + bannerRect.height - 125 + (mobileCheck() ? 20 : 0);
}

const normalize = (val, threshold = 200) =>
  val > threshold ? val - threshold : 0;
const normalize1 = (val, max, min) => (val - min) / (max - min);
const changeRange = (OldValue, NewRange, OldRange, OldMin, NewMin) =>
  ((OldValue - OldMin) * NewRange) / OldRange + NewMin;
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const drawVisualizer = ({ bufferLength, dataArray, config }) => {
  const ctx = document.getElementById("canvas").getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas
  let max = Math.max(...dataArray.slice(0, bufferLength));
  let min = Math.min(...dataArray.slice(0, bufferLength));
  let threshold = min + (max - min) * 0.68;
  let radius = config.radius;
  const heightsArr = dataArray.map((el) => {
    if (config.beatDetection) return normalize(el, threshold) * (radius / 80);
    else return el * 0.4 * (radius / 80);
  });
  for (let j = 1; j <= heightsArr.length; j++) {
    heightsArr[j] =
      (heightsArr[(j - 1) % heightsArr.length] +
        heightsArr[j % heightsArr.length] +
        heightsArr[(j + 1) % heightsArr.length] +
        heightsArr[(j + 2) % heightsArr.length]) /
      4;
  }
  for (let i = 0; i < bufferLength; i++) {

    drawLine(
      {
        i,
        bufferLength,
        heightsArr,
        radius,
        config,
      },
      ctx
    );
  }
};
const drawLine = (opts, ctx) => {
  const { i, radius, bufferLength, heightsArr, config } = opts;
  const height = heightsArr[i];
  const centerX = canvas.width / 2;
  const centerY = getYPositionOfLogo() + 60;
  const lineWidth = (2 * Math.PI * radius) / bufferLength;
  const rads = (Math.PI * 2) / bufferLength;

  let rot = Math.ceil(
    changeRange(i, bufferLength, bufferLength, 0, -bufferLength / 4)
  );
  const x = centerX + Math.cos(rads * rot) * radius;
  const y = centerY + Math.sin(rads * rot) * radius;
  const endX = centerX + Math.cos(rads * rot) * (radius + height);
  const endY = centerY + Math.sin(rads * rot) * (radius + height);

  // Mirror points
  // rot = changeRange(i,bufferLength, bufferLength , 0, -bufferLength/2)

  let width = canvas.width / bufferLength;
  ctx.strokeStyle = config.color;
  ctx.fillStyle = config.color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  switch (config.displayType) {
    case 1:
      if (i == 0) {
        ctx.beginPath();
        ctx.moveTo(endX, endY);
      }
      ctx.lineTo(endX, endY);
      if (i == bufferLength - 1) {
        ctx.fill();
      }
      break;
    case 2:
      // let width = canvas.width / bufferLength;
      ctx.fillRect(i * width, 0, width, height);
      break;
    case 3:
      // let width = canvas.width / bufferLength;
      if (i == 0) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
      }
      ctx.lineTo(i * width, height);
      if (i == bufferLength - 1) {
        ctx.lineTo(canvas.width, 0);
        ctx.fill();
      }
      break;
    case 4:
      ctx.fillRect(i * width, centerY - height, width, height * 2);
      break;
    case 5:
      let color = ctx.fillStyle.slice(1);
      ctx.fillStyle = `rgba(${parseInt(color.slice(0, 2), 16)},${parseInt(
        color.slice(2, 4),
        16
      )},${parseInt(color.slice(4, 6), 16)},${height / 64})`;
      ctx.fillRect(i * width, 0, width, canvas.height);
      break;
    case 6:
      ctx.beginPath();
      ctx.arc(
        Math.sin(rads * i) * radius * 1.5 + centerX,
        Math.cos(rads * i) * radius * 1.5 + centerY,
        height / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      break;
    case 7:
      ctx.beginPath();
      ctx.arc(endX, endY, 5, 0, 10);
      ctx.fill();
      break;
    case 8:
      for (let j = 1; j < 6; j++) {
        ctx.beginPath();
        ctx.arc(
          centerX + Math.sin(rads * i) * (height + radius) * (j / 3),
          centerY + Math.cos(rads * i) * (height + radius) * (j / 3),
          5,
          0,
          10
        );
        ctx.fill();
      }
      break;
    case 9:
      ctx.beginPath();
      ctx.arc(i * width, centerY, height, 0, 10);
      ctx.fill();
      break;
    case 10:
      ctx.beginPath();
      ctx.moveTo(
        centerX + Math.cos(rads * i) * (radius - height),
        centerY + Math.sin(rads * i) * (radius - height)
      );
      ctx.lineTo(
        centerX + Math.cos(rads * i) * (radius + height),
        centerY + Math.sin(rads * i) * (radius + height)
      );
      ctx.stroke();
      break;
    case 11:
      if (i <= bufferLength / 2) {
        const negx = centerX - Math.cos(rads * rot) * radius;
        const negy = centerY + Math.sin(rads * rot) * radius;
        const negendX =
          centerX - Math.cos(rads * rot) * (radius + heightsArr[i]);
        const negendY =
          centerY + Math.sin(rads * rot) * (radius + heightsArr[i]);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.moveTo(negx, negy);
        ctx.lineTo(negendX, negendY);
        ctx.stroke();
      }
      break;
    case 12:
      const negendX =
        centerX +
        Math.cos(rads * rot) * (radius + heightsArr[bufferLength - i]);
      const negendY =
        centerY +
        Math.sin(rads * rot) * (radius + heightsArr[bufferLength - i]);
      if (i <= bufferLength / 2) {
        if (i == 0) {
          ctx.beginPath();
          ctx.moveTo(endX, endY);
        }
        ctx.lineTo(endX, endY);
        if (i == bufferLength / 2) {
          ctx.moveTo(endX, endY);
        }
      } else {
        ctx.lineTo(negendX, negendY);
        if (i == bufferLength - 1) {
          rot = Math.ceil(
            changeRange(0, bufferLength, bufferLength, 0, -bufferLength / 4)
          );
          const negendX =
            centerX + Math.cos(rads * rot) * (radius + heightsArr[0]);
          const negendY =
            centerY + Math.sin(rads * rot) * (radius + heightsArr[0]);
          ctx.lineTo(negendX, negendY);
          ctx.fill();
        }
      }
      break;
    default:
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
  }
};
const drawStars = ({ bufferLength, dataArray, config }) => {
  if (!config.showParticles) return;
  const ctx = document.getElementById("canvas").getContext("2d");
  const r = parseInt(config.color.substr(1, 2), 16);
  const g = parseInt(config.color.substr(3, 2), 16);
  const b = parseInt(config.color.substr(5, 2), 16);
  const centerX = canvas.width / 2;
  const centerY = getYPositionOfLogo() + 60;
  let max = Math.max(...dataArray.slice(0, bufferLength / 3));
  let min = Math.min(...dataArray.slice(0, bufferLength / 3));
  threshold = min + (max - min) * 0.68;
  let speed = config.bounce;
  speed = speed > 0.05 ? speed : 0.05;
  for (let i = 0; i < particles.length; i += 1) {
    particles[i].z -= speed;

    if (particles[i].z <= 0) {
      particles[i].x = random(-maxDistributionX, maxDistributionX);
      particles[i].y = random(-maxDistributionY, maxDistributionY);
      particles[i].z = maxDepth;
    }

    const k = 100 / particles[i].z;
    const newX = particles[i].x * k + centerX;
    const newY = particles[i].y * k + centerY;

    if (
      newX >= 0 &&
      newX <= canvas.width &&
      newY >= 0 &&
      newY <= canvas.height
    ) {
      const size = (1 - particles[i].z / maxDepth) * 12;
      var radgrad = ctx.createRadialGradient(newX, newY, 0, newX, newY, size / 2      );
      radgrad.addColorStop(0, `rgba(${r},${g},${b},1)`);
      radgrad.addColorStop(0.5, `rgba(${r},${g},${b},.5)`);
      radgrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = radgrad;
      ctx.beginPath();
      ctx.arc(newX, newY, size / 2, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    }
  }
};

let isListening = false;

document.addEventListener("DOMContentLoaded", function () {
  // create a new container div element with id "container"
  var container = document.createElement("div");
  container.id = "canvas-container";

  // create a new canvas element
  var canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  canvas.id = "canvas";

  // create a new audio element
  var audio = document.createElement("audio");
  audio.id = "audio";
  audio.src = "";
  audio.controls = false;

  // append the canvas and audio elements to the container element
  container.appendChild(canvas);
  container.appendChild(audio);

  // set the CSS styles for the container, canvas, and audio elements
  var css = `
    a {
    	text-decoration: none;
    }
      #canvas-container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;        
        display: flex;
        transform: translate(-50%, -50%);
        z-index:99998;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        
      }
      canvas {
        display: block;
        margin: 0 auto;
        z-index:99999;
        pointer-events: none;
      }
      audio {
        display: block;
        margin: 0 auto;
      }

      #canvas-container .logo_img{
        z-index: 9999999;
        pointer-events: auto;
      }      

      #canvas-container .logo_imgx{
        border-radius: 50%;
        display: block;
        margin: auto;
        z-index: 9999999;
        pointer-events: auto;
        https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg
      }
      
      #container-config {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        flex: 0 0 100%;
        background-color: #f1f3f4;
      }
      #container-config #fullscreen{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #container-config #audio{
        flex: 1;
      }
      .config{
          background-color: white;
          margin-top: 8px;
      }
      .config> div {
        padding: 10px;
        border-top: 1px solid black;
      }
      .config div label {
        font-weight: 500 !important;
        display: block;
      }


    `;

  // create a new style element and add the CSS code to it
  var style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  // append the style and container elements to the HTML document
  document.head.appendChild(style);
  document.body.appendChild(container);

  // TUNING PERFORMANCE
  var audio1;
  var worker;
  var canvas = document.getElementById("canvas");
  var audioEl = document.getElementById("audio");
  var container = document.getElementById("canvas-container");
  var local_stream = null;
  var source = null;
  var audioCtx = null;

  const normalize = (val, threshold = 200) =>
    val > threshold ? val - threshold : 0;
  const normalize1 = (val, max, min) => (val - min) / (max - min);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var defaultState = {
    radius: 60, //because logo width is 120px
    //color: '#00BFFF',
    color: "#257789",
    showParticles: false,
    displayType: 0,
    bufferLength: 110,
    //fftSize: 2**14,
    fftSize: 2 ** 14,
    //bounceMultiplier: 250,
    bounceMultiplier: 0,
    beatDetection: false,
    bounce: 0,
  };

  if (!navigator.getUserMedia)
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

  var config = { ...defaultState };

  function getMedia () {
  	return new Promise((resolve, reject) => {
			if (navigator.getUserMedia) {
	      // local_stream.getAudioTracks()[0].enabled = true;
	      navigator.getUserMedia(
	        { audio: true },
	        function (stream) {
	           resolve(stream);
	        },
	        function (e) {
	        	console.log("Error capturing audio.");
	        	reject(e);
	        }
	      );
	    }
	    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	      navigator.mediaDevices
	        .getUserMedia({ audio: true })
	        .then(function (stream) {
	        	resolve(stream);
	        })
	        .catch(function (err) {
	          reject(err);
	        });
	    }
  	});
  }

  /**/
  async function listen_audio() {
    try {
    	const stream = await getMedia();

	    local_stream = stream;
      url = local_stream;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // for safari browser // I need to explain the browser restrictions & CORS issues here
      if (!worker) {
        worker = true;
        placeParticles();
        return true;
      }
    } catch (e) {
			local_stream = null;
			return false;
    }
    
  }
  container.style.cursor = "none";

  const bufferLength = defaultState.bufferLength;
  const dataArray = new Uint8Array(bufferLength); // coverting to unsigned 8-bit integer array format because that's the format we need
  let analyser = null;

  function animate() {
    if (!local_stream || mobileCheck()) return;
    var url = local_stream;
    audioEl.src = "";

    if (!analyser) {
      let source = audioCtx.createMediaStreamSource(url);
      analyser = audioCtx.createAnalyser();
      source.connect(analyser);
    }

    analyser.fftSize = defaultState.fftSize; // controls the size of the FFT. The FFT is a fast fourier transform. Basically the number of sound samples. Will be used to draw bars in the canvas

    analyser.getByteFrequencyData(dataArray);

    const setBounce = () => {
      let max = Math.max(...dataArray.slice(0, config.bufferLength / 2));
      let bounce = normalize1(max, 255, 0);
      let bounced =
        defaultState.radius +
        Math.floor(bounce * defaultState.bounceMultiplier);
      let height =
        bounced * 2 > window.innerHeight ? window.innerHeight / 2 : bounced;
      let width =
        bounced * 2 > window.innerWidth ? window.innerWidth / 2 : bounced;

      config.radius = Math.min(height, width);
      config.bounce = bounce;
    };

    const setLogo = () => {
      let logoExists = container.querySelector(".logo_img");
      if (logoExists) {
        logoExists.height = config.radius * 2;
        logoExists.width = config.radius * 2;
      }
    };

    setBounce();
    drawVisualizer({ bufferLength, dataArray, config });
    drawStars({ bufferLength, dataArray, config });
    setTimeout(setLogo, 250);
    requestAnimationFrame(animate); // calls the animate function again. This method is built in
  }

  //logo
  function load_logo() {
    const buttonMic = document.createElement("div");
    // set the styles of the outer div
    buttonMic.id = "mic-logo";
    buttonMic.style.width = "120px";
    buttonMic.style.height = "120px";
    buttonMic.style.borderRadius = "50%";
    buttonMic.style.background = "#2F91A7";
    buttonMic.style.boxShadow = "0px 0px 80px #ffffff";
    buttonMic.style.position = "absolute";
    buttonMic.style.display = "flex";
    buttonMic.style.justifyContent = "center";
    buttonMic.style.alignItems = "center";
    buttonMic.style.top = getYPositionOfLogo() + 'px';

    speechRecognition.onstart = function () {
      console.log("Start Speech Recognigion");
      overlay.style.display = "block";
      overlay.click();
      positionOverlay();

      if (!visualAnimationStarted) {
        animate();
        visualAnimationStarted = true;
      }

      speechOutput.innerHTML = "";
    };

    buttonMic.addEventListener("click", async function () {
      if (!isListening) {
        isListening = true;
        const is_avail = await listen_audio();
        if (is_avail) {
        	speechRecognition.start();	
        } else {
        	isListening = false;
        }
        
      } else {
        isListening = false;
        // speechRecognition.stop();
      }
    });

    // create a new div element to be added as a child of the outer div
    const circleInMic = document.createElement("div");
    circleInMic.id = "circleinMic";
    circleInMic.style.width = "100px";
    circleInMic.style.height = "100px";
    circleInMic.style.borderRadius = "50%";
    circleInMic.style.background = "#f6f8f9";
    circleInMic.style.boxShadow = "0px -2px 15px #2f91a7";
    circleInMic.style.display = "flex";
    circleInMic.style.justifyContent = "center";
    circleInMic.style.alignItems = "center";
    circleInMic.style.cursor = "pointer";

    // create the SVG element
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("class", "mic-iconMic");
    svgEl.setAttribute("version", "1.1");
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgEl.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svgEl.setAttribute("x", "0px");
    svgEl.setAttribute("y", "0px");
    svgEl.setAttribute("viewBox", "0 0 1000 1000");
    svgEl.setAttribute("enable-background", "new 0 0 1000 1000");
    svgEl.setAttribute("xml:space", "preserve");
    svgEl.style.fill = "#1E2D70";
    svgEl.style.height = "60px";
    svgEl.style.margin = "21px";

    // create the path element
    const pathEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathEl.setAttribute(
      "d",
      "M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z"
    );

    svgEl.appendChild(pathEl);
    circleInMic.appendChild(svgEl);
    buttonMic.appendChild(circleInMic);

    buttonMic.classList.add("logo_img");

    let logoExists = container.querySelector(".logo_img");

    if (logoExists) {
      container.removeChild(logoExists);
      console.log("logo removed");
    }
    container.appendChild(buttonMic);

    var instanceTipp = tippy("#mic-logo", {
      animation: "bounce",
      content: "<strong>Start Your Voice Search</strong>",
      allowHTML: true,
      trigger: "manual",
      showOnCreate: true,
      placement: "top",
    })
	var instanceTipp2 = tippy("#mic-logo", {
      animation: "bounce",
      content: "<strong>Say: 1 Bedroom rentals under 3,000 in CityName</strong>",
      allowHTML: true,
      trigger: "manual",
      showOnCreate: true,
      placement: "bottom",
    }
	);
  }

  load_logo();

  window.addEventListener("resize", () => {
    if (worker) {
      let height =
        defaultState.radius * 2 > window.innerHeight
          ? window.innerHeight / 2
          : defaultState.radius;
      let width =
        defaultState.radius * 2 > window.innerWidth
          ? window.innerWidth / 2
          : defaultState.radius;
      config.radius = Math.min(height, width);
      let resize_canvas = [window.innerWidth, window.innerHeight];
      maxDistributionX = window.innerWidth / 8;
      maxDistributionY = window.innerHeight / 4;
    }
  });
});

let final_transcript = "";
var interim_transcript = "";
(async function (global) {
  speechOutput = document.getElementById("txtSpeechOutput");
  overlay.style.display = "none";

  if ("webkitSpeechRecognition" in window) {
    
    const location = await fetch("https://ipapi.co/json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });

    console.log("Loaded Speech Recognition");
    const locationValue = location?.city ? location.city : "toronto";


    async function matchedLogic() {
        console.log("final_transcript:", final_transcript);
        console.log("interim_transcript:", interim_transcript);

        if (final_transcript.length === 0) {
        	if (interim_transcript.length) {
        		final_transcript = interim_transcript;
        	} else {
        		final_transcript = "apartment";	
        	}
        }
    	}

    speechRecognition.onend = () => {
      console.log("End Speech Recognigion");
      setTimeout(matchedLogic, 500);

     overlay.style.display = "block";
     overlay.click();
     positionOverlay();
    };

    speechRecognition.onresult = (event) => {
      console.log("Speech Recognition OnResult");
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      speechOutput.innerHTML = interim_transcript;
      speechOutput.innerHTML = final_transcript;
      overlay.style.display = "block";
      overlay.click();
      positionOverlay();
      matchedLogic();
    };

    speechRecognition.onerror = function (event) {
    	console.log("Speech Recognition Error:", event.error + ":" + event.message);
	};
  }
})();
