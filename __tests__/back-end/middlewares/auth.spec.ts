import dotenv from 'dotenv';
dotenv.config();
import { runMiddleware, isSameUser } from '../../../middlewares/auth'
import { prismaMock } from '../../../singleton'

const mockResponse: any = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.links = jest.fn().mockReturnValue(res);
  res.json = jest.fn((body) => body);
  return res;
}

const user = { id: 1, email: 'email@gmail.com', username: 'email', password: '$2b$10$phIT8PFGPPEfA4b3/v11wuMDM8.pfmynhzJlFIDUObl', profile_image: '', }

describe('run Middleware', () => {
  it('401 not header', () => {
    const req: any = {
      headers: {
      }
    }
    const res = mockResponse()
    runMiddleware(req, res, () => { })
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalled()
  })

  it('401 not bearer type', () => {
    const req: any = {
      headers: {
        authorization: 'algo 123456'
      }
    }
    const res = mockResponse()
    runMiddleware(req, res, () => { })
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalled()
  })
  it('403 not token valid', () => {
    const req: any = {
      headers: {
        authorization: 'bearer 123456'
      }
    }
    const res = mockResponse()

    runMiddleware(req, res, () => { })
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalled()
  })
  it('403 not token valid', () => {
    const req: any = {
      headers: {
        authorization: 'bearer 123456'
      }
    }
    const res = mockResponse()
    runMiddleware(req, res, () => { })
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalled()
  })
  it('500', () => {
    const req: any = {
      headers: {
        authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIwLCJlbWFpbCI6InVzZXIyQGNoYXQuY29tIiwiaWF0IjoxNjMzMzE5ODIwLCJleHAiOjE2MzMzNDg2MjB9.cxTehLdJmuTax0FicCRQ5PwHFOLWMUtEsuRl-3Gsh0o'
      }
    }
    prismaMock.user.findUnique.mockRejectedValue('error')
    const res = mockResponse()
    runMiddleware(req, res, () => { })
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalled()
  })

  it('Same User function being called', () => {
    const isSameUser = jest.fn();
    const req: any = {
      headers: {
        authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIwLCJlbWFpbCI6InVzZXIyQGNoYXQuY29tIiwiaWF0IjoxNjMzMzE5ODIwLCJleHAiOjE2MzMzNDg2MjB9.cxTehLdJmuTax0FicCRQ5PwHFOLWMUtEsuRl-3Gsh0o'
      }
    }
    const res = mockResponse()
    prismaMock.user.findUnique.mockResolvedValue(user)
    runMiddleware(req, res, () => { })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(req.authentication).toBeTruthy();
    expect(req.authentication).toEqual({
      "id": 20,
      "email": "user2@chat.com",
      "iat": 1633319820,
      "exp": 1633348620
    })
    expect(isSameUser).toHaveBeenCalled()

  })

})
/* describe('is Same user', ()=>{

  it('',()=>{})
})  */