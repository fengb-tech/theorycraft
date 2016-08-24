const pubsub = require('lib/assets/js/controllers/pubsub')

<backpack>
  <div each={ opts.backpack }
      class='backpack-item'
onMouseOver={ parent.onMouseOver }
 onMouseOut={ parent.onMouseOut }
    onClick={ parent.onClick }>
    {name}
  </div>

  <script>
    this.opts.backpack.on('change', () => this.update())

    this.onMouseOver = (event) => {
      pubsub.emit('item.show', event.item)
    }

    this.onMouseOut = (event) => {
      pubsub.emit('item.hide', event.item)
    }

    this.onClick = (event) => {
      pubsub.emit('click.item', this.opts.backpack, this.opts.backpack.indexOf(event.item))
    }
  </script>
</backpack>
