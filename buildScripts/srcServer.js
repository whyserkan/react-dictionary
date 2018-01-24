import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.dev'
import chalk from 'chalk'

const app = express();
const port = 3000;
const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.puplicPath
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(port, (err) => {
  if(err) {
    console.log(chalk.red('Error on server start', err))
  } else {
    console.log('src server started at port 3000')
  }
})