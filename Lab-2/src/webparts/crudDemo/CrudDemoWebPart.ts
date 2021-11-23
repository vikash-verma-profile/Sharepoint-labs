import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CrudDemoWebPart.module.scss';
import * as strings from 'CrudDemoWebPartStrings';

import {ISPHttpClientOptions,SPHttpClient,SPHttpClientResponse} from '@microsoft/sp-http';

export interface ICrudDemoWebPartProps {
  description: string;
}

export default class CrudDemoWebPart extends BaseClientSideWebPart<ICrudDemoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div>
    <table border="1">
    <tr>
    <td>Software Title
    </td>
    <td><input type="text" id="txtSoftwareTitle">
    </td>
    </tr>
    <tr>
    <td>Software Name
    </td>
    <td><input type="text" id="txtSoftwareName">
    </td>
    </tr>
    <tr>
    <td>
    <input type="Submit" value="Insert Item" id="btnSubmit" />
    </td>
    </tr>
    </table>
    </div>
     `;
     this._bindEvents();
  }


  private _bindEvents():void{
    this.domElement.querySelector("#btnSubmit").addEventListener('click',()=>{
      this.addListItem();
    });
  }

  private addListItem(){
    var softwareTitle=document.getElementById('txtSoftwareTitle')["value"];
    var softwareName=document.getElementById('txtSoftwareName')["value"];

    console.log(softwareTitle);
    console.log("-----------");
    console.log(softwareName);
    console.log(this.context.pageContext.site.absoluteUrl);
    const siteUrl:string=this.context.pageContext.site.absoluteUrl+"/_api/web/lists/GetByTitle('SampleList')/items";
    // const itemBody:any={
    //   "SoftwareTitle":softwareTitle,
    //   "SoftwareName":softwareName
    // }
    const itemBody:any={
      "Title":softwareTitle,
      "Name":softwareName
    }

    const spHttpClientOptions:ISPHttpClientOptions={
      "body":JSON.stringify(itemBody)
    }

    this.context.spHttpClient.post(siteUrl,SPHttpClient.configurations.v1,spHttpClientOptions).then((response:SPHttpClientResponse)=>{
      if(response.status===201){
        console.log("data saved");
      }
      else{
        console.log("some error  have come");
      }
     
    })
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
