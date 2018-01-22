window.onload = function () {
	let STAP = 0;
	let LOAD = 1;
	let PLAY = 2;
	var state = STAP;
	var tUrl;

	let img;
	var inp = document.querySelector("#myFile");
    inp.onchange = function () {
        //console.log(this.files);          
        for (var i = 0;i < this.files.length;i++) {
            var file = this.files[i];
            // console.log(file);
            var fr = new FileReader();              
            fr.readAsDataURL(file);                 
            fr.onload = function () {
                // console.log(this.result);               
                img = new Image();
                img.src = this.result;
                // document.body.appendChild(img);
                // document.querySelector("#box").appendChild(img);
                // console.log(img);
                tUrl = img;
              	state = LOAD;
            }
        }
    }
    var canvas = document.getElementById('demo');
	var w =  document.body.scrollWidth;
	var h =  document.body.scrollHeight;
	canvas.width = w;
	canvas.height = h;
	var ctx = canvas.getContext("2d");

	function ig () {
		ctx.drawImage(tUrl,0,0,w,h/2);
		// console.log(tUrl);
	}

	let texts = {plen : '相册', iptVal:''};
	ctx.font = "40px 微软雅黑";
	ctx.fillStyle = "#ccc";

	var opt = {i:0,textVal:''}
	function text () {
		if(opt.i<1){
			var $text = $("<input type='text' id='text'/>");
			$(document.body).append($text); 
			opt.i ++;
		}
		let iptVal = $("#text")[0];

		iptVal.onblur = function () {
			console.log(iptVal.value);
			texts.iptVal = iptVal.value;
			state = PLAY;
			$("#text").remove();
		}
		// console.log(iptVal);
	}
	function time(){ 
		var timer = setTimeout(function(){
			(function(){
				ctx.fillText(texts.plen, w-100, 50);
				switch(state){
					case STAP:
						
						break;
					case LOAD:
						ig();
						text();
						break;
					case PLAY:
						ig();
						ctx.fillText(texts.iptVal, 0, h/1.5);
						break;
				}
			}());
			clearInterval(timer);
			timer = null;
			time();
		},100);
	}
	time();
}
