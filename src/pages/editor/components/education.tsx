import React, { PureComponent } from 'react';
import { Row, Col, Input, Select, Form, Button, Icon } from 'antd';
import translate from '@/utils/translate';
import { FormComponentProps } from 'antd/lib/form';
import { TEdu, TDegree } from '../form';

import styles from './style.scss';
import { AddMoreBtn } from '@/utils/singleComponent';

interface IProps extends FormComponentProps {
  onChange?: (val: any) => any;
}
interface IState {
  list: any[];
  editing: boolean;
}

type TDegreeItem = 'interval' | 'level' | 'major';

const DEGREE_TEMPLATE = {
  level: '-',
  major: '',
  interval: '',
};

const SCHOOL_TEMPLATE = {
  school: '电子科技大学',
};

const levelList = ['-', '大专', '本科/学士', '研究生', '硕士', '博士'];

class EducationWrapper extends PureComponent<IProps, IState> {
  idx: number = 0;
  didx: number = 0;

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
    const educations: TEdu[] = getFieldValue('educations') || [];
    this.setState({
      list: educations,
    });
    this.addSchool();
  }

  addSchool = () => {
    const { list } = this.state;
    const newList = list.concat({
      id: this.idx,
      key: `school-${this.idx}`,
      ...SCHOOL_TEMPLATE,
      degrees: [{
        key: `degree-${this.didx}`,
        ...DEGREE_TEMPLATE
      }]
    });
    this.idx += 1;
    this.didx += 1;
    this.setState({ list: newList });
    this.saveValue(newList);
  };

  addDegree = (key: number) => {
    const { list } = this.state;
    const newList = [...list];
    const data = newList[key]['degrees'].concat([{ ...DEGREE_TEMPLATE }]);
    newList[key]['degrees'] = data;
    this.setState({ list: newList });
    this.saveValue(newList);
  };

  removeDegree = (key: number, k: string) => {
    const { list } = this.state;
    const newList = [...list];
    let data = newList[key]['degrees'];
    if (data.length === 1) {
      return;
    }
    data = data.filter(({ key: sk}: {key: string}) => sk !== k);
    newList[key]['degrees'] = data;
    this.setState({ list: newList });
    this.saveValue(newList);
  };

  removeSchool = (k: number) => {
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

  handleSchoolInput = (e: any, idx: number) => {
    const { list } = this.state;
    const newList = [...list];
    const data = newList[idx];
    data.school = e.target.value;

    this.setState({
      list: newList,
    });
  };

  handleDegreeInput = (val: any, key: string, idx: number, didx: number) => {
    this.setState({ editing: true });
    const { list } = this.state;
    const newList = [...list];
    const degrees = newList[idx]['degrees'];
    degrees[didx][key] = val;
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

  fieldList = (dfVal: string, idx: number, didx: number) => ({
    interval: (
      <Input
        defaultValue={dfVal}
        onBlur={e => this.handleDegreeInput(e.target.value, 'interval', idx, didx)}
      />
    ),
    major: (
      <Input
        defaultValue={dfVal}
        onBlur={e => this.handleDegreeInput(e.target.value, 'major', idx, didx)}
      />
    ),
    level: (
      <Select
        defaultValue={dfVal}
        onChange={val => this.handleDegreeInput(val, 'level', idx, didx)}
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
            <Input defaultValue={school} onBlur={e => this.handleSchoolInput(e, key)} />
          </Form.Item>
          {degrees.map((items, idx) => (
            <div key={`degree-${idx}`} className={styles.degreeItem}>
              <div className={styles.opreate}>
                <a onClick={() => this.addDegree(key)} >
                  <Icon type="plus" />
                </a>
                {idx !== 0 && (
                  <a onClick={() => this.removeDegree(key, items.key)} >
                    <Icon type="close" />
                  </a>
                )}
              </div>
              <div>{this.renderDegreeItem(items, key, idx)}</div>
            </div>
          ))}
        </div>
        <div className={styles.right}>
          {key !== 0 && (
            <a onClick={() => this.removeSchool(key)}>
              <Icon type="close" style={{ color: '#f5222d' }} />
            </a>
          )}
        </div>
      </>
    );
  }

  renderDegreeItem(list: TDegree, idx: number, didx: number) {
    return (
      <Row>
        {Object.keys(list).map((key, kidx) => key !== 'key' && (
          <Col key={`degree-${key}-${kidx}`} span={8}>
            <Form.Item
              label={translate(`info.others.educations.${key}`)}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {this.fieldList(list[key as TDegreeItem], idx, didx)[key as TDegreeItem]}
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
          <AddMoreBtn onClick={this.addSchool} label="info.others.educations" />
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
