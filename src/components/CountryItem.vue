<template>
  <div>
    <LoaderCustom v-if="loading" />

    <div v-else :class="{ country: code }">
      <h2 class="green">
        {{ country.name }} <span>{{ country.emoji }}</span>
      </h2>

      <ul>
        <li class="group">
          <span class="label">Capitale : </span>
          <span v-if="country.capital" class="green">{{ country.capital }}</span>
          <span v-else class="none">Aucune</span>
        </li>
        <li class="group">
          <span class="label">Monnaie(s) : </span>
          <ul v-if="country.currencies && country.currencies[0] !== ''" class="list">
            <li
              class="list-item"
              v-for="(currency, index) in country.currencies"
              :key="index"
              v-html="getCurrency(currency)"
            ></li>
          </ul>
          <span v-else class="none">Aucune</span>
        </li>
        <li class="group">
          <span class="label">Langue(s) : </span>
          <ul v-if="country.languages.length" class="list">
            <li  class="list-item" v-for="(lang, index) in country.languages" :key="index">
              {{ lang.name }}
            </li>
          </ul>
          <span v-else class="none">Aucune</span>
        </li>
        <li>
          <span class="label">Préfixe(s) téléphonique(s) : </span>
          <ul v-if="country.phones.length" class="list">
            <li class="list-item" v-for="(phone, index) in country.phones" :key="index">
              {{ phone }}
            </li>
          </ul>
          <span v-else class="none">Aucun</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import data from '@/data/currency.json'
import LoaderCustom from '@/components/LoaderCustom.vue';

export default {
  components: {
    LoaderCustom
  },
  props: ['code'],
  data() {
    return {
      country: '',
      loading: 0
    }
  },
  apollo: {
    country: {
      query: gql`
      query getCountry($code: ID!) {
        country(code: $code) {
          name(lang: "fr")
          capital
          emoji
          currencies
          languages {
            name
          }
          phones
        }
      }`,
      variables() {
        return {
          code: this.code
        }
      }
    }
  },
  methods: {
    getCurrency(currency) {
      if (data[currency]) {
        const symbol = (data[currency].symbol) ? ' - <span class="green">' + data[currency].symbol + '</span>' : ''
        return data[currency].name + symbol
      } else {
        return currency
      }
    }
  }
}
</script>

<style scoped>
.country {
  padding: 1rem;
  border: 1px solid var(--color-border-hover);
  border-radius: 12px;
}

h2 {
  display: flex;
  justify-content: space-between;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.group {
  margin-bottom: 0.4rem;

  &:first-of-type {
    margin-top: 0.5rem;
  }
}

.list-item {
  margin-left: 0.3rem;

  &::before {
    width: 6px;
    height: 6px;
    margin-right: 0.5rem;
    margin-bottom: 2px;
    display: inline-block;
    content: '';
    background-color: var(--color-text-highlight);
    border-radius: 50%;
  }
}

.label {
  color: var(--color-text-light);
  font-size: 14px;
}

.green {
  font-weight: bold;
}

.none {
  color: var(--color-text-light);
  font-size: 13px;
  font-style: italic;
}
</style>
