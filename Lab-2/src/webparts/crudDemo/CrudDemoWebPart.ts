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
import { ISoftwareListItems } from './ISoftwareListItems';

export interface ICrudDemoWebPartProps {
  description: string;
}

export default class CrudDemoWebPart extends BaseClientSideWebPart<ICrudDemoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div>
    <table border="1">
    <tr>
    <td>Please enter software ID
    </td>
    <td><input type="text" id="txtid">
    </td>
    <td><input type="submit" id="btnRead" value="Read Details" />
    </td>
    </tr>

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
    <input type="Submit" value="Update Item" id="btnUpdate" />
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
    this.domElement.querySelector("#btnRead").addEventListener('click',()=>{
      this.readListData();
    });
    this.domElement.querySelector("#btnUpdate").addEventListener('click',()=>{
      this.updateListItem();
    });
  }

private updateListItem(){
  var softwareTitle=document.getElementById('txtSoftwareTitle')["value"];
  var softwareName=document.getElementById('txtSoftwareName')["value"];
  var Id=document.getElementById('txtid')["value"];
  const Url:string=this.context.pageContext.site.absoluteUrl+"/_api/web/lists/getbytitle('SoftwareList')/Items("+Id+")";
  const itemBody:any={
    "SoftwareTitle":softwareTitle,
    "SoftwareName":softwareName
  }
  const headers:any={
    "X-HTTP-Method":"MERGE",
    "IF-MATCH":"*"
  }
  const spHttpClientOptions:ISPHttpClientOptions={
    "headers":headers,
    "body":JSON.stringify(itemBody)
  }

  this.context.spHttpClient.post(Url,SPHttpClient.configurations.v1,spHttpClientOptions).then(
    (response:SPHttpClientResponse)=>{
      if(response.status===204){
        console.log("Updated");
      }
      else{
        console.log("Some error have Ocuured");
      }
    }
  );
}

  private readListData():void{
    let id:string=document.getElementById("txtid")["value"];
    this._getListItemByID(id).then(listitem=>{
     document.getElementById('txtSoftwareTitle')["value"]=listitem.SoftwareTitle;
     document.getElementById('txtSoftwareName')["value"]=listitem.SoftwareName;
    });

  }

  private _getListItemByID(Id:string):Promise<ISoftwareListItems>{
    const url:string=this.context.pageContext.site.absoluteUrl+"/_api/web/lists/getbytitle('SoftwareList')/Items?$filter=ID eq "+Id;
    return this.context.spHttpClient.get(url,SPHttpClient.configurations.v1).then((response:SPHttpClientResponse)=>{
      return response.json();
    }).then((listItems:any)=>{
      const item:any=listItems.value[0];
      const listItem:ISoftwareListItems=item as ISoftwareListItems;
      return listItem;
    }) as Promise<ISoftwareListItems>;
  }

  //send data to sharepoint
  private addListItem(){
    var softwareTitle=document.getElementById('txtSoftwareTitle')["value"];
    var softwareName=document.getElementById('txtSoftwareName')["value"];

    console.log(softwareTitle);
    console.log("-----------");
    console.log(softwareName);
    console.log(this.context.pageContext.site.absoluteUrl);
    const siteUrl:string=this.context.pageContext.site.absoluteUrl+"/_api/web/lists/GetByTitle('SoftwareList')/items";
    const itemBody:any={
      "SoftwareTitle":softwareTitle,
      "SoftwareName":softwareName
    }
    // const itemBody:any={
    //   "Title":softwareTitle,
    //   "Name":softwareName
    // }

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
