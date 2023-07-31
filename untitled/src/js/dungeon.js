//主线任务
function Dungeon() {

}
var dungeon = new Dungeon()


Dungeon.prototype.start = function () {
    while (gameStatus == DUNGEON) {
        //等待自动任务
        var isAuto = dungeon.isAUTO()
        if (!isAuto) {
            ///处理当前界面
            dungeon.handle()
        }
        log('结束')
        sleep(1000)
    }
}


//检查当前状态是否为进行中
Dungeon.prototype.isAUTO = function () {
    var result = false
    let tmpImage = getImage();
    if (tmpImage != null) {
        var centerPointX = 423
        var centerPointY = 653
        var R = 423 - 395
        var count = 0
        for (var x=centerPointX-R;x<centerPointX+R;x++){
            for (var y=centerPointY-R;y<centerPointY+R;y++){
                var absX = Math.abs(centerPointX-x)
                var absY = Math.abs(centerPointY-y)
                if (R-Math.sqrt(absX*absX+absY*absY)<0.5) {
                    let firstColor = "#AE9759,#C7AB5C,#CEAF5E,#D9B961,#E0C16A,#C8AC5C,#D1B35E,#DBBA5E,#E7C260,#EACB75,#D5B660,#DDBD61,#EDCE70,#F0D074,#F1D581,#E7C86B,#F2D77C,#F4DD81,#F4DB8B,#F6E09C,#EACC70,#F5DD82,#F9E6A3,#F9E9C7,#FCEDCB,#F5D581,#FAE187,#FCEC9D,#FFF6D3,#F9DC8C,#F8DF98,#FAE7AE,#F9E5A4,#F8E3A9";
                    let points = image.findColor(tmpImage, firstColor, 0.9, x, y, x, y, 1, 2);
                    if (points) {
                        count++
                    }
                    if (count>300) {
                        result =  true
                        log("跳过1")
                        break;
                    }
                    if (result) {
                        log("跳过2")
                        break;
                    }
                }
            }
            if (result) {
                log("跳过3")
                break;
            }
        }

    }
    log('自动结果3:'+ result)
    return result
}


//任务进行
Dungeon.prototype.handle = function () {
    log('自动副本')
    let screenImage = getImage();
    if (screenImage != null) {
        var list = new Array();
        list.push("副本_每日地城.png")
        for (var i = 0; i < list.length; i++) {
            log("加载图片图片"+list[i])
            let smallTmplate = readResAutoImage(list[i]);
            log("匹配图片"+list[i])
            image.setFindColorImageMode(1)
            var getScope = getImageScope(list[i])
            if (getScope!=undefined) {
                log("得到匹配图片"+list[i])
            }
            let points = image.findImageByColor(screenImage, smallTmplate, getScope==undefined?0:getScope[0], getScope==undefined?0:getScope[1], getScope==undefined?0:getScope[2], getScope==undefined?0:getScope[3], 0.7, 2);
            image.recycle(smallTmplate)
            image.recycle(screenImage)
            currentImg = undefined
            log(points)
            if (points) {
                log("自动副本找到..." + list[i]);
                log(JSON.stringify(points))
                log(points[0].x +","+ (points[0].y+200)+","+(points[0].x+170)+","+ (points[0].y+65))
                let tmpImage = image.captureScreen(3, 23,363,193,228)
                let result = ocr.ocrImage(tmpImage, 20000, {"orz": 0});
                log(JSON.stringify(result))
                image.recycle(tmpImage)
                currentImgTime = undefined
                sleep(1000);
                break;
            }
        }
        sleep(1000);
        log("自动副本...等待");
    } else {
        log("自动副本处理失败")
    }
}
