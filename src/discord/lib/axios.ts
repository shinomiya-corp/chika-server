import axios from 'axios';
import * as rax from 'retry-axios';

const discordAxios = axios.create({
  baseURL: 'https://discord.com/api',
});
discordAxios.defaults.raxConfig = {
  instance: discordAxios,
  backoffType: 'exponential',
  retry: 5,
};
rax.attach(discordAxios);

export default discordAxios;
