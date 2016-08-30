const fs = require('fs-plus');
const path = require('path');
const ignore = require('./util').ignore;
const plugins = require('./util').plugins;
const execSync = require('child_process').execSync;
const { Emitter } = require('event-kit');
const babel = require('./babel');
const AsukaPackage = require('./asuka-package');

class PackageManager {
  constructor(local) {
    this.emitter = new Emitter();
    this.home = process.env.PACKAGE_HOME;
    this.local = process.env.HOME;
    this.loadPackages.bind(this);
    this.loadedPackages = {};
    this.packagesCache = {};
    this.activePackages = {};
  }

  loadPackages() {
    const { home } = this;
    if (process.env.env = 'dev') {
      console.log('load Package meta data');
    }
    // const paths = fs.readdirSync(home);
    plugins.map((dir) => {
      if (ignore.indexOf(dir) > -1) return;
      const fullPath = path.join(process.env.HOME, 'plugins' , dir);
      const asukaPackage = new AsukaPackage('dva-plugin', fullPath);
      this.loadedPackages[fullPath] = asukaPackage;
      asukaPackage.loadMetaData();
      asukaPackage.enable();
      if (process.env.env === 'dev') {
        //asukaPackage.loadDevDependencies(cache);
      }
    });
  }

  installDependencies(dir) {
    const cmd = 'npm install';
    const info = execSync(cmd, {cwd: dir});
    console.log(info.toString());
  }
}

const manager = new PackageManager();

module.exports = manager;
