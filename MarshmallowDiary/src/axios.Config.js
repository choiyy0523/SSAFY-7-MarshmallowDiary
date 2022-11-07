import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://marshmallowdiary.com/api/'
})

export default instance