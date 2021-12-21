import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { AtlasmapProvider } from '@atlasmap/atlasmap';

@Component({
  selector: 'my-app',
  template: '<span [id]="rootDomID"></span>',
})
export class AppComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): any {
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
        React.createElement(AtlasmapProvider, this.getProps()),
        this.getRootDomNode()
      );
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
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
