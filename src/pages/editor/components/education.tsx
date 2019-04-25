import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Input, Select, Form, Button, Icon } from 'antd';
import translate from '@/utils/translate';
import { FormComponentProps } from 'antd/lib/form';
import { TEdu, TDegree } from '../form';

import styles from './education.scss';

interface IProps extends FormComponentProps {
  onChange?: (val: any) => any;
}
interface IState {
  list: any[];
  editing: boolean;
}

type TDegreeItem = 'interval' | 'level' | 'major';

const TEMPLATE = {
  school: '电子科技大学',
  degrees: [
    {
      level: '本科',
      major: '',
      interval: '',
    },
  ],
};

const levelList = ['-', '大专', '本科/学士', '研究生', '硕士', '博士'];

class EducationWrapper extends PureComponent<IProps, IState> {
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
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    getFieldDecorator('educations', { initialValue: [] });
    const educations: TEdu[] = getFieldValue('educations') || [];
    this.setState({
      list: educations,
    });
  }

  addSchool = () => {
    const { list } = this.state;
    const newList = list.concat({
      id: this.idx,
      key: `school-${this.idx}`,
      ...TEMPLATE,
    });
    this.idx += 1;
    this.setState({ list: newList });
    this.saveValue(newList);
  };

  remove = (k: number) => {
    const { list } = this.state;
    if (list.length === 1) {
      return;
    }

    const newList = list.filter(({ id }: { id: number }) => id !== k);
    this.setState({
      list: newList,
    });
    this.saveValue(newList);
  };

  handleSchoolInput = (e: any, key: string, idx: number) => {
    const { list } = this.state;
    const newList = [...list];
    const data = newList[idx];
    data[key] = e.target.value;

    this.setState({
      list: newList,
    });
  };

  handleDegreeInput = (val: any, key: string, idx: number, didx: number) => {
    this.setState({ editing: true });
    const { list } = this.state;
    const newList = [...list];
    const data = newList[idx]['degrees'];
    data[didx][key] = val;

    this.setState({
      list: newList,
    });
  };

  saveValue = (vals: any) => {
    const { onChange } = this.props;
    this.setState({
      editing: false,
    });
    onChange && onChange(vals);
  };

  fieldList = (vals: TDegree, key: TDegreeItem, idx: number, didx: number) => ({
    interval: (
      <Input
        defaultValue={vals[key]}
        onBlur={e => this.handleDegreeInput(e.target.value, key, idx, didx)}
      />
    ),
    major: (
      <Input
        defaultValue={vals[key]}
        onBlur={e => this.handleDegreeInput(e.target.value, key, idx, didx)}
      />
    ),
    level: (
      <Select
        defaultValue={vals[key]}
        onChange={val => this.handleDegreeInput(val, key, idx, didx)}
      >
        {levelList.map(item => (
          <Select.Option key={`level-item-${item}`} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    ),
  });

  renderSchoolItem(school: string, degrees: any[], key: number) {
    return (
      <>
        <div className={styles.left}>
          <Form.Item label={translate('info.others.educations.school')} labelCol={{ span: 2 }}>
            <Input defaultValue={school} onBlur={e => this.handleSchoolInput(e, 'school', key)} />
          </Form.Item>
          {degrees.map((items, idx) => (
            <Fragment key={`degree-${idx}`}>{this.renderDegreeItem(items, key, idx)}</Fragment>
          ))}
        </div>
        <div className={styles.right}>
          <a onClick={() => this.remove(key)}>
            <Icon type="close" style={{ color: '#f5222d' }} />
          </a>
        </div>
      </>
    );
  }

  renderDegreeItem(list: TDegree, idx: number, didx: number) {
    return (
      <Row>
        {Object.keys(list).map((key, kidx) => (
          <Col key={`degree-${key}-${kidx}`} span={8}>
            <Form.Item
              label={translate(`info.others.educations.${key}`)}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {this.fieldList(list, key as TDegreeItem, idx, didx)[key as TDegreeItem]}
            </Form.Item>
          </Col>
        ))}
      </Row>
    );
  }

  render() {
    const { list } = this.state;

    return (
      <div className={styles.education}>
        <h2>{translate('info.others.educations')}</h2>
        {list.map(({ school, degrees, key }, idx) => (
          <div key={`list-${key}`} className={styles.schoolItem}>
            {this.renderSchoolItem(school, degrees, idx)}
          </div>
        ))}
        <Form.Item>
          <Button type="dashed" onClick={this.addSchool} style={{ width: '60%' }}>
            <Icon type="plus" />
            添加教育经历
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

export default EducationWrapper;
