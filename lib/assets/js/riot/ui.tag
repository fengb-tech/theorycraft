require('./console.tag')
require('./combat.tag')
require('./hero.tag')
require('./inspect.tag')

<ui>
  <console />
  <combat />
  <hero hero={ opts.game.hero } />
  <inspect />

  <style scoped>
    console {
      height: 400px;
    }

    combat {
      width: 200px;
      margin: 0 auto;
    }
  </style>
</ui>
