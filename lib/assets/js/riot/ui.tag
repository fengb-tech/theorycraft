require('./console.tag')
require('./combat.tag')
require('./hero.tag')
require('./inspect.tag')

<ui>
  <console />
  <combat />
  <hero hero={ opts.game.hero } />
  <inspect />
</ui>
