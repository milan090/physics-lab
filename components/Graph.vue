<script>
import { Line, mixins } from "vue-chartjs";
import "chartjs-plugin-streaming";

const { reactiveProp } = mixins;

export default {
  name: "Graph",
  extends: Line,
  mixins: [reactiveProp],
  props: ["options"],
  mounted() {
    this.renderChart(this.chartData, {
      ...this.options,
    });
  },
};
</script>
