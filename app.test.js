const fs = require('fs')
const request = require('supertest')
const app = require('./app')

describe('/upload', () => {

  test('it should accept a file upload', async () => {
    process.env['KEY_TEST'] = '/tmp/AWEJA_testfile.txt'
    const name = 'test.txt'
    const url = '/upload?key=TEST'
    const file = Buffer.from('This is a test file', 'utf8')
    const res = await request(app).post(url).attach('data', file, name)
    expect(res.status).toEqual(201)
    expect(res.text).toEqual('Upload successful')
    expect(fs.existsSync('/tmp/AWEJA_testfile.txt')).toEqual(true)
    fs.unlinkSync('/tmp/AWEJA_testfile.txt')
    delete process.env['KEY_TEST']
  })

  test('it should error for unknown requests', async () => {
    const res = await request(app).get('/')
    expect(res.status).toEqual(400)
    expect(res.text).toEqual('That request is not supported')
  })

  test('it should fail when no file is provided', async () => {
    const res = await request(app).post('/upload')
    expect(res.status).toEqual(400)
    expect(res.text).toEqual('File not provided')
  })

  test('it should fail when no key is provided', async () => {
    const name = 'test.txt'
    const file = Buffer.from('This is a test file', 'utf8')
    const res = await request(app).post('/upload').attach('data', file, name)
    expect(res.status).toEqual(400)
    expect(res.text).toEqual('Invalid key provided')
  })

})
