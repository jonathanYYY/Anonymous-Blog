var text=document.getElementById('text');
var hidebuttonbox=document.getElementById('hidebuttonbox')
var hidebutton=document.getElementById('hidebutton')
var textheight=text.offsetHeight
var contentheight=document.getElementById('content').offsetHeight
var section=document.getElementById('talkbox')
//判断是否为手机
function IsMobile() {
var userAgentInfo = navigator.userAgent;
var Agents = ["Android", "iPhone"];
var flag = false;
for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = true;
        break;
    }
}
if (flag==0){
    text.style.opacity='1'
    document.getElementById('title').innerHTML='暂不支持PC，请使用手机访问！'
    hidebuttonbox.style.display='none'
    document.getElementById('content').style.display='none'
    }
}
IsMobile();

// clickbutton() //测试用
//点击按钮后的效果
function clickbutton(){
    if( text.style.display=='block'){
        text.style.animation='hidetext 1.2s'
        text.style.opacity='0'
        text.style.display='none'
        hidebutton.style.color='#f688b3'
        hidebutton.style.animation='hidebutton 1.2s'
        hidebutton.style.position='fixed'
        setTimeout(function() {
            hidebutton.style.color='white'
            hidebutton.style.top='0'
            // hidebutton.className='fa fa-chevron-down'
            hidebutton.children[0].innerHTML='keyboard_arrow_down'
        }, 1200);
        setTimeout(() => {
            section.style.display='block'
            section.style.animation='showsection 1.2s'
        }, 700);
    }else {
        text.style.display='block'
        text.style.animation='showtext 2s'
        hidebutton.style.top=''
        text.style.height=textheight+'px'
        content.style.height=contentheight+'px'
        hidebutton.style.color='#f688b3'
        hidebutton.style.animation='showbutton 1.2s'
        text.style.opacity='1'
        section.style.animation='hidesection 1.2s'
        setTimeout(() => {
            section.style.display='none'
        }, 1190);
        setTimeout(function() {
            hidebutton.style.color='white'
            hidebutton.style.position='relative'
            // hidebutton.className='fa fa-chevron-up'
            hidebutton.children[0].innerHTML='keyboard_arrow_up'
        }, 1200)
    }
}
//控制文本框高度
// window.onload=function(){
//     document.querySelector('textarea').addEventListener('input',function(){
//         if(this.scrollHeight<123){ 
//             this.style.height='auto'
//             this.style.height = (this.scrollHeight +2)+ 'px'
//         }
//     }) 
// } 