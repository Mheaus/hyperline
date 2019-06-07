const defaultConfig = {
  gitlabUrl: 'gitlab.com',
  gitlabPrivateToken: '',
  plugins: '[[time, ip, memory, cpu, network, docker], [gitlab]]',
};

let globalConfig;
const hyperConfig = {};

function loadHyperConfig() {
  if (globalConfig.env.HYPERLINE_CONFIG) {
    Object.assign(hyperConfig, JSON.parse(globalConfig.env.HYPERLINE_CONFIG));
  } else {
    console.warn(
      'Hyperline Warning : no config found. Be sure to add `env: { HYPERLINE_CONFIG: "{....}" }` in your hyper config.'
    );
  }

  if (hyperConfig.gitlabUrl && !hyperConfig.gitlabPrivateToken) {
    console.warn(
      'Warning : no gitlab privateToken found  in config with your gitlabUrl custom. Be sure to add `env: { HYPERLINE_CONFIG: "{"gitlabUrl":...,"gitlabPrivateToken":...}" }` in your hyper config.'
    );
  }
}

if (globalConfig) {
  loadHyperConfig();
}

const config = {
  ...defaultConfig,
  ...hyperConfig,
};

export function getHyperlineConfig() {
  if (!globalConfig) {
    globalConfig = global.config.getConfig();
    loadHyperConfig();

    Object.assign(config, hyperConfig);
  }

  return config;
}
