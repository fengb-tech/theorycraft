const DEATH = '(x_x)'

<combat-hp>
  <dt class={ barClasses() }
      style={ barStyle() }
      />
  <dt class='combat-hp-name'>{ opts.title }</dt>
  <dd class='combat-hp-value'>{ hp() }</dd>

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

    this.barClasses = () => {
      let hp = this.hp()
      if (hp === 10000) {
        return 'combat-hp-bar recover'
      } else {
        return 'combat-hp-bar'
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
