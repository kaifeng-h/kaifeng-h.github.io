function updown(t){for(page_name=(page_name=(page_name=(data=(url=window.location.href).split("/"))[data.length-1]).split("#"))[page_name.length-1],console.log(page_name),pages=["home","news","publication","tools","service","contact"],index=0,i=0;i<pages.length;i++)if((tmp=pages[i])==page_name){index=i;break}"up"==t&&(index-=1),"down"==t&&(index+=1),index>=pages.length&&(index-=1),index<0&&(index+=1),new_page=pages[index],window.location.href="#"+new_page}!function(t){var e,n,o=t(window),l=t("body"),s=t("#wrapper"),a=t("#main"),c=a.children(".panel"),h=t("#nav").children("a");breakpoints({xlarge:["1281px","1680px"],large:["981px","1280px"],medium:["737px","980px"],small:["361px","736px"],xsmall:[null,"360px"]}),h.on("click",function(e){var n=t(this).attr("href");"#"==n.charAt(0)&&0!=c.filter(n).length&&(e.preventDefault(),e.stopPropagation(),window.location.hash!=n&&(window.location.hash=n))}),window.location.hash&&(e=c.filter(window.location.hash),n=h.filter('[href="'+window.location.hash+'"]')),e&&0!=e.length||(e=c.first(),n=h.first()),c.not(e).addClass("inactive").hide(),n.addClass("active"),o.scrollTop(0),l.removeClass("is-preload"),o.on("hashchange",function(t){var e,n;if(window.location.hash){if(e=c.filter(window.location.hash),n=h.filter('[href="'+window.location.hash+'"]'),0==e.length)return}else e=c.first(),n=h.first();c.addClass("inactive"),h.removeClass("active"),n.addClass("active"),a.css("max-height",a.height()+"px").css("min-height",a.height()+"px"),setTimeout(function(){c.hide(),e.show(),a.css("max-height",e.outerHeight()+"px").css("min-height",e.outerHeight()+"px"),o.scrollTop(0),window.setTimeout(function(){e.removeClass("inactive"),a.css("max-height","").css("min-height",""),o.triggerHandler("--refresh"),locked=!1},breakpoints.active("small")?0:500)},250)}),"ie"==browser.name&&(o.on("--refresh",function(){s.css("height","auto"),window.setTimeout(function(){var t;s.height()<o.height()&&s.css("height","100vh")},0)}),o.on("resize load",function(){o.triggerHandler("--refresh")}),t(".panel.intro").each(function(){var e=t(this).children(".pic"),n=e.children("img");e.css("background-image","url("+n.attr("src")+")").css("background-size","cover").css("background-position","center"),n.css("visibility","hidden")}))}(jQuery),hiddenFlag=!0,keyboardJS.bind("home",t=>{window.location.href="#home"}),keyboardJS.bind("end",t=>{window.location.href="#contact"}),keyboardJS.bind("left",t=>{updown("up")}),keyboardJS.bind("right",t=>{updown("down")}),keyboardJS.bind("pageup",t=>{updown("up")}),keyboardJS.bind("pagedown",t=>{updown("down")}),keyboardJS.bind("h + k+ f",t=>{if(hiddenFlag){for(li=$(".hidden"),i=0;i<li.length;i++)li[i].removeAttribute("hidden");hiddenFlag=!1}else{for(li=$(".hidden"),i=0;i<li.length;i++)li[i].setAttribute("hidden","true");hiddenFlag=!0}});const toggleButton=document.getElementById("toggleButton"),collapsibleList=document.getElementById("collapsibleList");toggleButton.addEventListener("click",()=>{let t=collapsibleList.querySelectorAll(".newsunshow");console.log(t.length),t.forEach(t=>{t.classList.remove("newsunshow")}),toggleButton.style.display="none"});const fullImage=new Image;fullImage.src="assets/css/images/bg.jpg";const thumbnail=document.querySelector("body");fullImage.onload=function(){document.body.style.backgroundImage="url('assets/css/images/bg2.jpg')"},fullImage.onerror=function(){console.error("Failed to load the full-size image.")};const avatar=new Image;avatar.src="https://i.postimg.cc/Twt9sWkR/avatar.jpg";const thumbnailAvatar=document.querySelector("#home > div > img.avatar");avatar.onload=function(){thumbnailAvatar.src=avatar.src};const hl_vmud=new Image;hl_vmud.src="https://i.postimg.cc/jdL8GZ0B/highlights-vmud.png";const thumbnail1=document.querySelector("#home > section:nth-child(6) > table > tbody > tr:nth-child(1) > td:nth-child(2) > img");hl_vmud.onload=function(){thumbnail1.src=hl_vmud.src};const hl_vision=new Image;hl_vision.src="https://i.postimg.cc/ncgdZBnr/highlights-vision.png";const thumbnail2=document.querySelector("#home > section:nth-child(6) > table > tbody > tr:nth-child(2) > td:nth-child(2) > img");hl_vision.onload=function(){thumbnail2.src=hl_vision.src};const hl_1=new Image;hl_1.src="https://i.postimg.cc/MZsPPg4y/hl1.png";const thumbnail3=document.querySelector("#home > section:nth-child(6) > table > tbody > tr:nth-child(3) > td:nth-child(2) > img");hl_1.onload=function(){thumbnail3.src=hl_1.src};const new_img=new Image;new_img.src="images/new2.gif",new_img.onload=function(){let t=document.querySelectorAll("#collapsibleList > li > p:nth-child(1) > span > img");t.forEach((t,e)=>{t.src=new_img.src})};const tongjimail=new Image;tongjimail.src="https://i.postimg.cc/CKHJj2kn/tongjimail.png";const mailEle=document.querySelector("#contact > form > section > dl:nth-child(2) > img");tongjimail.onload=function(){mailEle.src=tongjimail.src};