<template>
  <div class="card-wrapper">
    <h2 class="title">Erreur(s) :</h2>
    <ul class="list">
      <li v-for="(error, index) in errors" :key="index" class="item error">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['errors']
}
</script>

<style scoped>
.card-wrapper {
  max-width: var(--card-width);
  padding: 0.4rem 0.2rem;
  color: var(--color-error);
  border: solid var(--color-error-light);
  border-width: 3px 0;
  border-radius: 6px;
}

.title {
  text-align: center;
}

.error {
  margin-bottom: 0.3rem;
  font-size: 13px;
  font-style: italic;

  &::before {
    margin-right: 0.3rem;
    background-color: var(--color-error-light);
  }
}
</style>
