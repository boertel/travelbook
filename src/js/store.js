
export function Store() {
    this.clean()
    this.listeners = [];
}

Store.prototype.clean = function() {
    this.storage = []
}

Store.prototype.push = function(value) {
    if (_.isArray(value)) {
        this.storage = this.storage.concat(value);
    } else {
        this.storage.push(value)
    }
    this.change()
}

Store.prototype.remove = function(value) {
    var index = this.storage.indexOf(value)
    if (index > -1) {
        return this.storage.splice(index, 1)
    }
}

Store.prototype.get = function() {
    return this.storage;
}

Store.prototype.change = function() {
    this.listeners.forEach((listener) => {
        listener()
    })
}

Store.prototype.bind = function (listener) {
    this.listeners.push(listener)
}

Store.prototype.unbind = function (l) {
}


export default {
    markers: new Store(),
    sections: new Store()
}
