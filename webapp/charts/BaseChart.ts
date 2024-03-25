import Control from "sap/ui/core/Control";
import type { MetadataOptions } from "sap/ui/core/Element";
import BaseChartRenderer from "./BaseChartRenderer";
import { Chart } from "chart.js/auto";
import Log from "sap/base/Log";

/**
 * @name com.unitrade.crm.charts.BaseChart
 */
export default class BaseChart extends Control {
  private _ctx: HTMLCanvasElement;
  private _chart: Chart = undefined;
  private _logger = Log.getLogger("com.unitrade.crm.charts.BaseChart");

  // The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
  constructor(idOrSettings?: string | $BaseChartSettings);
  constructor(id?: string, settings?: $BaseChartSettings);
  constructor(id?: string, settings?: $BaseChartSettings) {
    super(id, settings);
  }

  static readonly metadata: MetadataOptions = {
    properties: {
      cssClass: {
        type: "string",
        group: "Appearance",
      },
      chartType: {
        type: "string",
        group: "Appearance",
        defaultValue: "null",
      },
      datasets: {
        type: "object[]",
        group: "Data",
        bindable: true,
        defaultValue: [],
      },
      labels: {
        type: "string[]",
        group: "Data",
        bindable: true,
        defaultValue: [],
      },
      height: {
        type: "string",
        group: "Appearance",
        defaultValue: "100%",
      },
      width: {
        type: "string",
        group: "Appearance",
        defaultValue: "100%",
      },
      maintainAspectRatio: {
        type: "boolean",
        group: "Appearance",
        defaultValue: false,
      },
    },
  };

  onAfterRendering(oEvent: JQuery.Event): void {
    const div = document.getElementById(this.getId()) as HTMLDivElement;
    this._ctx = div.getElementsByTagName("canvas")[0];

    const labels = this.getLabels();
    const datasets = this.getDatasets();

    if (this._chart) {
      this._chart.destroy();
      this._chart = undefined;
    }
    if (labels.length === 0 && datasets.length === 0) return;

    this._chart = new Chart(this._ctx, {
      type: this.getChartType() as any,
      options: {
        maintainAspectRatio: this.getMaintainAspectRatio(),
      },
      data: {
        labels: labels,
        datasets: datasets,
      },
    });
  }

  exit(): void {
    this._logger.debug("destroying chart");
    if (this._chart) {
      this._chart.destroy();
      this._chart = undefined;
    }
  }

  static renderer: typeof BaseChartRenderer = BaseChartRenderer;
}
