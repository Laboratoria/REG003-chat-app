import { postAuth } from '../../services/auth'

describe('algo', () => {
  it('fdf', () => { })
})


const MyFetchMock = () => ({
  fetch: jest.fn()
})

describe('fetch Auth', () => {
  it('ok', () => {
    global.fetch = MyFetchMock().fetch
    console.log(fetch);
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
})