import RenderManager from "sap/ui/core/RenderManager";
import BaseChart from "./BaseChart";

export default {
  apiVersion: 2,

  render: function (rm: RenderManager, control: BaseChart) {
    rm.openStart("div", control);
    rm.class("chart-container");

    if (control.getCssClass()) {
      rm.class(control.getCssClass());
    }

    rm.style("height", control.getHeight());
    rm.style("width", control.getWidth());
    rm.style("position", "relative");

    rm.style("min-height", "200px");
    rm.style("max-height", "600px");

    rm.style("min-width", "200px");
    rm.style("max-width", "600px");

    rm.openEnd();

    rm.openStart("canvas");
    rm.class("openui5-base-chartjs");
    rm.openEnd();
    rm.close("canvas");

    rm.close("div");
  },
};
