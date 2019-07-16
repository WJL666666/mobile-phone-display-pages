//获取元素
var getElem=function(selector){
    return document.querySelector(selector);
}
var getAllElem=function(selector){
    return document.querySelectorAll(selector);
}
//获取元素样式
var getCls=function(element){
    return element.getAttribute('class');
}
//设置元素样式
var setCls=function(element,cls){
    return element.setAttribute('class',cls);
}
//为元素添加样式
var addCls=function(element, cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)===-1){
        setCls(element,baseCls+' '+cls);
    }
}
//为元素删除样式
var delCls=function(element, cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)!=-1){
        setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
    }
}
//第一步：初始化样式 init
var screenAnimateElements={
    '.screen-1':[
        '.screen-1_heading',
        '.screen-1_phone',
        '.screen-1_shadow',
    ],
    '.screen-2':[
        '.screen-2_heading',
        '.screen-2_subheading',
        '.screen-2_phone',
        '.screen-2_point_i_1',
        '.screen-2_point_i_2',
        '.screen-2_point_i_3',
    ],
    '.screen-3':[
        '.screen-3_heading',
        '.screen-3_phone',
        '.screen-3_subheading',
        '.screen-3_feature',
    ],
    '.screen-4':[
        '.screen-4_heading',
        '.screen-4_subheading',
        '.screen-4_type_item_i_1',
        '.screen-4_type_item_i_2',
        '.screen-4_type_item_i_3',
        '.screen-4_type_item_i_4',
    ],
    '.screen-5':[
        '.screen-5_heading',
        '.screen-5_subheading',
        '.screen-5_bg'
    ]
};
//设置屏内元素为初始状态
var setScreenAnimateInit=function(screenCls){
    var screen=document.querySelector(screenCls);//获取当前屏元素
    var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute('class');
        element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
    }
}
//设置播放屏内的元素动画
var playScreenAnimateDone=function(screenCls){
    var screen=document.querySelector(screenCls);//获取当前屏元素
    var animateElements=screenAnimateElements[screenCls];//需要设置动画的元素
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
}
window.onload=function(){
    // console.log('onload');
    for(k in screenAnimateElements){
        if (k==='.screen-1') {
            continue;
        }
        setScreenAnimateInit(k);
    }
}
//第二步：页面滚到哪里就播放哪里
var navItems=getAllElem('.header_nav-item');
var outLineItems=getAllElem('.outline_item');

var switchNavItemsActive=function(idx){
    for (var i = 0; i < navItems.length; i++) {
        delCls(navItems[i],'header_nav-item_status_active');
    }
    addCls(navItems[idx],'header_nav-item_status_active');
    for (var i = 0; i < outLineItems.length; i++) {
        delCls(outLineItems[i],'outline_item_status_active');
    }
    addCls(outLineItems[idx],'outline_item_status_active');
}
switchNavItemsActive(0);

window.onscroll=function(){
     var top = document.documentElement.scrollTop;////问题所在：要获取当前页面的滚动条纵坐标位置，用:  document.documentElement.scrollTop; 
    //  而不是： document.body.scrollTop;
    //  console.log(top);
   
    if(top>80){
        addCls(getElem('.header'),'header_status_back');
        addCls(getElem('.outline'),'outline_status_in');
    }else{
        delCls(getElem('.header'),'header_status_back');
        delCls(getElem('.outline'),'outline_status_in');
        switchNavItemsActive(0);
    }
       
    if(top>1){
        playScreenAnimateDone('.screen-1');
    }
    if(top>800*1){
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
    }
    if(top>800*2){
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2)
    }
    if(top>800*3){
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3)
    }
    if(top>800*4){
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4)
    }
}
//双向定位
var navItems=getAllElem('.header_nav-item');
var outLineItems=getAllElem('.outline_item');

var setNavJump=function(i,lib){
    var item=lib[i];
    item.onclick=function(){
        document.documentElement.scrollTop=i*800;
        // for (let i = 0; i < navItems.length; i++) {
            delCls(navItems[i-1],'header_nav-item_status_active');
        //  }
            addCls(navItems[i],'header_nav-item_status_active');
        //  for (let i = 0; i < outLineItems.length; i++) {
            delCls(outLineItems[i-1],'outline_item_status_active');
        //  }
            addCls(outLineItems[i],'outline_item_status_active');
    }
}
for (var i = 0; i < navItems.length; i++) {
    setNavJump(i,navItems);
}
for (var i = 0; i < outLineItems.length; i++) {
    setNavJump(i,outLineItems);
}

//滑动门特效
var navTip=getElem('.header_nav-tip');
var setTip=function(idx,lib){
    lib[idx].onmouseover=function(){
        console.log(this,idx) ;
       navTip.style.left=(idx*90)+'px';
    }
    var activeIdx=0;
    lib[idx].onmouseout=function(){
        //  console.log(this,idx) ;
        for(var i=0;i<lib.length;i++){
           if(getCls(lib[i]).indexOf('header_nav-item_status_active'>-1)){
            activeIdx=i;   
            break;
           }
        }
        navTip.style.left=(activeIdx*90)+'px';
    }
}
for(var i=0;i<navItems.length;i++){
    setTip(i,navItems);
}

setTimeout(function(){
    playScreenAnimateDone('.screen-1');
},200)