// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
}