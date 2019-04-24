import React, { FormEvent, useState } from 'react';
import { Form, Button, Input, Select, AutoComplete, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { profile as profileList } from '@/constant/column';
import translate from '@/utils/translate';

interface IProps extends FormComponentProps {
  onValue: (value: any) => void;
}

const EditorForm: React.FC<IProps> = ({ onValue, form: { getFieldDecorator, validateFields } }) => {
  const FieldList = {
    input: (...rest: any[]) => <Input {...rest} />,
    phone: (...rest: any[]) => <Input {...rest} />,
    tags: (...rest: any[]) => {
      return (
        <Select
          mode="tags"
          tokenSeparators={[',']}
          allowClear
          dropdownStyle={{ display: 'none' }}
          {...rest}
        />
      );
    },
    github: (...rest: any[]) => {
      const [list, setList] = useState([] as string[]);
      const regs: [RegExp, string][] = [
        [/^http(s?):\/{2}/, 'https://'],
        [/(github)\.(com)/, 'github.com/'],
      ];
      const url = (val: string) => regs.map(items => (items[0].test(val) ? '' : items[1])).join('');
      const handleSearch = (val: string) => setList(!val ? [] : [`${url(val)}${val}`]);
      return <AutoComplete dataSource={list} onSearch={handleSearch} {...rest} />;
    },
  };
  const validate = () =>
    new Promise((resolve, reject) => {
      validateFields((err, values) => {
        if (err) {
          reject(err);
        }
        resolve(values);
      });
    });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const val = await validate();
      console.log(val);
      onValue(val);
    } catch (err) {
      console.log(err);
    }
  };

  const renderInput = (
    {
      name,
      component,
      rules,
    }: { name: string; component: 'input' | 'tags' | 'phone' | 'github'; rules: any[] },
    col?: number,
    ...rest: any[]
  ) => (
    <Col key={name} span={col || 8}>
      <Form.Item label={translate(`info.profile.${name}`)} labelCol={{ span: col === 24 ? 2 : 6 }}>
        {getFieldDecorator(name, {
          rules: rules || [],
        })(FieldList[component]())}
      </Form.Item>
    </Col>
  );
  return (
    <Form
      labelAlign="right"
      colon={false}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
      }}
    >
      <Row>
        {profileList.map((col, idx, list) =>
          renderInput(col as any, list.length - 1 === idx ? 24 : undefined),
        )}
      </Row>
      <Form.Item style={{ width: '200px' }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(EditorForm);
