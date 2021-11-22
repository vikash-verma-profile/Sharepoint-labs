import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldFromSpfxWebPart.module.scss';
import * as strings from 'HelloWorldFromSpfxWebPartStrings';

export interface IHelloWorldFromSpfxWebPartProps {
  description: string;
  productname:string;
  productcost:number;
  quantity:number;
  dicount:number;
  netbillamount:number;
}



export default class HelloWorldFromSpfxWebPart extends BaseClientSideWebPart<IHelloWorldFromSpfxWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.helloWorldFromSpfx }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to Vikash!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         header: {
  //           description: strings.PropertyPaneDescription
  //         },
  //         groups: [
  //           {
  //             groupName: strings.BasicGroupName,
  //             groupFields: [
  //               PropertyPaneTextField('description', {
  //                 label: strings.DescriptionFieldLabel
  //               })
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   };
  // }
protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return{
        pages: [
          {
            groups: [
              {
                groupName: "Product Details",
                groupFields: [
                  PropertyPaneTextField('productname', {
                    label: "Product Name",
                    multiline:false,
                    resizable:false,
                    deferredValidationTime:5000,
                    placeholder:"Please enter product name","description":"Name property field"
                  }),
                  PropertyPaneTextField('productdescription', {
                    label: "Product Description",
                    multiline:true,
                    resizable:false,
                    deferredValidationTime:5000,
                    placeholder:"Please enter product Description","description":"Name property field"
                  }),
                    PropertyPaneTextField('productcost', {
                    label: "Product Cost",
                    multiline:false,
                    resizable:false,
                    deferredValidationTime:5000,
                    placeholder:"Please enter product Cost","description":"Number property field"
                  }),
                ]
              }
            ]
          }
        ]
      };
}

}
