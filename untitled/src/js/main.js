/**
 * 常用JS变量:
 * agentEvent = 代理模式下自动点击模块
 * acEvent= 无障碍模式下自动点击模块
 * device = 设备信息模块
 * file = 文件处理模块
 * http = HTTP网络请求模块
 * shell = shell命令模块
 * thread= 多线程模块
 * image = 图色查找模块
 * utils= 工具类模块
 * global = 全局快捷方式模块
 * 常用java变量：
 *  context : Android的Context对象
 *  javaLoader : java的类加载器对象
 * 导入Java类或者包：
 *  importClass(类名) = 导入java类
 *      例如: importClass(java.io.File) 导入java的 File 类
 *  importPackage(包名) =导入java包名下的所有类
 *      例如: importPackage(java.util) 导入java.util下的类
 *
 */

function main() {
    if (init()) {
        log('初始化成功')
        // let  tmpImage = image.captureScreen(3,1040,26,1156,58)
        // let tmpImage = image.captureFullScreen();
        // orz 参数代表是旋转角度，0 代表不旋转 90 代表向左旋转90度，还有180，270，360参数
        dungeon.start();
        // getBaseInfo()
        //释放所有资源
        // mainTask_Start();
    }

}

main()
