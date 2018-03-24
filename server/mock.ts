import * as express from 'express'

export default (app: express.Express) => {
  // mock
  app.use('/api/todos', (req, res) => {
    return res.status(200).send(
      JSON.stringify({
        code: 200,
        data: [
          { id: 1, isDone: false, value: 'one' },
          { id: 2, isDone: true, value: 'todo' }
        ]
      })
    )
  })
}
