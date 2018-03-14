var s = $('sections');
//animate
function am(num,ol){
  console.log('第'+(parseInt(num)+1)+'页动画');
  hd(ol);
}
//null
function hd(ol){
  if(ol != -1){
    console.log('清除'+(parseInt(ol)+1)+'页动画');
  }
}
//case执行动画的页数
function shows(num,oldNUm){
  switch (num){
    case 0:
      am(0,oldNUm);
      break;
    case 1:
      am(1,oldNUm);
      break;
    case 2:
      am(2,oldNUm);
      break;
    case 3:
      am(3,oldNUm);
      break;
    case 4:
      am(4,oldNUm);
      break;
    case 5:
      am(5,oldNUm);
      break;
    case 6:
      am(6,oldNUm);
      break;
  }
}