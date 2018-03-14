window.onload = function(){
  var sections = $('section');
  console.log(sections);
  var page = 0;//当前所在的页
  var previousPage = -1;//当前的上一页(用于清空动画)
  var p = sections.length-2;//页数
  var olNum = 1008;//元素的高度
  $(sections[page]).animate({top:'0px'},500,'swing',function(){
    shows(page,previousPage);
  });
  //scroll
  var oldy,newy;
  var iscroll;
  var scrollNum = 60;//scroll判定标准为60px(不要改!);
  var body = $('body');
  body.bind('touchstart',function(){
    oldy = (event.changedTouches[0].clientY);
  });
  var num = 1;//用于滑动不同步
  body.bind('touchmove',function(){
    num-=0.005;//滑动距离最大值(越滑越小)
    num = num.toFixed(3);
    (num < 0.005) && (num = 0.005);
    newy = (event.changedTouches[0].clientY);
    if(oldy > newy+scrollNum){
      var nums = (newy - oldy)+scrollNum;//scroll顺滑
      if(page < p){
        $(sections[page]).css('top',(nums)+'px');
      }else{
        $(sections[page]).css('top',(nums*num)+'px');
      }
      if(page < p){
        $(sections[page+1]).css('top',((nums*num)+olNum)+'px');
      }
    }else if(oldy < newy-scrollNum){
      var nums = (newy - oldy)-scrollNum;//scroll顺滑
      if(page > 0){
        $(sections[page]).css('top',(nums)+'px');
      }else{
        $(sections[page]).css('top',(nums*num)+'px');
      }
      if(page > 0){
        $(sections[page-1]).css('top',((nums*num)-olNum)+'px');
      }
    }
  });
  body.bind('touchend',function(){
    num = 1;
    if(oldy > newy+scrollNum){
      iscroll = true;
      scroll(iscroll);
    }else if(oldy < newy-scrollNum){
      iscroll = false;
      scroll(iscroll);
    }
  });
  function scroll(a){
    if(a){
      if(page < p){
        $(sections[page]).animate({top:-olNum+'px'},300,'swing',function(){
          // console.log('当前页上滑');
        });
        previousPage = page;
        page++;
        $(sections[page]).animate({top:'0px'},300,'swing',function(){
          // console.log('下一页出现');
          shows(page,previousPage);
        });
      }else{
        $(sections[page]).animate({top: '0px'}, 300, 'swing');//结尾
      }
    }else{
      if(page > 0) {
        $(sections[page]).animate({top: olNum+'px'}, 300, 'swing', function () {
          // console.log('当前页下滑');
        });
        previousPage = page;
        page--;
        $(sections[page]).animate({top: '0px'}, 300, 'swing', function () {
          // console.log('上一页出现');
          shows(page,previousPage);
        });
      }else{
        $(sections[page]).animate({top: '0px'}, 200, 'swing');//头页
      }
    }
    console.log('当前是'+(parseInt(page)+1)+'页');
    console.log('上一页'+(parseInt(previousPage)+1)+'页');
  }
  //Date
  function date(){
    var a = new Date();
    var now = a.getFullYear()+'.'+(a.getMonth()+1)+'.'+a.getDate()+'-'+a.getHours()+':'+a.getMinutes();
    return now;
  }
  console.log(date());
  //ajax使用打开
  //ajax            传入的数据
  // function submit(a,b,c){
    // var reg = /^1\d{10}$/ig;
    // var re = /^[\u4e00-\u9fa5]{1,5}$/ig;
    // $.ajax({
    //   url:'http://bnzq.com.cn/wy/xxx.php',
    //   type:"POST",
    //   async:"true",
    //   data:{name:name,phone:phone,d:a},
    //   dateType:"json",
    //   success:function(data,textStatus){
    //     console.log(data);
        //console.log(textStatus);
      // },
      // Error:function(XMLHttpRequest,textStatus,errorThrown){
        //console.log(XMLHttpRequest);
        //console.log(textStatus);
        //console.log(errorThrown);
      // }
    // });
  // }
};