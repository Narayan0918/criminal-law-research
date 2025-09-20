// client/types/react-quill.d.ts

declare module 'react-quill' {
  import React from 'react';

  interface ReactQuillProps {
    value?: string;
    onChange?: (content: string, delta: any, source: string, editor: any) => void;
    theme?: string;
    className?: string;
    // Add any other props you might use here
  }

  const ReactQuill: React.ComponentType<ReactQuillProps>;
  export default ReactQuill;
}