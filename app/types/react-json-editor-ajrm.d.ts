declare module 'react-json-editor-ajrm' {
  import * as React from 'react';

  export interface JSONEditorOnChangePayload {
    plainText: string;
    markupText: string;
    json: string;
    jsObject: any;
    lines: number | false;
    error: false | { token: number; line: number; reason: string };
  }

  export interface JSONEditorColors {
    default?: string;
    string?: string;
    number?: string;
    colon?: string;
    keys?: string;
    keys_whiteSpace?: string;
    primitive?: string;
    error?: string;
    background?: string;
    background_warning?: string;
  }

  export interface JSONEditorStyles {
    outerBox?: React.CSSProperties;
    container?: React.CSSProperties;
    warningBox?: React.CSSProperties;
    errorMessage?: React.CSSProperties;
    body?: React.CSSProperties;
    labelColumn?: React.CSSProperties;
    labels?: React.CSSProperties;
    contentBox?: React.CSSProperties;
  }

  export interface JSONEditorProps {
    id?: string;
    placeholder?: object | any[];
    theme?: string;
    locale?: any;
    colors?: JSONEditorColors;
    style?: JSONEditorStyles;
    height?: string;
    width?: string;
    onChange?: (payload: JSONEditorOnChangePayload) => void;
    onBlur?: (payload: JSONEditorOnChangePayload) => void;
    viewOnly?: boolean;
    onKeyPressUpdate?: boolean;
    waitAfterKeyPress?: number;
    confirmGood?: boolean;
    reset?: boolean;
    error?: { token: number; line: number; reason: string } | boolean;
    modifyErrorText?: (reason: string) => string;
  }

  export default class JSONEditor extends React.Component<JSONEditorProps> {}
}

declare module 'react-json-editor-ajrm/locale/en' {
  const locale: any;
  export default locale;
}

