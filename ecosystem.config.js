module.exports = {
  apps: [
    {
      name: 'chika-server',
      script: './dist/main.js',
      instances: 'max',
      env_production: {
        exec_mode: 'cluster',
        NODE_ENV: 'production',
      },
    },
  ],
};
