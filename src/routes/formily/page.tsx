import React from 'react';
import { CreateForm } from './createForm';

const FormilyPage = (): JSX.Element => (
  <div className="container mx-auto p-8">
    <h1 className="text-3xl font-bold mb-4">Formily 示例页面</h1>
    <p className="text-gray-600">
      这是一个 Formily 页面基本模版。你可以在这里开始搭建你的表单页面。
    </p>
    <div>
      <CreateForm />
    </div>
  </div>
);

export default FormilyPage;
