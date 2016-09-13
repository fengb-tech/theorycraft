const DEATH = '(x_x)'

<combat-hp>
  <dt class='combat-hp-bar'
      style={ barStyle() }
      />
  <dt class='combat-hp-name'>{ opts.title }</dt>
  <dd class='combat-hp-value'>{ hp() }</dd>

  <style scoped>
    :scope {
      display: block;
      position: relative;
      background-color: lightgray;
    }

    .combat-hp-bar {
      position: absolute;
      background-color: red;
      left: 0;
      top: 0;
      bottom: 0;
    }

    .combat-hp-name {
      position: relative;
      z-index: 1;
    }

    .combat-hp-value {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
    }
  </style>

  <script>
    this.on('mount', () => {
      this.opts.simulation.on(`hp.${this.opts.character}`, () => {
        this.update()
      })
    })

    this.hp = () => {
      let simulation = this.opts.simulation
      if (simulation) {
        if (simulation.isAlive(this.opts.character)) {
          return simulation.hps[this.opts.character]
        } else {
          return DEATH
        }
      }
    }

    this.barStyle = () => {
      let hp = this.hp()
      if (hp == null) {
        return 'width: 100%'
      } else if (hp === DEATH) {
        return 'width: 0'
      }

      let totalHp = 10000
      return `width: ${Math.round(100 * hp / totalHp)}%`
    }
  </script>
</combat-hp>
