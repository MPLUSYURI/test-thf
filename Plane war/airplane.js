/*
* @Author: e04
* @Date:   2017-11-09 11:43:00
* @Last Modified by:   e04
* @Last Modified time: 2017-11-14 09:22:26
*/

'use strict';
var img = new Image();
img.src = 'images/background.png';
var Xpost = canvas.width;
var Ypost = canvas.height;

var bg_val = {
	x1:0,y1:0,
	x2:0,y2:-Ypost,
	img:img,
	width:Xpost,
	height:Ypost
};
//背景滚动
function Bg(opt){
	this._init(opt);
}
Bg.prototype = {
	_init:function(opt){
		// console.log(this);
	},
	draw:function(val){
		ctx.drawImage(val.img,val.x1,val.y1,val.width,val.height);
		ctx.drawImage(val.img,val.x2,val.y2,val.width,val.height);
		this.count(val);
	},
	count:function(val){
		val.y1++;
		val.y2++;
		if(val.y1 >= Ypost)
			val.y1 = -Ypost;
		if(val.y2 >= Ypost)
			val.y2 = -Ypost;
	}
};
var bg = new Bg(bg_val);
//飞机大战
var logoImg = new Image();
logoImg.src = 'images/start.png';
var logoVal = {
	x:(Xpost-400)/2,
	y:0,
	img:logoImg
}
function Logo(opt){
	this._init(opt);
}
Logo.prototype = {
	_init:function(opt){

	},
	draw:function(val){
		ctx.drawImage(val.img,val.x,val.y);
	}
}
var logo = new Logo(logoVal);
//click事件游戏到第二阶段加载
canvas.onclick = function(){
	if(state == Stay)
		state = LOAD;
}
//加载load
var load1 = new Image();
var load2 = new Image();
var load3 = new Image();
load1.src = 'images/game_loading1.png';
load2.src = 'images/game_loading2.png';
load3.src = 'images/game_loading3.png';
var loadY = canvas.height-38;
var loadVal = {
	x:0,
	y:loadY,
	img1:load1,
	img2:load2,
	img3:load3,
}
function Load(opt){
	this._init(opt);
}
var loadNum = 0;
Load.prototype = {
	_init:function(opt){
		//不干活
	},
	draw:function(val){
		if(loadNum <= 10){
			ctx.drawImage(val.img1,val.x,val.y);
		}else if(loadNum <= 20){
			ctx.drawImage(val.img2,val.x,val.y);
		}else if(loadNum <= 30){
			ctx.drawImage(val.img3,val.x,val.y);
		}else {
			state = 3;
		}
		loadNum++;
	}
}
var load = new Load(loadVal);
//游戏开始阶段


//-----------------------------	
var herodamage = [];
herodamage[0] = new Image();
herodamage[0].src = 'images/hero_blowup_n1.png';
herodamage[1] = new Image();
herodamage[1].src = 'images/hero_blowup_n2.png';
herodamage[2] = new Image();
herodamage[2].src = 'images/hero_blowup_n3.png';
herodamage[3] = new Image();
herodamage[3].src = 'images/hero_blowup_n4.png';
//我的飞机坠毁对象
var opi = {
	width:99,
	height:124,
	img:herodamage
}
function Damage(opi){
	this.imgs = opi.img;
}
var damage = new Damage(opi);
//我的飞机
var IheroImg = [];
IheroImg[0] = new Image();
IheroImg[0].src = 'images/hero1.png';
IheroImg[1]= new Image();
IheroImg[1].src = 'images/hero2.png';
IheroImg[2] = new Image();
IheroImg[2].src = 'images/bullet.png';
//飞机、子弹位置
//----------------------------------------------------------
var Ihero = {
	x:Xpost/2-50,
	y:Ypost-100-50,
	img:IheroImg
}

function Aircraft(opt){
	this._init(opt);
}

var gameNum = 0;
Aircraft.prototype = {
	_init:function(opt){

	},
	draw:function(val){
		//子弹的坐标
		var x = val.x+46 , y = val.y+35;
		if(gameNum %1 == 0){
			var bullet = new bulletSend(blt,x,y);
			bltArr[bltArr.length] = bullet;
		}
		if(gameNum%2 == 0){
			ctx.drawImage(val.img[0],val.x,val.y);
		}else if(gameNum%2 == 1){
			ctx.drawImage(val.img[1],val.x,val.y);
		}
		
		// console.log(x,y);


		gameNum++;
		this.shift(val);
	},
	shift:function(val){
		canvas.onmousemove =  function(){
			state = Game;
			// 获取鼠标在DOM的坐标// 图片式99 * 124
			val.x = (event.offsetX)-(99/2+(0.5));
			val.y = (event.offsetY)-(124/1.8+(0.1111111111111));
			// console.log('我飞机的X:'+val.x+'我飞机的Y:'+val.y);
			Ix = val.x;
			Iy = val.y;
			arfNum = 0;
		} 
		canvas.onmouseout = function(){
			state = Puse;
		}
	}
}

var aircraft = new Aircraft(Ihero);
//bullet---------------------------------------------------子弹
var blt_img = [];
blt_img[0] = new Image();
blt_img[0].src = 'images/bullet.png';
blt_img[1] = new Image();
blt_img[1].src = 'images/bullet2.png';
blt_img[2] = new Image();
blt_img[2].src = 'images/bullet3.png';
var blt = {
	width:9,
	height:21,
	bltImg:blt_img,
	num:0
}
function bulletSend(val,x,y){
	// console.log(val.bltImg[0],x,y);
	// this.width = val.width;
	// this.height = val.height;
	this.x = x;
	this.y = y;
	this.num = val.num;
	this.img = val.bltImg;
	this.index = 0;

	this.draw = function(ctx){
		var that = this;
		(function(ctx){
			ctx.drawImage(that.img[blt.num],that.x,that.y-50);
			if(blt.num == 2){
				ctx.drawImage(that.img[0],that.x+30,that.y);
				ctx.drawImage(that.img[0],that.x-30,that.y);
			}
		}(ctx));
	}
	this.step = function(){
		if(arfNum == 0)
		this.y-=9;
	}
}

function blt_z(){
	(function(){
		for(var i=0;i<bltArr.length;i++){
			if(bltArr[i]){
				bltArr[i].draw(ctx);
			}
		}
	}());
}
var blt_num = 0;
function blt_step(){
	(function(blt_num){
		for(var i=0;i<bltArr.length;i++){
			
			if(bltArr[i]){
				bltArr[i].step();
			}
			if(bltArr[i] == false){
				bltArr.splice(i,1);
			}
		}
		// console.log(bltArr[0].y);
		if(blt_num > 0){
			if(bltArr[0].y > canvas.height){
				bltArr.shift();
			}
		}
	}(blt_num));
	blt_num ++;
}

//其他飞机
var planeS=[];
planeS[0] = new Image();
planeS[0].src = "images/enemy1.png";
planeS[1] = new Image();
planeS[1].src = "images/enemy1_down1.png";
planeS[2] = new Image();
planeS[2].src = "images/enemy1_down2.png";
planeS[3] = new Image();
planeS[3].src = "images/enemy1_down3.png";
planeS[4] = new Image();
planeS[4].src = "images/enemy1_down4.png";
var planeImg = {
	width:57,
	height:51,
	img:planeS
}
function Hores(val){
	this.img = val.img;
	this.index = 0;
	this.x = Math.random()*(canvas.width-val.width); 
	this.y = -val.height;
	this.draw = function(){
		ctx.drawImage(this.img[this.index], this.x, this.y);
	}
	this.step = function(){
		if(arfNum == 0)
		this.y+=1.5;
	}
}
//-----------------------------------------------------------中飞机对象
var planeM = [];
planeM[0] = new Image();
planeM[0].src = 'images/enemy2.png';
planeM[1] = new Image();
planeM[1].src = 'images/enemy2_down1.png';
planeM[2] = new Image();
planeM[2].src = 'images/enemy2_down2.png';
planeM[3] = new Image();
planeM[3].src = 'images/enemy2_down3.png';
planeM[4] = new Image();
planeM[4].src = 'images/enemy2_down4.png';
var planeImg_m = {
	width:69,
	height:95,
	img:planeM
}
function Horem(val){
	this.img = val.img;
	this.index = 0;
	this.x = Math.random()*(canvas.width-val.width); 
	this.y = -val.height;
	this.draw = function(){
		ctx.drawImage(this.img[this.index], this.x, this.y);
	}
	this.step = function(){
		if(arfNum == 0)
		this.y+=0.5;
	}
}
//-----------------------------------------------------------大飞机对象
var planeL = [];
planeL[0] = new Image();
planeL[0].src = 'images/enemy3_n1.png';
planeL[1] = new Image();
planeL[1].src = 'images/enemy3_n2.png';
planeL[2] = new Image();
// planeL[2].src = 'images/enemy3_hit.png';
planeL[2].src = 'images/enemy3_n2.png';

planeL[3] = new Image();
planeL[3].src = 'images/enemy3_down1.png';
planeL[4] = new Image();
planeL[4].src = 'images/enemy3_down2.png';
planeL[5] = new Image();
planeL[5].src = 'images/enemy3_down3.png';
planeL[6] = new Image();
planeL[6].src = 'images/enemy3_down4.png';
planeL[7] = new Image();
planeL[7].src = 'images/enemy3_down5.png';
planeL[8] = new Image();
planeL[8].src = 'images/enemy3_down6.png';

var planeImg_L = {
	width:165,
	height:261,
	img:planeL,
	lifeVale:10,
	bulletX:82.5,
	bulletY:261
}
var l = 0;//大飞机动画
var bletl = new Image();
bletl.src= 'images/ss.png';
function HoreL(val){
	this.img = val.img;
	this.index = 0;
	this.x = Math.random()*(canvas.width-val.width); 
	this.y = -val.height;

	this.draw = function(){
		
		if(l <= 10){
			ctx.drawImage(this.img[this.index], this.x, this.y);
		}else if(l >=10 && l<=20){
			ctx.drawImage(this.img[1], this.x, this.y);
		}else if(l >=20 && l<=30){
			ctx.drawImage(this.img[2], this.x, this.y);
		}else {
			ctx.drawImage(this.img[2], this.x, this.y);
			l = 0;
		}
		l++;
	}
	this.step = function(){
		if(arfNum == 0)
		this.y+=0.1;//控
		// console.log(this.x);
		var x = this.x+planeImg_L.bulletX-2;
		var y = this.y+planeImg_L.bulletY-95;
		//new 敌机的字弹
		var buct = new blet(bletl,x,y);
		blet_l[blet_l.length] = buct;
	}
}

function blet(img,x,y){
	// console.log(bletl);
	// ctx.drawImage(bletl,x,y);
	this.img = img;
	this.x = x;
	this.y = y;
	//大敌机子弹移动
	this.draw = function(){
		ctx.drawImage(this.img,this.x,this.y);
	}
	this.step = function(){
		this.y+=10;
	}
}
var matNum = 0;
function mathhore(){
	(function(){
		matNum++;
		if(matNum%1000 == 0){//
			// console.log('大飞机');
			var horel = new HoreL(planeImg_L);
			planelArr[planelArr.length] = horel;
		}else if(matNum%200 == 0){
			var horem = new Horem(planeImg_m);
			planemArr[planemArr.length] = horem;
		}else if(matNum%50 == 1){
			var hores = new Hores(planeImg);
			planeArr[planeArr.length] = hores;
		}
	}());
}

function poresStep(){
	(function(){
		//小飞机
		for(var i=0;i<planeArr.length;i++){
			if(planeArr[i]){
				planeArr[i].step();
			}
			if(planeArr[i] == false){
				planeArr.splice(i,1);
			}
		}
		// console.log(planeArr);
		if(planeArr.length >0 && planeArr[0].y >= 720){
			planeArr.shift();
		}
		//中飞机
		for(var i=0;i<planemArr.length;i++){
			if(planemArr[i]){
				planemArr[i].step();
			}
			if(planemArr[i] == false){
				planemArr.splice(i,1);
			}
		}
		if(planemArr.length > 0){
			if(planemArr[0].y > 1000){
				planemArr.shift();
			}
		}
		//大飞机
		for(var i=0;i<planelArr.length;i++){
			if(planelArr[i]){
				planelArr[i].step();
			}
			if(planelArr[i] == false){
				planelArr.splice(i,1);
			}
		}
		if(planelArr.length > 0){
			if(planelArr[0].y > 1000){
				// planelArr.shift();
			}
		}
		// 敌机的子弹移动
		for(var i=0;i<blet_l.length;i++){
			if(blet_l[i]){
				blet_l[i].step();
			}
			if(blet_l[0].y > 1000){
				blet_l.shift();
				// blet_l.splice(i,1);
				// console.log(blet_l)
			}
		}
		
	}());
}
function poresDraw(){
	(function(){
		//小
		for(var i=0;i<planeArr.length;i++){
			if(planeArr[i]){
				planeArr[i].draw();
			}
		}
		//中的
		for(var i=0;i<planemArr.length;i++){
			if(planemArr[i]){
				planemArr[i].draw();
			}
		}
		//大
		for(var i=0;i<planelArr.length;i++){
			if(planelArr[i]){
				planelArr[i].draw();
			}
		}
		//敌机子弹回话
		for(var i=0;i<blet_l.length;i++){
			if(blet_l[i]){
				blet_l[i].draw();
			}
		}
	}());

}

//生命值对象[画画的]
var lifeImg = new Image();
lifeImg.src = 'images/h0.png';
function lifeVal(l){
	
	if(l == 10){
		for(var i=280;i<480;i+=20)
			ctx.drawImage(lifeImg,i,0);
	}else if(l == 9){
		for(var o=300;o<480;o+=20)
			ctx.drawImage(lifeImg,o,0);
	}else if(l == 8){
		for(var o=320;o<480;o+=20)
			ctx.drawImage(lifeImg,o,0);
	}else if(l == 7){
		for(var o=340;o<480;o+=20){
			ctx.drawImage(lifeImg,o,0);
		}
	}else if(l == 6){
		for(var o=360;o<480;o+=20)
			ctx.drawImage(lifeImg,o,0);
	}else if(l == 5){
		for(var o=380;o<480;o+=20){
			ctx.drawImage(lifeImg,o,0);
		}
	}else if(l == 4){
		for(var o=400;o<480;o+=20)
			ctx.drawImage(lifeImg,o,0);
	}else if(l == 3){
		for(var o=420;o<480;o+=20)
			ctx.drawImage(lifeImg,o,0);
	}else if(l == 2){
		for(var o=440;o<480;o+=20)
			ctx.drawImage(lifeImg,o,0);
	}else if(l == 1)
		for(var o=460;o<480;o+=20){
			ctx.drawImage(lifeImg,o,0);
	}
}
//分数
function points(){
	// ctx.fillText('point:12452843251',0,0);
	
	ctx.fillText('分数: '+point, 0, 20,100);
}
//
var uy = 0;
var ztImg = new Image();
ztImg.src = 'images/game_pause_nor.png';
// setInterval(function(){
function time(){ 
	var timer = setTimeout(function(){
		(function(){
			bg.draw(bg_val);
			switch(state){
				case Stay:
					logo.draw(logoVal);
					break;
				case LOAD:
					load.draw(loadVal);
					break;
				case Game:
					if(life > 0){
						aircraft.draw(Ihero);//我的飞机
						blt_z();//我的子弹
						blt_step();
					}else {
						state = Over;
					}
					mathhore();//敌机
					poresDraw();
					poresStep();

					calculate();//子弹碰敌机
					shi();//飞机爆炸画面
					lifeVal(life);
					//分数画面
					points();

					
					break;
				case Puse:
					// console.log('暂停');
					//暂停动画,敌机y不能加了
					mathhore();//敌机
					poresDraw();
					poresStep();
					//
					aircraft.draw(Ihero);
					blt_z();
					blt_step();
					//
					arfNum = 1;
					ctx.drawImage(ztImg,220,300);
					break;
				case Over:
					mathhore();//敌机
					poresDraw();
					poresStep();
					//我的飞机坠毁画面
					if(uy == 0){
						calculateArr2.push(damage,Ix,Iy);
					}
					uy++;
					shi2();
					
					break;
			}
		}());
		clearInterval(timer);
		timer = null;
		time();
	},1);
	
}
time();
// },10);
// function damage(){

// }

var btn = document.getElementsByTagName('button');
btn[0].onclick = function(){
    blt.num++;
    if(blt.num > 2){
    	blt.num = 0;
    }
}












