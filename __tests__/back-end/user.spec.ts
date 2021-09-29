import { prismaMock } from "../../singleton";
import { updateUser } from "../../controller/user";

const mockResponse: any = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.links = jest.fn().mockReturnValue(res);
    res.json = jest.fn((body) => body);
    return res;
};

describe("User Controller", () => {
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
    // const response = await updateUser(req, res)
    // expect(res.json).toHaveBeenCalled();
    // expect(res.status).toBe(200);
    // expect(res.status).toBe(200)
    // expect(res.json).toMatchObject(desiredResponse)

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
    const user = { id: 3244, email: 'email@gmail.com', username: 'email', password: '$2b$10$phIT8PFGPPEfA4b3/v11wuMDM8.pfmynhzJlFIDUObl3FK0CTcdgq', profile_image: '' }
    prismaMock.user.update.mockResolvedValue(user);
    // const response =
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404)
    console.log(res)
    // expect(res.status).toBe(400);
    // expect(res.status).toBe(404)
    // expect(res.ok).toBeFalsy();
})
test('should be return 400 no body', async () => {
    const req: any = {
        body: {}
    }
    const res = mockResponse()
    const user = { id: 1, email: 'email@gmail.com', username: 'email', password: '$2b$10$phIT8PFGPPEfA4b3/v11wuMDM8.pfmynhzJlFIDUObl', profile_image: '' }
    prismaMock.user.findUnique.mockResolvedValue(user)
    const response = await updateUser(req, res)
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
})

