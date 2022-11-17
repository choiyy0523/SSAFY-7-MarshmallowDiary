import { atom } from 'recoil';

export const userState = atom({
  key:'user',
  default: {
    token: '',
    refresh: '',
    password: '',
    id: '',
    theme: 'light',
    font: '',
    push: '',
  }
})