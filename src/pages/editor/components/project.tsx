import React, { PureComponent } from 'react';
import { Input, Select, Form, Button, Icon } from 'antd';
import translate from '@/utils/translate';
import { AddMoreBtn } from '@/utils/singleComponent';
import { FormComponentProps } from 'antd/lib/form';
import { TProj } from '../form';
import styles from './style.scss';

interface IProps extends FormComponentProps {
  onChange?: (val: any) => any;
}
interface IState {
  list: any[];
  editing: boolean;
}

const FormItem: React.FC<{ label: string }> = ({ label, children }) => (
  <Form.Item label={translate(label)} labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
    {children}
  </Form.Item>
);

const PROJECT_TEMPLATE = {
  name: '',
  link: '',
  stack: [],
  description: [],
};

class ProjectWrapper extends PureComponent<IProps, IState> {
  idx: number = 0;

  constructor(props: any) {
    super(props);

    this.state = {
      editing: false,
      list: [],
    };
  }

  componentDidMount() {
    const {
      form: { getFieldValue },
    } = this.props;
    const educations: TProj[] = getFieldValue('projects') || [];
    this.setState({
      list: educations,
    });
    this.addItem();
  }

  addItem = () => {
    const { list } = this.state;
    const newList = list.concat({
      id: this.idx,
      key: `project-${this.idx}`,
      ...PROJECT_TEMPLATE,
    });
    this.idx += 1;
    this.setState({ list: newList });
    this.saveValue(newList);
  };

  saveValue(vals: any) {
    const { onChange } = this.props;
    this.setState({
      editing: false,
    });
    onChange && onChange(vals);
  }

  handleInput = (val: any, key: string, idx: number) => {
    const { list } = this.state;
    const newList = [...list];
    const data = newList[idx];
    data[key] = val;

    this.setState({
      list: newList,
    });
  };

  renderProject({ name, stack = [], link, description }: TProj, key: number) {
    return (
      <>
        <FormItem label="info.others.projects.name">
          <Input defaultValue={name} onBlur={e => this.handleInput(e.target.value, 'name', key)} />
        </FormItem>
        <FormItem label="info.others.projects.stack">
          <Select
            defaultValue={stack}
            mode="tags"
            tokenSeparators={[',']}
            allowClear
            dropdownStyle={{ display: 'none' }}
            onBlur={e => this.handleInput(e, 'stack', key)}
          />
        </FormItem>
        <FormItem label="info.others.projects.link">
          <Input defaultValue={link} onBlur={e => this.handleInput(e.target.value, 'link', key)} />
        </FormItem>
        <FormItem label="info.others.projects.description">
          <Input.TextArea
            defaultValue={description.join('\n')}
            autosize={{ minRows: 4 }}
            onBlur={e => this.handleInput((e.target.value).split('\n'), 'description', key)}
          />
        </FormItem>
      </>
    );
  }

  render() {
    const { list } = this.state;

    return (
      <div>
        <h2>{translate('info.others.projects')}</h2>
        {list.map((item, idx) => (
          <div className={styles.experienceItem} key={`list-${item.key}`}>
            {this.renderProject(item, idx)}
          </div>
        ))}
        <Form.Item>
          <AddMoreBtn onClick={this.addItem} label="info.others.projects" />
          {this.state.editing && (
            <a onClick={() => this.saveValue(this.state.list)} style={{ marginLeft: 16 }}>
              锁定
            </a>
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ProjectWrapper;
