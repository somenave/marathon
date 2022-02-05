const options = {
    storageType: 'local',
    defaultValue: ''
};

class Storage {
    constructor(key, options) {
        this.key = key;
        this.storageType = options.storageType === 'local' ? localStorage : sessionStorage;
        this.defaultValue = options.defaultValue;
    }

    get() {
        return this.storageType.getItem(this.key);
    }

    set(value) {
        this.storageType.setItem(this.key, value ?? this.defaultValue);
    }

    clear() {
        this.storageType.removeItem(this.key);
    }

    isEmpty() {
        return !this.storageType.getItem(this.key);
    }
}


const name = new Storage('name', { storageType: 'session', defaultValue: 'Alex' });

name.set();
console.log(name.get()); // Alex
console.log(name.isEmpty()); // false
