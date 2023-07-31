//初始化脚本
function funcInit() {
    log(INIT_LOG)
}

//日志输出
function log(str) {
    if (logPrintConsole) {
        console.log(str)
    }
    if (logPrintDevice) {
        toast(str)
    }
}

//获取当前图片
//获取当前屏幕信息
function getImage() {
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
    if (currentImg != undefined) {
        image.recycle(currentImg)
    }
    currentImg = image.captureFullScreenEx()
    return currentImg
}

//获取当前时间
function getTime() {
    return new Date().getTime()
}

function getImageScope(str) {
    const fruits = new Map([
        ["主线_下一步.png", [905, 300, 1276, 580]],
        ["主线_当前任务.png", [58, 185, 138, 444]],
        ["主线_成长.png", [130, 112, 160, 137]],
        ["菜单_更多.png", [130, 112, 160, 137]],
        ["菜单_背包.png", [495, 5, 1276, 68]]
    ]);
    return fruits.has(str) ? fruits.get(str) : undefined

}

function init(){
    log("isServiceOk " + isServiceOk());
    startEnv()
    log("isServiceOk " + isServiceOk());
    let req = image.requestScreenCapture(10000,0);
    if (!req) {
        req = image.requestScreenCapture(10000,0);
    }
    if (!req) {
        toast("申请权限失败");
        return false;
    }
    sleep(1000)

    let mlkit = {
        "type": "mlkit"
    }

    let inited = ocr.initOcr(mlkit)
    logd("初始化结果 -" + inited);
    if (!inited) {
        loge("error : " + ocr.getErrorMsg());
        return false;
    }
    return true
}

function getBaseInfo() {
    var zl = getOcrScope('金钱')
    let tmpImage = image.captureScreen(3, 214, 164, 496, 600)
    let tmpImage2 = image.captureScreen(3, zl[0], zl[1], zl[2], zl[3])
    // let  tmpImage = image.captureScreen(3,1040,26,1156,58)
    // let tmpImage = image.captureFullScreen();
    // orz 参数代表是旋转角度，0 代表不旋转 90 代表向左旋转90度，还有180，270，360参数
    let result = ocr.ocrImage(tmpImage, 20000, {"orz": 0});
    let result2 = ocr.ocrImage(tmpImage2, 20000, {"orz": 0});
    PLAY_INFO.LEVEL = result[0].label
    PLAY_INFO.NICKNAME = result[1].label
    PLAY_INFO.STAT = result[1].label
    PLAY_INFO.POWER = result[3].label
    PLAY_INFO.MONEY = result2[0].label
    log('等级:' + result[0].label)
    log('昵称:' + result[1].label)
    log('星力:' + result[2].label)
    log('战力:' + result[3].label)
    log('金钱:' + result2[0].label)
    image.recycle(tmpImage)
    image.recycle(tmpImage2)
}


function getDungeon() {
    const fruits = new Map([
        ["每日地城", [6,144, 1274,708]],
        ["等级", [228, 165, 318, 190]],
        ["金钱", [1040, 26, 1156, 58]],
        ["战力", [312, 508, 470, 531]]
    ]);
}

function getOcrScope(str) {
    const fruits = new Map([
        ["星力", [253, 221, 302, 244]],
        ["等级", [228, 165, 318, 190]],
        ["金钱", [1040, 26, 1156, 58]],
        ["战力", [312, 508, 470, 531]]
    ]);
    return fruits.has(str) ? fruits.get(str) : undefined

}