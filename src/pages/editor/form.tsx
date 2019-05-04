import React, { FormEvent, useState } from 'react';
import { Form, Button, Input, Select, AutoComplete, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import EducationWrapper from './components/education';
import ExperienceWrapper from './components/experience';
import ProjectWrapper from './components/project';
import { profile as profileList } from '@/constant/column';
import translate from '@/utils/translate';

export type TDegree = {
  major: string;
  interval: string;
  level: string;
};
export type TEdu = {
  school: string;
  degrees: TDegree[];
};
export type TSkill = {
  name: string;
  description: string[];
};
export type TDesc = {
  name: string;
  summary: string[];
};
export type TExp = {
  name: string;
  tags: string[];
  time: string;
  position: string;
  description: TDesc[];
};
export type TProj = {
  name: string;
  link: string;
  stack: string[];
  description: string[];
};

interface IProps extends FormComponentProps {
  onValue: (value: any) => void;
  initValue?: any;
}

const EditorForm: React.FC<IProps> = ({ onValue, initValue, form }) => {
  const { getFieldDecorator, validateFields } = form;
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
      onValue(val);
    } catch (err) {
      console.error(err);
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
          initialValue: initValue.profile[name] || undefined,
        })(FieldList[component]())}
        {col === 24 ? <span style={{ fontSize: 12, color: '#999' }}>用 "," 隔开</span> : null}
      </Form.Item>
    </Col>
  );

  const renderProfile = () => (
    <div>
      <h2>基础信息</h2>
      <Row>
        {profileList.map((col, idx, list) =>
          renderInput(col as any, list.length - 1 === idx ? 24 : undefined),
        )}
      </Row>
    </div>
  );

  const renderPersonal = () => (
    <div>
      <h2>其他信息</h2>
      {getFieldDecorator('personal')(<Input.TextArea autosize={{ minRows: 4 }} />)}
    </div>
  );

  return (
    <Form
      labelAlign="right"
      colon={false}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onSubmit={handleSubmit}
    >
      {renderProfile()}
      {getFieldDecorator('educations')(<EducationWrapper form={form} />)}
      {getFieldDecorator('experiences')(<ExperienceWrapper form={form} />)}
      {getFieldDecorator('projects')(<ProjectWrapper form={form} />)}
      {renderPersonal()}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {translate('common.form.submit')}
        </Button>
        <Button type="default" htmlType="reset">
          {translate('common.form.reset')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(EditorForm);
