import { TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
/** Column definition of grid. */
export interface MtxGridColumn {
    field: string;
    options?: string[] ;
    header?: string ;
    name?: string;
    headerTooltip?: TooltipProp;
    cellTooltip?: TooltipProp;
    hide?: boolean;
    disabled?: boolean;
    pinned?: 'left' | 'right';
    left?: string;
    right?: string;
    width?: string;
    resizable?: boolean;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean | string;
    sortProp?: MtxGridColumnSortProp;
    type: MtxGridColumnType;
    typeParameter?: MtxGridColumnTypeParameter;
    tag?: MtxGridColumnTag;
    buttons?: MtxGridColumnButton[];
    formatter?: (rowData: any, colDef?: MtxGridColumn) => void;
    cellTemplate?: TemplateRef<any> | null;
    showExpand?: boolean;
    description?: string;
    summary?: ((data: any[], colDef?: MtxGridColumn) => void) | string;
    class?: string;
}
export interface DisplayColumn {
    filter: boolean;
    name: string;
    show: boolean;
}
export interface RowChange {
    row: { [key: string]: any};
    index: number;
}
export interface RowSelectionChange {
    row: { [key: string]: any};
    index: number;
    isSelected: boolean;
}
/** Possible column type values. */
export declare type MtxGridColumnType ='selection' | string | 'tag' | 'button' | 'link' | 'image' | boolean | number | 'currency' | 'percent' | 'date';
/** Column type parameter. */
export interface MtxGridColumnTypeParameter {
    currencyCode?: string;
    display?: string | boolean;
    digitsInfo?: string;
    format?: string;
    locale?: string;
    timezone?: string;
}
/** The properties of column sort. */
export interface MtxGridColumnSortProp {
    arrowPosition?: 'before' | 'after';
    disableClear?: boolean;
    id?: string;
    start?: 'asc' | 'desc';
}
export interface TooltipProp {
    value: string
    tooltipPosition?: TooltipPosition;
    tooltipTouchGestures?:'auto' | 'on' | 'off';
    tooltipVisibility? : 'initial' | 'visible' | 'hidden';
}
export declare type TooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
/** Column tag of grid. */
export interface MtxGridColumnTag {
    [key: number]: MtxGridColumnTagValue;
    [key: string]: MtxGridColumnTagValue;
}
/** The properties of column tag. */
export interface MtxGridColumnTagValue {
    text?: string;
    color?: string;
}
/** The properties of column button. */
export interface MtxGridColumnButton {
    type?: 'basic' | 'icon';
    text?: string | Observable<string>;
    icon?: string;
    color?: ThemePalette;
    class?: string;
    click?: (record: any) => void;
    pop?: boolean;
    popTitle?: string | Observable<string>;
    popDescription?: string | Observable<string>;
    popOkColor?: ThemePalette;
    popOkText?: string | Observable<string>;
    popCloseColor?: ThemePalette;
    popCloseText?: string | Observable<string>;
    children?: MtxGridColumnButton[];
    iif?: (record: any) => boolean;
    tooltip?: string | Observable<string>;
    disabled?: boolean;
}
/** The properties of column selection item. */
export interface MtxGridColumnSelectionItem {
    label: string | Observable<string>;
    field: string;
    show?: boolean;
    hide?: boolean;
    disabled?: boolean;
}
/** Cell template. */
export interface MtxGridCellTemplate {
    [key: string]: TemplateRef<any>;
}
/** Row selection formatter. */
export interface MtxGridRowSelectionFormatter {
    disabled?: (rowData: any, index?: number) => boolean;
    hideCheckbox?: (rowData: any, index?: number) => boolean;
}
/** Row class formatter. */
export interface MtxGridRowClassFormatter {
    [className: string]: (rowData: any, index?: number) => boolean;
}
/** Column menu component. */
export interface MtxGridColumnMenu {
    menuPanel: MatMenu;
    menuTrigger: MatMenuTrigger;
}
/** Possible button type values. */
export declare type MtxGridButtonType = 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab';

export interface MtxGridColumnPinOption {
    label: string | Observable<string>;
    value: MtxGridColumnPinValue;
    selected: boolean;
    field: string;
}

export declare type MtxGridColumnPinValue = 'left' | 'right' | null;