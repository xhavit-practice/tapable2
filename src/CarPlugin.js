module.exports = class CarPlugin {
    apply(car) {
        // 绑定同步hook
        car.hooks.brake.tap('WarningLampPlugin', () =>
            console.log('WarningLampPlugin')
        );

        // 绑定同步hook，并传参
        car.hooks.accelerate.tap('LoggerPlugin', (newSpeed) =>
            console.log(`Accelerating to ${newSpeed}`)
        );

        // 绑定一个异步Promise hook
        car.hooks.calculateRoutes.tapPromise(
            'calculateRoutes tapPromise',
            (source, target, routesList) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log(
                            `tapPromise to ${source}${target}${routesList}`
                        );
                        resolve();
                    }, 1000);
                });
            }
        );
    }
};
