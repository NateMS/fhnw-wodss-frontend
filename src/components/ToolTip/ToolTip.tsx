import { Component, h } from 'hyperapp';
import tippyJs, { Options } from 'tippy.js';

export const ToolTip: Component<Options> = (realProps: Options, [reference]: any) => {
  const props = { ...realProps };

  return (
    <reference.nodeName
      {...reference.attributes}
      oncreate={(element: any) => !element._tippy && tippyJs(element, props)}
      ondestroy={(element: any) => element._tippy && element._tippy.destroy()}
    >
      {reference.children}
    </reference.nodeName>
  );
};

export default ToolTip;
