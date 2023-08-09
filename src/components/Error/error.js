import React from 'react';
import { Space, Alert } from 'antd';

export const Error = () => {
  return (
    <Space
      style={{ width: '50%', marginTop: 50, position: 'absolute', left: '25%', alignItems: 'center', height: 100 }}
      direction="vertical"
      wrapperClassName="search-form-wrapper"
    >
      <Alert message={'Something has gone wrong... Please try again later'} type="error" showIcon />
    </Space>
  );
};
