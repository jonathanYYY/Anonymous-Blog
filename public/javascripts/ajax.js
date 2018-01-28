function get_articles(){
    var xmlhttp
    var articles
    xmlhttp=new XMLHttpRequest()
    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            articles=JSON.parse(xmlhttp.responseText);
            for(var i=articles.length-1;i>-1;i--){
                var id =articles[i]._id
                var bytes = [];
                for (var j = 0; j < 4; j++) {
                    bytes[j] = parseInt(id.substring(j * 2, j * 2 + 2), 16);
                }
                unixtime = (((bytes[0]) << 24) |((bytes[1] & 0xff) << 16) |((bytes[2] & 0xff) << 8) |((bytes[3] & 0xff)))
                var unixTimestamp = new Date(unixtime* 1000)
                var localtime=unixTimestamp.toLocaleString()
                var content=('<li><div class="mdui-row"><div class="mdui-col-xs-12"><div class="mdui-card mdui-hoverable"><div class="mdui-card-primary"><div class="mdui-card-primary-title">'+articles[i].subject_title+'</div><div class="mdui-card-primary-subtitle">'+localtime+'</div></div><div class="mdui-card-content mdui-text-truncate">'+articles[i].subject_content+'</div></div></div></div></li>')
                $('ul').append(content)
            }
		}
	}
    xmlhttp.open('GET','/get_articles',true)
    xmlhttp.send()
}

function post_articles(){

    var user_cookie='1'
    var subject_title=$('#subject_title').val()
    var subject_content=$('#subject_content').val()
    articles={"user_cookie":user_cookie,"subject_title":subject_title,"subject_content":subject_content}
    if(user_cookie &&subject_title && subject_content ){
        NProgress.start()
        NProgress.configure({ showSpinner: false });
        // NProgress.configure({ easing: 'ease', speed: 1500 });
        $.ajax({
            method: 'POST',
            url: '/post_articles',
            data:articles,
            success: function (data) {
                console.log(data);
                mdui.snackbar({
                    message: 'Message sent',
                    timeout:1200,
                });
                $('#post-container').fadeOut(150,function(){
                  $(".mdui-appbar").fadeIn();
                  $("#home").fadeIn();
                  $('#post-container').remove()
                }); 
            }
        });
        if($('ul').children().length>0){
            $('ul').children().remove()
            }
        get_articles()
        NProgress.done() 
    }else{
        console.log("Empty data!")
    }

 
     
}
//点击右下方红色添加出现写文章页面
function post_page(){
    $("#add-button").click(function(){
        $("#home-appbar").fadeOut();
        $("#home").fadeOut(200,function(){
            if($('#post-container').length==0){
                $('body').append('<div id="post-container"><div class="mdui-appbar mdui-shadow-0 mdui-color-white"><div class="mdui-toolbar "><a href="javascript:;"onclick="goback()"class="mdui-btn mdui-btn-icon mdui-text-color-pink mdui-ripple"><i class="mdui-icon material-icons">arrow_back</i></a><a href="javascript:;"class="mdui-typo-title mdui-typo-display-2-opacity">Post</a><div class="mdui-toolbar-spacer"></div><a href="javascript:;"onclick="post_articles()"class="mdui-btn mdui-btn-icon mdui-text-color-pink mdui-ripple"><i class="mdui-icon material-icons">done</i></a></div></div><div class="mdui-container"><div class="mdui-textfield"><input id="subject_title"class="mdui-textfield-input mdui-text-center"type="text"placeholder="Title"required/><div class="mdui-textfield-error">忘写标题啦</div></div><div class="mdui-textfield mdui-textfield-floating-label"><label class="mdui-textfield-label">Message</label><textarea id="subject_content"class="mdui-textfield-input"rows="15"required></textarea><div class="mdui-textfield-error">写点什么吧~</div></div></div></div>')
                $('#post-container').fadeIn()   
            }else{
                $('#post-container').fadeIn()
            }
        });


      });
}
//返回主页
function goback(){
    $('#post-container').fadeOut(150,function(){
        $(".mdui-appbar").fadeIn();
        $("#home").fadeIn();
    });

}




// function get_talks(){
//     $.ajax({  
//         url: '/get_talks', 
//         type: 'GET',  
//         success: function (data) {
//             var talks=JSON.parse(data)
//             // console.log(talks)
//             var talk_content=''
//             // var unixtime=0
//             // var pre_unixtime=0
//             for(var i=0;i< talks.length;i++){
//                 pre_unixtime=unixtime
//                 var id =talks[i]._id
//                 var bytes = [];
//                 for (var j = 0; j < 4; j++) {
//                     bytes[j] = parseInt(id.substring(j * 2, j * 2 + 2), 16);
//                 }
//                 unixtime = (((bytes[0]) << 24) |((bytes[1] & 0xff) << 16) |((bytes[2] & 0xff) << 8) |((bytes[3] & 0xff)))
//                 var unixTimestamp = new Date(unixtime* 1000)
//                 var localtime=unixTimestamp.toLocaleString()
//                 // if(i==talks.length-1||unixtime-pre_unixtime>180  ){
//                 talk_content='<div style=" display:flex;flex-direction:column;"><div class="right" id="word">'+talks[i].words+'</div><div id="word_ts">'+localtime+'</div></div>'
//                 $('#wordbox').append(talk_content) 
//                 // }else{
//                 //     talk_content='<li style=" display:flex;flex-direction:column;"><div class="right" id="word">'+talks[i].words+'</div></li>'
//                 //     $('#wordbox').append(talk_content) 
//                 // }
//             }
//             $("#wordbox").scrollTop($("#wordbox")[0].scrollHeight)
//             console.log($("#wordbox")[0].scrollHeight)
//             console.log($("#wordbox").scrollTop())

              
//         }  
//     })
// }


//主要运行函数
$(document).ready(function(){
    get_articles()
    post_page()
    //检查并设置cookie
    function setCookie(cname,cvalue,exdays){
    	var d = new Date();
    	d.setTime(d.getTime()+(exdays*24*60*60*1000));
    	var expires = "expires="+d.toGMTString();
    	document.cookie = cname+"="+cvalue+"; "+expires;
    }
    function getCookie(cname){
    	var name = cname + "=";
    	var ca = document.cookie.split(';');
    	for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
    		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    	}
    	return "";
    }
    function checkCookie(){
        var user=getCookie("uid");
    	if (user!=""){
            // alert(user+" 欢迎你!");
            layer.msg(user+' 欢迎你!',{time:1000}) 
        }
	    else {
            // user 
            var index=layer.prompt({
                formType: 0,
                title: '请输入ID',
              }, function(user, index, elem){ 
                layer.close(index);
                setCookie("uid",user,365);
                layer.msg(user+' 欢迎你!',{time:1000}) 
              });
            $('.layui-layer-title').css({"color":"rgba(0,0,0,.54)"})
            $('.layui-layer-input').click(function(){
                $(this).addClass('layui-layer-input-focus')
                // console.log($('.layui-layer-title').css('color'))
                $('.layui-layer-title').css({"color":"#FF4081"})
            })
            $('.layui-layer-input').blur(function(){
                $(this).removeClass('layui-layer-input-focus')
                $('.layui-layer-title').css({"color":"rgba(0,0,0,.54)"})
            })
            // if (user!="" && user!=null){
            //   setCookie("uid",user,365);
            // }
            // console.log(user) 
        }
    }
    checkCookie()


    //点击后文章区域可见
    $(document).click(function(e){
        
        $(e.target).children('div:eq(1)').toggleClass('mdui-text-truncate',$(e.target).slideDown())
        
    })
    // get_talks()
    //popstate事件 点击前进后退
    // window.addEventListener("popstate",function(e) {
    // NProgress.start()
    // var state =e.state
    // var mytab=new mdui.Tab('.mdui-tab')
    // try{
    //     if(state==null){
    //         mytab.prev()
    //     }else if(state.url=='/talk'){
    //         mytab.next()
    //     }else if(state.url=='/'){
    //         mytab.prev()
    //     }
    // }catch(e){
    //     alert(e)
    // }
    // NProgress.done()
    // });

    //点击文本下方显示时间
    // $('#word').click(function(){
    //     console.log('qqqq')
    //     $('#word_ts').toggle(1000)
    // })
    // $(document).click(function(e) { // 在页面任意位置点击而触发此事件
    //     $(e.target).siblings('#word_ts').toggle(200)
    //     // console.log(showtime)    
    //     // showtime.click(function(){
    //     //     console.log('qqqq')
    //     //     // $(this).toggle(1000)
    //     // })
    // })

})


$(document).ready(function(){
    $('#home_btn').click(function(){
        // NProgress.configure({ easing: 'ease', speed: 800 });
        NProgress.start()
        var container_name=$(this).attr('href')
        if(container_name=='#home'){
            if($('ul').children().length>0){
            $('ul').children().remove()
            }
            get_articles()
            // var state=({
            //     url:'/'
            // })
            // history.pushState(state, '', '/') 
            // $.ajax({  
            //     url: '/get_articles', 
            //     type: 'GET',  
            //     success: function (data) {
            //         var articles=JSON.parse(data)
            //         var state=({
            //             url:'/'
            //         })
            //         history.pushState(state, '', '/') 
            //         for(var i=0;i<articles.length;i++){
            //             var content=('<li><div class="mdui-row"><div class="mdui-col-xs-12"><div class="mdui-card mdui-hoverable"><div class="mdui-card-primary"><div class="mdui-card-primary-title">'+articles[i].subject_title+'</div><div class="mdui-card-primary-subtitle">'+articles[i].ts+'</div></div><div class="mdui-card-content mdui-text-truncate">'+articles[i].subject_content+'</div></div></div></div></li>')
            //             $('ul').append(content)
            //         }   
            //     }  
            // })
        }
        else{
            // if($('#wordbox').children().length>0){
            //     $('#wordbox').children().remove()
            // }
            // get_talks()
            // var state=({
            //     url:'/post'
            // })
            // history.pushState(state, '', '/post') 
            // $.ajax({  
            //     url: '/get_talks', 
            //     type: 'GET',  
            //     success: function (data) {
            //         var talks=JSON.parse(data)
            //         // console.log(talks)
            //         var state=({
            //             url:'/talk'
            //         })
            //         history.pushState(state, '', '/talk') 
            //         for(var i=0;i< talks.length;i++){
            //             var id =talks[i]._id
            //             var bytes = [];
            //             for (var j = 0; j < 4; j++) {
            //                 bytes[j] = parseInt(id.substring(j * 2, j * 2 + 2), 16);
            //             }
            //             var unixtime = (((bytes[0]) << 24) |
            //                 ((bytes[1] & 0xff) << 16) |
            //                 ((bytes[2] & 0xff) << 8) |
            //                 ((bytes[3] & 0xff)))
            //             var unixTimestamp = new Date(unixtime* 1000)
            //             var localtime=unixTimestamp.toLocaleString()
            //             console.log(localtime)
            //             $('#wordbox').append('<li><div id="word">'+talks[i].words+'</div><div id="word_ts">'+localtime+'</div></li>')
            //         }   
            //     }  
            // })

        }
    NProgress.done();
    })
})




// function post(){
//     var xmlhttp
//     var articles
//     xmlhttp=new XMLHttpRequest()
//     xmlhttp.onreadystatechange=function()
// 	{
// 		if (xmlhttp.readyState==4 && xmlhttp.status==200)
// 		{
//             var user_cookie=document.getElementById('user_cookie').innerHTML
//             var subject_title=document.getElementById('subject_title').innerHTML
//             var ts=document.getElementById('ts').innerHTML
//             var subject_content=document.getElementById('subject_content').innerHTML
//             data={"user_cookie":user_cookie,"subject_title":subject_title,"ts":ts,"subject_content":subject_content}
//             console.log(data)
//             // articles=JSON.parse(xmlhttp.responseText);
// 		}
// 	}
//     xmlhttp.open('GET','/post',true)
//     xmlhttp.send()
// }