import {postAuth} from '../../services/auth'

describe('algo', ()=>{
  it('fdf',()=>{})
})
/*

const MyFetchMock = () =>{
fetch: jest.fn()
}

describe('fetch Auth', ()=>{
it('ok', ()=>{
  const fetch = MyFetchMock()
  fetch.mockImplementation(() => Promise.resolve({
    ok: true,
    token: '123',
  }));
  expect(postAuth({email:'123', password:'123'})).toEqual({ok: true,
    token: '123',})
})

}) */