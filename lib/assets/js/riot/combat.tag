require('./combat-hp.tag')
const pubsub = require('../controllers/pubsub')

<combat>
  <div if={ combat }>
    <combat-hp title='Hero' simulation={ combat.simulation } character={ combat.hero } />
    <combat-hp each={ enemy in combat.enemies } title='Enemy' simulation={ parent.combat.simulation } character={ enemy } />
  </div>

  <script>
    pubsub.on('combat', (combat) => {
      this.combat = combat
      this.update()
    })
  </script>
</combat>
