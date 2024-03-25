import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { $ControlSettings } from "sap/ui/core/Control";

declare module "./BaseChart" {

    /**
     * Interface defining the settings object used in constructor calls
     */
    interface $BaseChartSettings extends $ControlSettings {
        cssClass?: string | PropertyBindingInfo;
        chartType?: string | PropertyBindingInfo;
        datasets?: object[] | PropertyBindingInfo | `{${string}}`;
        labels?: string[] | PropertyBindingInfo | `{${string}}`;
        height?: string | PropertyBindingInfo;
        width?: string | PropertyBindingInfo;
        maintainAspectRatio?: boolean | PropertyBindingInfo | `{${string}}`;
    }

    export default interface BaseChart {

        // property: cssClass
        getCssClass(): string;
        setCssClass(cssClass: string): this;

        // property: chartType
        getChartType(): string;
        setChartType(chartType: string): this;

        // property: datasets
        getDatasets(): object[];
        setDatasets(datasets: object[]): this;
        bindDatasets(bindingInfo: PropertyBindingInfo): this;
        unbindDatasets(): this;

        // property: labels
        getLabels(): string[];
        setLabels(labels: string[]): this;
        bindLabels(bindingInfo: PropertyBindingInfo): this;
        unbindLabels(): this;

        // property: height
        getHeight(): string;
        setHeight(height: string): this;

        // property: width
        getWidth(): string;
        setWidth(width: string): this;

        // property: maintainAspectRatio
        getMaintainAspectRatio(): boolean;
        setMaintainAspectRatio(maintainAspectRatio: boolean): this;
    }
}
