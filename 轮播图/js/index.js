/**
 * Created by Miao1 on 2017/9/23.
 */
window.onload = function () {
    var banner = document.querySelector(".banner")
    var imgBox = banner.querySelector("ul:first-of-type");

    var first = imgBox.querySelector("li:first-of-type")
    var last = imgBox.querySelector("li:last-of-type")
    imgBox.appendChild(first.cloneNode(true))
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild)

    var lis = imgBox.querySelectorAll("li")
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    imgBox.style.width = count * bannerWidth + "px";
     for( var i=0 ; i<lis.length; i++){
         lis[i].style.width = bannerWidth + "px";
     }
    index = 1
    imgBox.style.left = -index * bannerWidth + "px";

    window.onresize = function () {
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = bannerWidth * count + "px";
        for (var i = 0 ; i<lis.length; i++){
            lis[i].style.width = bannerWidth +"px";
        }
        imgBox.style.left = -bannerWidth * index + "px";
    }

    var setIndicator = function(index) {
        var indicators = document.querySelector("ul:last-of-type").querySelectorAll("li")
        for (var i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove("active")
        }
        indicators[index-1].classList.add("active");
    }
//自动轮播
    var timer
    var startTime = function () {
        timer = setInterval(function () {
            index++;
            imgBox.style.transition = "left 0.5s"
            imgBox.style.left = -index * bannerWidth + "px";
            setTimeout(function () {
                if (index == count - 1){
                    index = 1;
                    imgBox.style.transition = "none";
                    imgBox.style.left = -index * bannerWidth + "px"
                }
            },500)
        },2500)
    }
    startTime()

//手动轮播图
    var startX,moveX,distanceX;
    var isEnd=true;
    imgBox.addEventListener("touchstart",function (event) {
        startX = event.targetTouches[0].clientX;
        console.log(startX);
    })
    imgBox.addEventListener("touchmove",function (event) {
        if (isEnd == true){
            moveX = event.targetTouches[0].clientX;
            distanceX = moveX - startX;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth  + distanceX + "px";
        }
    })

    imgBox.addEventListener("touchend",function (event) {
        isEnd = false;
        if (Math.abs(distanceX) > 100){
            if (distanceX > 0 ){
                index--;
            } else  {
                index++;
            }
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -index * bannerWidth + "px";
        } else if (distanceX > 0 ){
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = -index * bannerWidth + "px";
        }
        startX = 0;
        moveX = 0 ;
        distanceX = 0;
    })

    imgBox.addEventListener("webkitTransitionEnd",function () {
        if(index == count -1){
            index = 1;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + "px";
        } else  if (index == 0){
            index = count - 2;
            imgBox.style.transition = "none"
            imgBox.style.left = -index * bannerWidth + "px";
        }
        setIndicator(index);
        setTimeout(function () {
            isEnd = true;
            clearInterval(timer)
            startTime()
        },500)
    })


    imgBox.addEventListener("webkitTransitionEnd",function () {

        if ( index == count - 1 ){
            index = 1;
            imgBox.style.transition = "none";
            imgBox.style.left = - index * bannerWidth + "px";
        } else if ( index == 0) {
            index = count - 2;
            imgBox.style.transition = "none";
            imgBox.style.left = - index * bannerWidth + "px";
        }
        setIndicator(index);
        setTimeout(function () {
            isEnd = true;
            clearInterval(timer);
            startTime();
        },500)
    })








}