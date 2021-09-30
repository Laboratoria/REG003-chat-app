import { postAuth } from '../../services/auth'
import {postUser} from '../../services/user'

const MyFetchMock = () => ({
  fetch: jest.fn()
})

describe('fetch Auth', () => {
  it('ok', () => {
    global.fetch = MyFetchMock().fetch
    //@ts-ignore
    fetch.mockImplementation(() => Promise.resolve({
      json: () => ({
        ok: true,
        token: '123'
      })
    }));
    postAuth({ email: '123', password: '123' })
      .then((response) => {
        expect(response).toEqual({
          ok: true,
          token: '123',
        })
      }).catch((err) => {
        console.log(err)
      })
  })
  it('error', () => {
    global.fetch = MyFetchMock().fetch
    //@ts-ignore
    fetch.mockImplementation(() => Promise.reject('error'));
    postAuth({ email: '123', password: '123' })
      .then((response) => {
        expect(response).toBe('error')
      }).catch((err) => {
        console.log(err)
      })
  })
})

describe('Post Auth', () => {
  it('ok', () => {
    global.fetch = MyFetchMock().fetch
    //@ts-ignore
    fetch.mockImplementation(() => Promise.resolve({
      json: () => ({
        ok: true,
        user:{ email: '123', password: '123', username:'123' }
      })
    }));
    postAuth({ email: '123', password: '123', username:'123' })
      .then((response) => {
        expect(response).toEqual({
          ok: true,
          user:{ email: '123', password: '123', username:'123' }
        })
      }).catch((err) => {
        console.log(err)
      })
  })
  it('error', () => {
    global.fetch = MyFetchMock().fetch
    //@ts-ignore
    fetch.mockImplementation(() => Promise.reject('error'));
    postUser({ email: '123', password: '123', username:'123' })
      .then((response) => {
        expect(response).toBe('error')
      }).catch((err) => {
        console.log(err)
      })
  })
})