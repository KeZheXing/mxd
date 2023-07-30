//主线任务
function mainTask_Start() {
    while (gameStatus == MAIN_TASK) {
        //等待自动任务
        var isAuto = isAUTO()
        if (!isAuto) {
            ///处理当前界面
            handle()
        }
        log('结束')
        sleep(1000)
    }
}


//检查当前状态是否为进行中
function isAUTO() {
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
                if (R-Math.sqrt(absX*absX+absY*absY)<1) {
                    let firstColor = "#AE9759,#C7AB5C,#CEAF5E,#D9B961,#E0C16A,#C8AC5C,#D1B35E,#DBBA5E,#E7C260,#EACB75,#D5B660,#DDBD61,#EDCE70,#F0D074,#F1D581,#E7C86B,#F2D77C,#F4DD81,#F4DB8B,#F6E09C,#EACC70,#F5DD82,#F9E6A3,#F9E9C7,#FCEDCB,#F5D581,#FAE187,#FCEC9D,#FFF6D3,#F9DC8C,#F8DF98,#FAE7AE,#F9E5A4,#F8E3A9"; let points = image.findColor(tmpImage, firstColor, 0.9, x, y, x, y, 1, 2);
                    if (points) {
                        count++
                    }
                    if (count>200) {
                        var closeTask = readResAutoImage("主线_任务关闭.png");
                        log(closeTask)
                        let closeTaskPoints = image.findImageByColor(tmpImage, closeTask, 0, 0, 0, 0, 0.8, 10);
                        image.recycle(closeTask)
                        log(closeTaskPoints)
                        if (closeTaskPoints) {
                            log("自动中_主线_关闭任务")
                            result =  false
                            break;
                        }
                        if (MIAN_TASK_YD) {
                            let smallTmplate = readResAutoImage("主线_立刻移动.png");
                            let points = image.findImage(tmpImage, smallTmplate, 650, 185, 711, 221, 0.7, 0.8, 10, 5);
                            image.recycle(smallTmplate)
                            if (points) {
                                log("自动中_自动任务 立刻移动...");
                                clickPoint(761,204)
                                currentImgTime = undefined
                                sleep(500);
                            }
                        }
                        result =  true
                        break;
                    }
                    if (result) {
                        break;
                    }
                }
            }
            if (result) {
                break;
            }
        }

    }
    log('自动结果3:'+ result)
    return result
}


//任务进行
function handle() {
    let screenImage = getImage();
    if (screenImage != null) {
        var list = new Array();
        list.push("主线_完成.png","主线_下一步.png", "主线_接受.png","主线_领取奖励.png","主线_可开始.png","主线_当前任务.png", "主线_确认.png", "主线_装备.png", "主线_进行.png", "升级_自动分配.png", "升级_确认.png", "签到_关闭.png")
        for (var i = 0; i < list.length; i++) {
            log("加载图片图片"+list[i])
            let smallTmplate = readResAutoImage(list[i]);
            log("匹配图片"+list[i])
            image.setFindColorImageMode(1)
            var getScope = getImageScope(list[i])
            if (getScope!=undefined) {
                log("得到匹配图片"+list[i])
            }
            let points = image.findImageByColor(screenImage, smallTmplate, getScope==undefined?0:getScope[0], getScope==undefined?178:getScope[1], getScope==undefined?1273:getScope[2], getScope==undefined?710:getScope[3], 0.7, 2);
            image.recycle(smallTmplate)
            if (points) {
                log("自动任务..." + list[i]);
                clickPoint(points[0].x, points[0].y)
                currentImgTime = undefined
                sleep(1000);
                if (list[i]!="主线_当前任务.png") {
                    handle()
                }
            }
        }
        sleep(1000);
        log("自动任务...等待");
    } else {
        log("处理失败")
    }
}
