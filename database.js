class Database {
  lib = {};

  setAgeData(name, age) {
    console.log(name, age)
    this.lib[name] = age;
    console.log(this.lib);
  }

  getAgeData(name) {
    return this.lib[name];
  }
}

module.exports = new Database();
