import React from 'react';
import { Space, Alert } from 'antd';

export const Error = ({ error }) => {
  return (
    <Space
      style={{ width: '50%', marginTop: 50, position: 'absolute', left: '20%', alignItems: 'center', height: 100 }}
      direction="vertical"
      wrapperClassName="search-form-wrapper"
    >
      <Alert message={`Error ${error}`} type="error" showIcon />
    </Space>
  );
};
