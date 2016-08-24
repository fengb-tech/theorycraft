const { TYPES } = require('lib/core/stats')

<stats>
  <pair each={ type in types }
       title={ type }
       value={ parent.opts.stats[type] } />

  <script>
    this.types = TYPES
  </script>
</stats>
