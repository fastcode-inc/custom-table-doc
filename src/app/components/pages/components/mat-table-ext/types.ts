import { TemplateRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
/** Column definition of grid. */
export interface MTExColumn {
    field: string;
    options?: string[];
    header?: string;
    name?: string;
    footerText?: string;
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
    sortProp?: MTExColumnSortProp;
    type: MTExColumnType;
    typeParameter?: MTExColumnTypeParameter;
    tag?: MTExColumnTag;
    buttons?: MTExColumnButton[];
    formatter?: (rowData: any, colDef?: MTExColumn) => void;
    cellTemplate?: TemplateRef<any> | null;
    headerTemplate?: TemplateRef<any> | null;
    showExpand?: boolean;
    description?: string;
    summary?: ((data: any[], colDef?: MTExColumn) => void) | string;
    class?: string;
}
export interface DisplayColumn {
    filter: boolean;
    name: string;
    show: boolean;
}
export interface RowChange {
    row: { [key: string]: any };
    index: number;
}
export interface RowSelectionChange {
    row: { [key: string]: any };
    index: number;
    isSelected: boolean;
}
export interface CellTemplateRefMap {
    [key: string]: TemplateRef<any>

}
/** Possible column type values. */
export declare type MTExColumnType = 'selection' | string | 'tag' | 'button' | 'link' | 'image' | boolean | number | 'currency' | 'percent' | 'date';
/** Column type parameter. */
export interface MTExColumnTypeParameter {
    currencyCode?: string;
    display?: string | boolean;
    digitsInfo?: string;
    format?: string;
    locale?: string;
    timezone?: string;
}
/** The properties of column sort. */
export interface MTExColumnSortProp {
    arrowPosition?: 'before' | 'after';
    disableClear?: boolean;
    id?: string;
    start?: 'asc' | 'desc';
}
export interface TooltipProp {
    value: string
    tooltipPosition?: TooltipPosition;
    tooltipTouchGestures?: 'auto' | 'on' | 'off';
    tooltipVisibility?: 'initial' | 'visible' | 'hidden';
}
export declare type TooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
/** Column tag of grid. */
export interface MTExColumnTag {
    [key: number]: MTExColumnTagValue;
    [key: string]: MTExColumnTagValue;
}
/** The properties of column tag. */
export interface MTExColumnTagValue {
    text?: string;
    color?: string;
}
/** The properties of column button. */
export interface MTExColumnButton {
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
    children?: MTExColumnButton[];
    iif?: (record: any) => boolean;
    tooltip?: string | Observable<string>;
    disabled?: boolean;
}
/** The properties of column selection item. */
export interface MTExColumnSelectionItem {
    label: string | Observable<string>;
    field: string;
    show?: boolean;
    hide?: boolean;
    disabled?: boolean;
}
/** Cell template. */
export interface MTExCellTemplate {
    [key: string]: TemplateRef<any>;
}
/** Row selection formatter. */
export interface MTExRowSelectionFormatter {
    disabled?: (rowData: any, index?: number) => boolean;
    hideCheckbox?: (rowData: any, index?: number) => boolean;
}
/** Row class formatter. */
export interface MTExRowClassFormatter {
    [className: string]: (rowData: any, index?: number) => boolean;
}
/** Column menu component. */
export interface MTExColumnMenu {
    menuPanel: MatMenu;
    menuTrigger: MatMenuTrigger;
}
/** Possible button type values. */
export declare type MTExButtonType = 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab';

export interface MTExColumnPinOption {
    label: string | Observable<string>;
    value: MTExColumnPinValue;
    selected: boolean;
    field: string;
}

export declare type MTExColumnPinValue = 'left' | 'right' | null;