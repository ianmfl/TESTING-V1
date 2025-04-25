import nock from 'nock'
import {app} from '../src/app'
import request from 'supertest'

const REMOTE_API = 'https://jsonplaceholder.typicode.com/'

const samplePosts = [
  { userId: 1, id: 1, title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto' },
  { userId: 1, id: 2, title: 'baz', body: 'qux' },
];
const sampleComments = [
  { postId: 1, id: 101, name: 'c1', email: 'a@b.com', body: 'hello' },
  { postId: 1, id: 102, name: 'c2', email: 'c@d.com', body: 'world' },
];

beforeAll(() => {
    nock(REMOTE_API)
        .persist()
        .get('/posts')
        .reply(200, samplePosts)
        .get('/posts/1')
        .reply(200, samplePosts[0])
        .get('/posts/1/comments')
        .reply(200, sampleComments)
        .get('/comments')
        .query({ postId: '1' })
    .reply(200, sampleComments)
})

afterAll(() => {
    nock.cleanAll()
    nock.enableNetConnect()
})


describe('Posts API', () => {
    it('GET /posts return not empty array', async () => {
        const res = await request(app).get('/posts')
        expect(res.status).toBe(200)
        expect(res.body).not.toBe([])
    })

    it('GET /posts/1 → proxies and returns the first post', async () => {
        const res = await request(app).get('/posts/1')
        expect(res.status).toBe(200)
        expect(res.body).toEqual(samplePosts[0])
    })

    it('GET /posts return object with proper keys', async () => {
        const res = await request(app).get('/posts')
        expect(res.status).toBe(200)
        const expectedKeys = Object.keys(samplePosts[0]).sort()
        const receivedKeys = Object.keys(res.body[0]).sort()
        expect(receivedKeys).toEqual(expectedKeys)
    })
})