<template>
  <main>
    <h1 class="title gradient">Newtons Cradle</h1>
    <TabSwitcher />
  </main>
</template>

<script>
import TabSwitcher from "../../components/TabSwitcher/TabSwitcher.component";

export default {
  components: {
    TabSwitcher,
  },
  data() {
    return {
      activeTab: "SIMULATION",
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 2rem;
}
</style>
