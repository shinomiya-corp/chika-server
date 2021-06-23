module.exports = {
  apps: [
    {
      name: 'chika-server',
      script: './dist/main.js',
      env_production: {
        instances: 'max',
        exec_mode: 'cluster',
        NODE_ENV: 'production',
      },
    },
  ],
};
