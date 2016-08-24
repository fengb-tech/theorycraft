require('./stats.tag')

<inspect-item>
  <h2 className='item-name'>{ opts.item.name }</h2>
  <div if={ opts.item.minDamage }>
    <pair title='Damage' value='{opts.item.minDamage}&nbsp;-&nbsp;{opts.item.maxDamage}' />
    <pair title='Atk/s' value={ speed(opts.item.attackDelay) } />
  </div>
  <stats stats={ opts.item.stats } />

  <script>
    this.speed = (attackDelay) => (1000 / attackDelay).toFixed(2)
  </script>
</inspect-item>
