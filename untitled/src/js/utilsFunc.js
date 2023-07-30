//初始化脚本
function funcInit(){
    log(INIT_LOG)
}

//日志输出
function log(str){
    if (logPrintConsole) {
        console.log(str)
    }
    if (logPrintDevice) {
        toast(str)
    }
}

//获取当前图片
//获取当前屏幕信息
function getImage(){
    //当前图片已过期或 无 图片
    // if (currentImg == undefined || currentImgTime == undefined || currentImgTime+currentImgExpireTime<getTime()) {
    //     if (currentImg!=undefined) {
    //         //释放旧的图片
    //         image.recycle(currentImg)
    //     }
    //     log('读取新的图片')
    //     //更新图片 时间
    //     currentImg = image.captureFullScreen()
    //     currentImgTime = getTime()
    // }
    if (currentImg !=undefined) {
        image.recycle(currentImg)
    }
    currentImg = image.captureFullScreenEx ()
    return currentImg
}

//获取当前时间
function getTime(){
    return new Date().getTime()
}

function getImageScope(str) {
    const fruits = new Map([
        ["主线_下一步.png", [905,300,1276,580]]
    ]);
    return fruits.has(str)?fruits.get(str):undefined

}