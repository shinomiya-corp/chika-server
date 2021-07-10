module.exports = {
  apps: [
    {
      name: 'chika-server',
      script: './dist/main.js',
      instances: 1,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
