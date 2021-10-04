import {isValidEmail, isWeakPassword} from '../utils/utils'

describe('Valid email', ()=> {
  it('return true', ()=>{
    expect(isValidEmail('user@email.com')).toBeTruthy()
  })
  it('return false', ()=>{
    expect(isValidEmail('useremailcom')).toBeFalsy()
  })
})
describe('Valid Password', ()=> {
  it('return true', ()=>{
    expect(isWeakPassword('2')).toBeTruthy()
  })
  it('return false', ()=>{
    expect(isWeakPassword('123456789')).toBeFalsy()
  })
})