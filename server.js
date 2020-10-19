/**
 * @author 3zz.
 * @data 2020/10/19
 */
const Koa = require('koa');
const Router = require('koa-router')
const next = require('next');
const session = require('koa-session')
const Redis = require('ioredis')
const koaBody = require('koa-body')
const atob = require('atob')

const config = require('./config')
const auth = require('./server/auth')
const api = require('./server/api')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  server.listen(3000, () => {
    console.log('koa is listening on 3000');
  });
});
