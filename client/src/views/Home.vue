<template>
  <div class="home grid grid-cols-10 h-screen">
    <aside class="col-span-2 border-2 border-yellow-400 flex flex-col">
      <div class="profile h-24 lg:h-32 border-2 border-blue-400"></div>
      <div class="category flex-grow border-2 border-blue-400"></div>
      <div class="add h-14 border-2 border-blue-400"></div>
    </aside>
    <div class="col-span-8 border-2 border-yellow-400">
      <nav class="profile h-24 lg:h-32 border-2 border-indigo-400">书库</nav>
      <main>
        <section>
          <h3>在读</h3>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
};
</script>
