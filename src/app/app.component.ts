import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { AtlasmapProvider, IAtlasmapProviderProps } from '@atlasmap/atlasmap';

@Component({
  selector: 'my-app',
  template: `Hello<span [id]="'root'"></span>`,
})
export class AppComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  public rootDomID: string = 'root';

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    return node;
  }

  protected getProps(): IAtlasmapProviderProps {
    let baseJavaInspectionServiceUrl = '/v2/atlas/java/',
      baseXMLInspectionServiceUrl = '/v2/atlas/xml/',
      baseJSONInspectionServiceUrl = '/v2/atlas/json/',
      baseCSVInspectionServiceUrl = '/v2/atlas/csv/',
      baseMappingServiceUrl = '/v2/atlas/',
      logLevel = 'info';

    return {
      baseJavaInspectionServiceUrl,
      baseXMLInspectionServiceUrl,
      baseJSONInspectionServiceUrl,
      baseCSVInspectionServiceUrl,
      baseMappingServiceUrl,
      logLevel,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(
        React.createElement(`${AtlasmapProvider}`, this.getProps()),
        this.getRootDomNode()
      );
    }
  }

  ngOnInit() {
    console.log(this.rootDomID);
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
}
