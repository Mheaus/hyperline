const globalConfig = global.config.getConfig();

const defaultConfig = {
  gitlabUrl: 'gitlab.com',
  gitlabPrivateToken: '',
};

const hyperConfig = {};

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

const config = {
  ...defaultConfig,
  ...hyperConfig,
};

export function getConfig() {
  return config;
}
