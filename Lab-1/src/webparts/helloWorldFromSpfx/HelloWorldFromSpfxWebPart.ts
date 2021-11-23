import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
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
  currentTime:Date;
  IsCertified:boolean;
}



export default class HelloWorldFromSpfxWebPart extends BaseClientSideWebPart<IHelloWorldFromSpfxWebPartProps> {


  protected onInit():Promise<void>{
    console.log("Hi i am loaded !!");
    console.log(this.properties.productname);
      return new Promise<void>((resolve,_reject)=>{
          this.properties.productname="Mouse";
          this.properties.description="Mouse Description";
          this.properties.quantity=500;
          this.properties.productcost=300;

          resolve(undefined);

      });
  }

  protected get disableReactivePropertyChanges():boolean{
    return true;
  }
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.helloWorldFromSpfx }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
             <table>
             <tr>
             <td>Product Name</td>
             <td>${this.properties.productname}</td>
             </tr>
             <tr>
             <td>Description</td>
             <td>${this.properties.description}</td>
             </tr>
             <tr>
             <td>Product Cost</td>
             <td>${this.properties.productcost}</td>
             </tr>
             <tr>
             <td>Quantity</td>
             <td>${this.properties.quantity}</td>
             </tr>
             <tr>
             <td>Bill Amount</td>
             <td>${this.properties.netbillamount=this.properties.productcost*this.properties.quantity}</td>
             </tr>

             <tr>
             <td>Is Certified ?</td>
             <td>${this.properties.IsCertified}</td>
             </tr>
             </table>
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
                  PropertyPaneTextField('description', {
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
                  PropertyPaneTextField('quantity', {
                    label: "Product Quantity",
                    multiline:false,
                    resizable:false,
                    deferredValidationTime:5000,
                    placeholder:"Please enter product quantity","description":"Number property field"
                  }),
                  PropertyPaneToggle('IsCertified', {
                    label: "Is it Certified",
                    key:'IsCertified',
                    onText:'ISI Certified',
                    offText:"Not an ISI Certified Product"
                  }),
                ]
              }
            ]
          }
        ]
      };
}

}
