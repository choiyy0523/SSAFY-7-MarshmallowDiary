import { atom } from 'recoil';

// const user = {
//   id: '',
//   token: '',
//   refresh: '',
//   password: '',
//   theme: 'light',
//   font: '',
//   push: ''
// }

export const userState = atom({
  key:'user',
  default: [
    {
      id: '',
      token: '',
      refresh: '',
      password: '',
      font: '',
      push: ''
    }
  ]
})

