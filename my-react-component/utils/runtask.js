/**
 * 运行一个耗时任务
 * 如果要异步执行任务，请返回promise
 * 要尽快完成任务， 同时不让页面产生卡顿
 * 尽量兼容更多的浏览器
 *  @param {Function} task
 */
function runTask(task) {
    // 同步执行 阻塞渲染流程
    task();

    // 微队列 阻塞
    return Promise.resolve().then(task);

    // 宏队列 阻塞
    return new Promise((resolve) => {
        setTimeout(() => {
            task();
            resolve();
        },0);
    });

    // custom handler
    return new Promise((resolve) => {
        _runTask(task, resolve);
    });


}

function _runTask(task, callback) {
    // if(这一帧还有剩余时间) {
    //     task();
    //     callback();
    // } else {
    //     _runTask(task, callback);
    // }

    requestIdleCallback(deadline => {
        if(deadline.timeRemaining() > 0) {
            task();
            callback();
        } else {
            _runTask(task, callback);
        }
    })

    const time = Date.now();
    requestAnimationFrame(() => {
        if(Date.now() - time > 16.6) {
            task();
            callback();
        } else {
            _runTask(task, callback);
        }
    })
}
