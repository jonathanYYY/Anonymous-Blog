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
// IsMobile();

//控制文本框高度
// window.onload=function(){
//     document.querySelector('textarea').addEventListener('input',function(){
//         if(this.scrollHeight<123){ 
//             this.style.height='auto'
//             this.style.height = (this.scrollHeight +2)+ 'px'
//         }
//     }) 
// } 

