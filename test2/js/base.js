//限制在微信中
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

window.onload = function () {
  if(isWeiXin()){
    // var p = document.getElementsByTagName('p');
    // p[0].innerHTML = window.navigator.userAgent;
		console.log('您在微信中打开');
  }else{
  	console.log('请使用微信打开');
	}

  let state= -1;
	let Stap = 0;
	let Load = 1;
	let Play = 2;
	let img;
	let ipt = document.querySelector("#myFile");
	ipt.onchange = function () {
		for (let i = 0; i < this.files.length; i++) {
			let file = this.files[i];
            let fr = new FileReader();              
            fr.readAsDataURL(file);
            fr.onload = function () {
            	img = new Image();
                img.src = this.result;
              //
              	console.log(img);
              //进一
                state = Stap;
            }
		}
	}
	//创建canvas画布
	var canvas = document.getElementById('demo');
	var w =  document.body.scrollWidth;
	var h =  document.body.scrollHeight;
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext("2d");

	let plen = {txt:'文件',fu:'写上你今年的祝福语吧！(test)'}
	ctx.font = "40px 微软雅黑";
	ctx.fillStyle = "#fff";

	var stars = [];
	stars[0] = new Image();
	stars[0].src = 'images/bj.jpg';

	//创建一个ipt
	let i = 0,iptText;
	function ig () {
		if(i < 1){
			var  newipt=  document.createElement("input");
			newipt.type = 'text';
			newipt.id = 'newipt';
			document.body.appendChild(newipt);
			i=1;
		}else if( i < 2 ){
			//取ipt中val，进行绘制
			document.querySelector('#newipt').onblur = function () {
				iptText = document.querySelector('#newipt').value;
				state = Load;
				//拿到ipt值，开始删
				document.body.removeChild(document.querySelector('#newipt'));
			}
		}
	}
	let zImg = new Image();
	let iNum = 0;
	function newtexts(val){
		ctx.fillText(val, 30,h/1.5);
		ctx.drawImage(img,w/4,300,w/2,w/2);
		if( iNum < 1){
			//保存页面所展示的内容为图片
			canvas.onclick = function () {
				var tempSrc = canvas.toDataURL('image/jpeg');
				zImg.src = tempSrc;
				document.querySelector('body').innerHTML = '';
        document.querySelector('body').appendChild(zImg);
				iNum=1;
			}
		}
		
	}
	// //canvas存为图片的方法
	// function canvasImg () {
	// 	var image = new Image();
	// 	//解决在本地中跨域的BUG
	// 	image.crossOrigin="anonymous";
	// 	image.src = canvas.toDataURL("image/png");
	// 	// console.log(image);
	// 	return image;
	// }
	// canvas.onclick = function () {
	// 	canvasImg();
	// }

	function time(){ 
		var timer = setTimeout(function(){
			(function(){
				ctx.drawImage(stars[0], 0, 0, w, h);
				ctx.fillText(plen.txt, w-100, 50);
				switch(state){
					case Stap:
						ctx.drawImage(img,w/4,300,w/2,w/2);
						ctx.fillText(plen.fu, 30,h/1.5);
						ig();
						break;
					case Load:
						newtexts(iptText);
						break;
					case Play:

						break;
				}
			}());
			clearInterval(timer);
			timer = null;
			time();
		},500);
	}
	time();
}