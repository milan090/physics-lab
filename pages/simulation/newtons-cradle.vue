<template>
  <main>
    <SimulationPageHeader title="Newtons Cradle" />
    <TabSwitcher />
  </main>
</template>

<script>
import TabSwitcher from "../../components/TabSwitcher/TabSwitcher.component";
import SimulationPageHeader from "../../components/SimulationPageHeader";

export default {
  components: {
    TabSwitcher,
    SimulationPageHeader,
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
