import { easyCreateSchemaField } from '@byted/easy-formily';
import {
  Card,
  FormItem,
  FormLayout,
  Input,
  InputNumber,
  Select,
  Switch,
} from '@formily/semi';

export const SchemaField = easyCreateSchemaField({
  components: {
    // 输入组件
    Input,
    InputNumber,
    Select,
    Switch,

    // 样式组件
    FormItem,
    Card,
    FormLayout,
  },
});
