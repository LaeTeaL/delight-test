<template>
  <div class="loader-custom">
    <div class="loading"></div>
    <p>Chargement en cours</p>
  </div>
</template>

<style scoped>
.loader-custom {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-light);
  font-style: italic;
}

.loading {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 4px solid #0000;
  border-right-color: rgba(0, 189, 126, 0.5);
  position: relative;
  animation: load 1s infinite linear;

  &::before,
  &::after {
    position: absolute;
    content: '';
    inset: -4px;
    border-radius: 50%;
    border: inherit;
    animation: inherit;
    animation-duration: 2s;
  }

  &::after {
    animation-duration: 4s;
  }
}

@keyframes load {
  100% {
    transform: rotate(1turn);
  }
}
</style>
