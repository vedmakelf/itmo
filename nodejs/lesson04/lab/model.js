var fs = require('fs');

module.exports = class FileJSONStorage {
    constructor(path) {
        this._source = path;
        this._store = [];
    }

    write(cb) {
        fs.writeFile(this._source, JSON.stringify(this._store), cb);
    }

    read(cb) {
		fs.readFile(this._source, 'utf8', (err, data) => {
			if (err) console.log(err);
			this._store = JSON.parse(data);
			cb(err);
		})
    }

    addData(data) {
        this._store.push(data);
    }

    getAllData() {
        return this._store;
    }

    findDataByPropery(propName, value) {
        for (let i = 0; i < this._store.length; i++) {
            if (this._store[i][propName] && this._store[i][propName] == value)
                return this._store[i];
        }
    }
}