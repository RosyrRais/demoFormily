import React from 'react';
import { TextArea } from '@douyinfe/semi-ui';
import { observer } from '@formily/react';
import { Form } from '@formily/core';
// import { IS_PROD } from '../../../env';
interface DevShowFormilyDataProps {
  form: Form;
  title?: string;
  rows?: number;
  dev?: boolean;
}

const IS_DEV = false;
const DevShowFormilyData: React.FC<DevShowFormilyDataProps> = ({
  form,
  title = 'Form Data',
  rows = 15,
  dev = false,
}) => {
  if (!IS_DEV && !dev) {
    return <></>;
  }
  return (
    <div style={{ marginTop: 20 }}>
      {title && (
        <div
          style={{
            marginBottom: 8,
            fontWeight: 'bold',
            fontSize: 14,
            color: 'var(--semi-color-text-1)',
          }}
        >
          {title}
        </div>
      )}
      <TextArea
        style={{
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          fontSize: 14,
          lineHeight: 1.5,
          backgroundColor: '#f8f9fa',
          border: '1px solid #e1e4e8',
        }}
        value={JSON.stringify(form.values, null, 2)}
        rows={rows}
        readOnly
        placeholder="Form data will appear here..."
      />
    </div>
  );
};

export default observer(DevShowFormilyData);
