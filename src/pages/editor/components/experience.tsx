import React, { PureComponent } from 'react';
import { Input, Select, Form, Button, Icon } from 'antd';
import translate from '@/utils/translate';
import { FormComponentProps } from 'antd/lib/form';
import { TExp, TDesc } from '../form';
import styles from './style.scss';

interface IProps extends FormComponentProps {
  onChange?: (val: any) => any;
}
interface IState {
  list: any[];
  editing: boolean;
}

const FormItem: React.FC<{ label: string; col?: number }> = ({ label, col, children }) => (
  <Form.Item label={translate(label)} labelCol={{ span: col || 4 }} wrapperCol={{ span: 16 }}>
    {children}
  </Form.Item>
);

const DESCRIPTION_TEMPLATE = {
  name: '',
  summary: [],
};

const EXPERIENCE_TEMPLATE = {
  name: '阿里巴巴集团',
  tags: [],
  time: '',
  position: '前端工程师',
  description: [{ ...DESCRIPTION_TEMPLATE }],
};

class ExperienceWrapper extends PureComponent<IProps, IState> {
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
    const educations: TExp[] = getFieldValue('experiences') || [];
    this.setState({
      list: educations,
    });
    this.addItem();
  }

  addItem = () => {
    const { list } = this.state;
    const newList = list.concat({
      id: this.idx,
      key: `company-${this.idx}`,
      ...EXPERIENCE_TEMPLATE,
    });
    this.idx += 1;
    this.setState({ list: newList });
    this.saveValue(newList);
  };

  addDesc = (key: number) => {
    const { list } = this.state;
    const newList = [...list];
    const data = newList[key]['description'].concat([{ ...DESCRIPTION_TEMPLATE }]);
    newList[key]['description'] = data;
    this.setState({ list: newList });
    this.saveValue(newList);
  };

  removeDesc = (key: number, idx: number) => {
    const { list } = this.state;
    const newList = [...list];
    let data = newList[key]['description'];
    if (data.length === 1) {
      return;
    }
    data = data.filter((_: undefined, id: number) => id !== idx);
    newList[key]['description'] = data;
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

  handleDescInput = (val: any, key: string, idx: number, didx: number) => {
    this.setState({ editing: true });
    const { list } = this.state;
    const newList = [...list];
    const degrees = newList[idx]['description'];
    degrees[didx][key] = val;
    this.setState({
      list: newList,
    });
  };

  renderExperience(
    { name, tags = [], time, position, description: descriptions }: TExp,
    key: number,
  ) {
    return (
      <>
        <FormItem label="info.others.experiences.name" col={2}>
          <Input defaultValue={name} onBlur={e => this.handleInput(e.target.value, 'name', key)} />
        </FormItem>
        <FormItem label="info.others.experiences.tags" col={2}>
          <Select
            defaultValue={tags}
            mode="tags"
            tokenSeparators={[',']}
            allowClear
            dropdownStyle={{ display: 'none' }}
            onBlur={e => this.handleInput(e, 'tags', key)}
          />
        </FormItem>
        <FormItem label="info.others.experiences.time" col={2}>
          <Input defaultValue={time} onBlur={e => this.handleInput(e.target.value, 'time', key)} />
        </FormItem>
        <FormItem label="info.others.experiences.position" col={2}>
          <Input
            defaultValue={position}
            onBlur={e => this.handleInput(e.target.value, 'position', key)}
          />
        </FormItem>
        {descriptions.map((item, idx) => (
          <div className={styles.descriptionItem} key={`description-${idx}`}>
            <div className={styles.opreate}>
              <a onClick={() => this.addDesc(key)}>
                <Icon type="plus" />
              </a>
              {idx !== 0 && (
                <a onClick={() => this.removeDesc(key, idx)}>
                  <Icon type="close" />
                </a>
              )}
            </div>
            <div>{this.renderDescription(item, key, idx)}</div>
          </div>
        ))}
      </>
    );
  }

  renderDescription({ name, summary }: TDesc, key: number, idx: number) {
    return (
      <>
        <FormItem label="info.others.experiences.desc.name">
          <Input
            defaultValue={name}
            onBlur={e => this.handleDescInput(e.target.value, 'name', key, idx)}
          />
        </FormItem>
        <FormItem label="info.others.experiences.desc.summary">
          <Input.TextArea
            defaultValue={summary.join('\n')}
            autosize={{ minRows: 4 }}
            onBlur={e => this.handleDescInput((e.target.value).split('\n'), 'summary', key, idx)}
          />
        </FormItem>
      </>
    );
  }

  render() {
    const { list } = this.state;

    return (
      <div>
        <h2>{translate('info.others.experiences')}</h2>
        {list.map((item, idx) => (
          <div className={styles.experienceItem} key={`list-${item.key}`}>
            {this.renderExperience(item, idx)}
          </div>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={this.addItem} style={{ width: '60%' }}>
            <Icon type="plus" />
            {translate('common.add')}
            {translate('info.others.experiences')}
          </Button>
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

export default ExperienceWrapper;
