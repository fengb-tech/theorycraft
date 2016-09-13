require('./inspect-item.tag')

const pubsub = require('lib/assets/js/controllers/pubsub')

<inspect style={ css() } show={ item }>
  <inspect-item if={ item } item={ item } />

  <style scoped>
    :scope {
      position: fixed;
      background: white;
      border: 1px solid black;
      padding: 0 4px;
    }
  </style>

  <script>
    this.css = () => `left: ${this.x || 0}px; top: ${this.y || 0}px`

    const onMouseMove = (event) => {
      this.x = event.clientX + 10
      this.y = event.clientY + 10
      this.update()
    }

    this.on('before-unmount', () => {
      document.removeEventListener('mousemove', onMouseMove)
    })

    pubsub.on('item.show', (item) => {
      this.item = item
      document.addEventListener('mousemove', onMouseMove)
      this.update()
    })
    pubsub.on('item.hide', (item) => {
      if (item !== this.item) {
        return
      }

      this.item = null
      document.removeEventListener('mousemove', onMouseMove)
      this.update()
    })
  </script>
</inspect>
