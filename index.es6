import app from 'tc/server'

const port = Number(process.env.PORT || 5000)

app.listen(port, () => {
  console.log('theorycraft started on', port)
})
