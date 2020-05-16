const Car = require('./Car');
const CarPlugin = require('./CarPlugin');

const car = new Car();
const options = {
    plugins: [new CarPlugin()],
};

for (const plugin of options.plugins) {
    if (typeof plugin === 'function') {
        plugin.call(car, car);
    } else {
        plugin.apply(car);
    }
}

car.run();
