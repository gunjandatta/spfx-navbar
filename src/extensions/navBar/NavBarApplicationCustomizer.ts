import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'NavBarApplicationCustomizerStrings';

import { Components } from "gd-sprest-bs";

const LOG_SOURCE: string = 'NavBarApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INavBarApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NavBarApplicationCustomizer
  extends BaseApplicationCustomizer<INavBarApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Handle possible changes on the existence of placeholders
    this.context.placeholderProvider.changedEvent.add(this, this.renderNavbars);

    // Render the navbars
    this.renderNavbars();

    return Promise.resolve();
  }

  // Global Variables
  private _footer: PlaceholderContent = null;
  private _header: PlaceholderContent = null;

  // Method to render the nav bars
  private renderNavbars() {
    // See if the header doesn't exist
    if (!this._header) {
      // Create the header
      this._header = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);

      // Render the top navbar
      Components.Navbar({
        brand: "Organization XYZ",
        el: this._header.domElement,
        items: [
          { text: "News", items: [{ text: "Link 1" }, { text: "Link 2" }, { text: "Link 3" }] },
          { text: "Projects", items: [{ text: "Link 1" }, { text: "Link 2" }, { text: "Link 3" }] },
          { text: "Misc", items: [{ text: "Link 1" }, { text: "Link 2" }, { text: "Link 3" }] }
        ],
        searchBox: {
          placeholder: "My Custom Search"
        }
      });
    }

    // See if the footer doesn't exist
    if (!this._footer) {
      // Create the footer
      this._footer = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);

      // Render the bottom navbar
      Components.Navbar({
        brand: "Organization XYZ",
        el: this._footer.domElement
      });
    }
  }
}
