<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md6
      >
        <form>
          <v-text-field
            v-model="stockCode"
            :error-messages="stockCodeErrors"
            :counter="10"
            label="股票代码"
            required
            @input="$v.stockCode.$touch()"
            @blur="$v.stockCode.$touch()"
          />
          <v-text-field
            v-model="stockName"
            :error-messages="stockCodeErrors"
            label="股票名称"
            required
            @input="$v.stockName.$touch()"
            @blur="$v.stockName.$touch()"
          />
          <v-btn
            color="success"
            @click="submit">submit</v-btn>
          <v-btn
            color="error"
            @click="clear">clear</v-btn>
        </form>
      </v-flex>
      <v-flex
        md6
      >
        <ve-line :data="chartData"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, stockName } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    stockCode: { required, maxLength: maxLength(10) },
    stockName: { required, stockName },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data () {
    return {
      chartData: {
        columns: ['date', 'cost', 'profit', 'growthRate', 'people'],
        rows: [
          { 'cost': 1523, 'date': '01/01', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
          { 'cost': 1223, 'date': '01/02', 'profit': 1523, 'growthRate': 0.345, 'people': 100 },
          { 'cost': 2123, 'date': '01/03', 'profit': 1523, 'growthRate': 0.7, 'people': 100 },
          { 'cost': 4123, 'date': '01/04', 'profit': 1523, 'growthRate': 0.31, 'people': 100 },
          { 'cost': 3123, 'date': '01/05', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
          { 'cost': 7123, 'date': '01/06', 'profit': 1523, 'growthRate': 0.65, 'people': 100 }
        ]
      },
      stockCode: '',
      stockName: ''
    }
  },
  computed: {
    stockCodeErrors () {
      const errors = []
      if (!this.$v.stockCode.$dirty) return errors
      !this.$v.stockCode.maxLength && errors.push('stockCode must be at most 10 characters long')
      !this.$v.stockCode.required && errors.push('stockCode is required.')
      return errors
    }
  },
  methods: {
    submit () {
      let data = { stockCode: this.stockCode, stockName: this.stockName }
      this.$http({
        method: 'get',
        url: '/api/stock/info',
        params: data
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        alert(error)
      })
    },
    clear () {
      this.$v.$reset()
      this.stockCode = ''
      this.stockName = ''
    }
  }
}
</script>
