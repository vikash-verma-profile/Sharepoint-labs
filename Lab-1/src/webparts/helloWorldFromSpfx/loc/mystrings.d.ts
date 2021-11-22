declare interface IHelloWorldFromSpfxWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'HelloWorldFromSpfxWebPartStrings' {
  const strings: IHelloWorldFromSpfxWebPartStrings;
  export = strings;
}
