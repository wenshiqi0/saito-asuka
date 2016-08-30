class AsukaPackage {
  constructor(plugin, absolute) {
    this.pluginName = plugin;
    this.path = absolute;
    this.metaData = {};
    this.switchOn = false;

    this.enable.bind(this);
    this.disable.bind(this);
    this.loadMetaData.bind(this);
    this.loadDependencies.bind(this);
    this.loadDevDependencies.bind(this);
    this.installDependencies.bind(this);
  }

  loadMetaData() {
    const { path } = this;
    console.log(path);
    try {
      this.metaData = require(`${path}/package.json`);
    } catch(e) {
      throw new Error(`Failed to read the package.json of '${this.pluginName}'`);
    }
    if (process.env.env === 'dev') {
      //console.log(this.metaData);
    }
  }

  enable() {
    if (!this.switchOn) {
      require(this.path);
      this.switchOn = true;
    }
  }

  disable() {
    if (this.switchOn) {
      delete Module._cache[this.path];
      this.switchOn = false;
    }
  }

  loadDevDependencies() {
    
  }

  loadDependencies() {

  }

  installDependencies() {
    const cmd = 'npm install';
    const info = execSync(cmd, {cwd: this.path});
    console.log(info.toString());
  }
}

module.exports = AsukaPackage;