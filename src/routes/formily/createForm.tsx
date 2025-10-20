import { easyCreateForm } from '@byted/easy-formily';
import { SchemaField } from './createField';
import { FormProvider } from '@formily/react';
import DevShowFormilyData from '@/component/DevShowFormilyData/DevShowFormilyData';

export const CreateForm = () => {
  const form = easyCreateForm();

  return (
    <>
      <FormProvider form={form}>
        <SchemaField form={form}>
          <SchemaField.Void
            name="card"
            x-decorator="Card"
            x-component="FormLayout"
            x-component-props={{ labelWidth: 160, wrapperWidth: 500 }}
          >
            <SchemaField.String
              name="username"
              title="用户名称"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.Number
              name="age"
              title="年龄"
              x-decorator="FormItem"
              x-component="InputNumber"
            />
            <SchemaField.Boolean
              name="adult"
              title="是否成年"
              x-decorator="FormItem"
              x-component="Switch"
              default="true"
            />
          </SchemaField.Void>
        </SchemaField>
      </FormProvider>
      <DevShowFormilyData form={form} dev />
    </>
  );
};
