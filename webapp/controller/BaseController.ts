import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Router from "sap/ui/core/routing/Router";
import JSONModel from "sap/ui/model/json/JSONModel";
import Control from "sap/ui/core/Control";
import Fragment from "sap/ui/core/Fragment";
import Log from "sap/base/Log";

/**
 * @namespace com.unitrade.crm.controller
 */
export default abstract class BaseController extends Controller {
  private _fragments: { [key: string]: Control } = {};

  protected oLogger = Log.getLogger("com.unitrade.crm.controller.BaseController");

  protected async getFragment(sFragmentName: string, options: { addDependant?: boolean } = {}): Promise<Control> {
    options = { addDependant: false, ...options };

    let pFragment = this._fragments[sFragmentName];
    if (!pFragment) {
      pFragment = <Control>await this.loadFragment({ name: "com.unitrade.crm.fragments." + sFragmentName, addToDependents: options.addDependant });
      this._fragments[sFragmentName] = pFragment;
    }

    return pFragment;
  }

  public async getTitle(): Promise<string> {
    return await Promise.resolve("Unitrade CRM");
  }

  public getisNavBackEnabled(): Promise<boolean> {
    return Promise.resolve(true);
  }

  private getGlobal(): JSONModel {
    return super.getOwnerComponent().getModel("global") as JSONModel;
  }

  protected getVersion(): JSONModel {
    return super.getOwnerComponent().getModel("version") as JSONModel;
  }

  /**
   * Convenience method for accessing the component of the controller's view.
   * @returns The component of the controller's view
   */
  public getOwnerComponent(): AppComponent {
    return super.getOwnerComponent() as AppComponent;
  }

  /**
   * Convenience method to get the components' router instance.
   * @returns The router instance
   */
  public getRouter(): Router {
    return UIComponent.getRouterFor(this);
  }

  /**
   * Convenience method for getting the i18n resource bundle of the component.
   * @returns The i18n resource bundle of the component
   */
  public getResourceBundle(): ResourceBundle | Promise<ResourceBundle> {
    const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
    return oModel.getResourceBundle();
  }

  /**
   * Convenience method for getting the view model by name in every controller of the application.
   * @param [sName] The model name
   * @returns The model instance
   */
  public getModel(sName?: string): Model {
    return this.getView().getModel(sName);
  }

  /**
   * Convenience method for setting the view model in every controller of the application.
   * @param oModel The model instance
   * @param [sName] The model name
   * @returns The current base controller instance
   */
  public setModel(oModel: Model, sName?: string): BaseController {
    this.getView().setModel(oModel, sName);
    return this;
  }

  /**
   * Convenience method for triggering the navigation to a specific target.
   * @public
   * @param sName Target name
   * @param [oParameters] Navigation parameters
   * @param [bReplace] Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
   */
  public navTo(sName: string, oParameters?: object, bReplace?: boolean): void {
    this.getRouter().navTo(sName, oParameters, undefined, bReplace);
  }

  public async getTranslatedString(key: string) {
    const resourceModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
    const resourceBundle = await resourceModel.getResourceBundle();
    return resourceBundle.getText(key);
  }

  public async setTitle(): Promise<void> {
    const title: string = await this.getTitle();
    this.oLogger.info(`setting title to '${title}'`);
    this.getGlobal().setProperty("/title", title);
  }

  public async setNavButtonEnabled(): Promise<void> {
    const isNavBackEnabled: boolean = await this.getisNavBackEnabled();
    this.oLogger.info(`setting nav back enabled to ${isNavBackEnabled}`);
    this.getGlobal().setProperty("/isNavBackEnabled", isNavBackEnabled);
  }

  // overide this to call own method on back button
  public navBackFunc: () => void = null;

  protected getUrlSearchParameters() {
    const [_, query] = window.location.hash.split("?");
    return new URLSearchParams(query ?? "");
  }
}
