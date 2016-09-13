require('./combat-hp.tag')
const pubsub = require('../controllers/pubsub')

<combat if={ combat }>
  <combat-hp title='Hero' simulation={ combat.simulation } character={ combat.hero } />
  <combat-hp each={ enemy in combat.enemies } title='Enemy' simulation={ parent.combat.simulation } character={ enemy } />

  <style scoped>
    :scope {
      display: flex;
    }

    combat-hp {
      flex: 1 1 auto;
      margin: 0 6px;
    }
  </style>

  <script>
    pubsub.on('combat', (combat) => {
      this.combat = combat
      this.update()
    })
  </script>
</combat>
