require('./pair.tag')

const pubsub = require('lib/assets/js/controllers/pubsub')

<equipment>
  <pair each={ opts.equipment.items }
       title={ type }
       value={ name }
     onclick={ parent.onClick }
 onmouseover={ parent.onMouseOver }
  onmouseout={ parent.onMouseOut } />

  <script>
    this.opts.equipment.on('change', () => this.update())

    this.onMouseOver = (event) => {
      pubsub.emit('item.show', event.item)
    }

    this.onMouseOut = (event) => {
      pubsub.emit('item.hide', event.item)
    }

    this.onClick = (event) => {
      pubsub.emit('click.item', this.opts.equipment, event.item.type)
    }
  </script>
</equipment>
