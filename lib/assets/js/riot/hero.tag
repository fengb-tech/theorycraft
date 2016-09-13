require('./pair.tag')
require('./equipment.tag')
require('./backpack.tag')

const { TYPES } = require('lib/core/stats')

<hero>
  <div class='hero-base'>
    <pair title='Level' value={ opts.hero.base.level } />
    <pair title='XP' value={ opts.hero.base.xp } />
    <pair title='Gold' value={ opts.hero.gold } />
    <pair each={ type in types }
         title={ type }
         value={ parent.opts.hero.base.stats[type]} + ${parent.opts.hero.equipment.stats[type]} = ${parent.opts.hero.stats[type]}` } />
  </div>
  <equipment equipment={opts.hero.equipment} />
  <backpack backpack={opts.hero.backpack} />

  <style scoped>
    :scope {
      display: flex;
      flex-direction: row;
    }

    > .hero-base, > equipment, > backpack {
      flex: 1 1 auto;
    }
  </style>

  <script>
    this.types = TYPES
    this.opts.hero.on('change', () => this.update())
  </script>
</hero>
