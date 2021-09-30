import { prismaMock } from "../../singleton";
import { deleteUser } from '../../controller/user';
import { updateUser } from "../../controller/user";

const mockResponse: any = () => {
    const res:any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.links = jest.fn().mockReturnValue(res);
    res.json = jest.fn((body) => body);
    return res;
};

describe("Update user", () => {
    test('should return 200', async () => {
        const req: any = {
            query: {
                id: 1
            },
            body: {
                username: 'Hello Prisma',
                password: 'prismapassword',
                email: 'hello@prisma.io',
            }
        }
        const res = mockResponse()
        const user = { id: 1, email: 'hello@prisma.io', username: 'Hello Prisma', password: '$2b$10$phIT8PFGPPEfA4b3/v11wuMDM8.pfmynhzJlFIDUObl3FK0CTcdgq', profile_image: '' }
        const desiredResponse = {
            "id": 1,
            "email": "hello@prisma.io",
            "username": "Hello Prisma",
            "profile_image": ""
        };

        prismaMock.user.update.mockResolvedValue(user)

        await expect(updateUser(req, res)).resolves.toEqual(
            desiredResponse)
    })
})
test('should return 404, user does not exist', async () => {
    const req: any = {
        query: {
            id: '6997'
        },
        body: {
            username: 'Pepita Pérez',
            password: 'testpassword',
            email: 'hello@prisma.io',
        }
    }
    const res = mockResponse()
    const user = {code: "P2025", meta:{cause:'error'}}
    //@ts-ignore
    prismaMock.user.update.mockRejectedValue(user);
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
test('should be return 400 no body', async () => {
    const req: any = {
        query:'1',
        body: {}
    }
    const res = mockResponse()
    await updateUser(req, res)
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
})
})


describe('Delete user', ()=>{
it('ok', async()=>{
    const req:any ={
    query:{
        id:'1',
    }}
    const res =mockResponse()
    const user ={
    id:1,
    email:'email@gmail.com',
    username:'email',
    password:'$2b$10$phIT8PFGPPEfA4b3/v11wuMDM8.pfmynhzJlFIDUObl3FK0CTcdgq',
    profile_image:''}
    prismaMock.user.delete.mockResolvedValue(user)
    await deleteUser(req,res)
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
})
it('400', async ()=>{
    const req:any ={
    query:{
    }}
    const res =mockResponse()
    await deleteUser(req,res)
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
})
it('500', async()=>{
    const req:any ={
    query:{
        id:'1',
    }}
    const res =mockResponse()
    const error = {message:'ERROR'}
    prismaMock.user.delete.mockRejectedValue(error)
    await deleteUser(req,res)
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
})
})
