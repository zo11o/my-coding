var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    publish: '2020-08-05 14:54:00'
  },
  template: `
    <div>
      <div>
        {{message}}
      </div>
      <div>
        <button @click="reverseMessage">reverse</button>
      </div>
    </div>
  `,
  created() {
    console.log(this.$options.data())
  },
  updated() {
    console.log(this.$data)
    console.log(this.$options.data.call(this))
  },
  methods: {
    reverseMessage () {
      console.log(this.message)
      this.message = this.message.split('').reverse().join('');
    }
  }
})
