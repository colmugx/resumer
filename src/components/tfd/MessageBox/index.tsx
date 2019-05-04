import React from 'react';
import styles from './index.scss';
import { TEdu, TSkill, TExp, TProj } from '@/pages/editor/form';

interface IProps {
  type: string;
  data: any;
}

const nmlMsgBox = (msgList: string[]) => (
  <ul className={styles.normal}>
    {msgList.map(msg => (
      <li key={`nmsg-${msg}`}>{msg}</li>
    ))}
  </ul>
);

const eduMsgBox = (msgList: TEdu[]) => (
  <div className={styles.edu}>
    {msgList.map(({ school, degrees }) => (
      <div key={`emsg-${school}`} className={styles.eduItem}>
        <header>
          <h4>{school}</h4>
        </header>
        <ul className={styles.degreeList}>
          {degrees.map(({ interval, level, major }, idx) => (
            <li key={`degree-${idx}`} className={styles.degreeItem}>
              <time className="time">{interval}</time>
              <span className="major">{major}</span>
              <span className="degree">{level}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const sklMsgBox = (msgList: TSkill[]) => (
  <div className={styles.skill}>
    {msgList.map(({ name, description }) => (
      <div key={`smsg-${name}`} className={styles.skillItem}>
        {name && (
          <header>
            <h4>{name}</h4>
          </header>
        )}
        <ul className={styles.skillList}>
          {description.map(skill => (
            <li key={`skill-${skill}`}>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const expMsgBox = (msgList: TExp[]) => (
  <div className={styles.experience}>
    {msgList.map(({ name, position, tags, time, description }) => (
      <div key={`smsg-${name}`} className={styles.experienceItem}>
        <header className={styles.header}>
          <div className="title">
            <h4>{name}</h4>
            <time>{time}</time>
            <span>{position}</span>
          </div>
          {tags && !!tags.length && (
            <ul className="tag-list">
              {tags.map(tag => (
                <li key={`tag-${name}-${tag}`} className="tag-item">
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          )}
        </header>
        <div className="description">
          {description.map(({ name: pname, summary: summarys }) =>
            pname ? (
              <div key={`desc-${pname}`} className="project">
                <h5>{pname}</h5>
                {summarys && (
                  <ul>
                    {summarys.map((summary, idx) => (
                      <li key={`sum-${idx}`}>
                        <span>{summary}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div>未能工作详细描述</div>
            ),
          )}
        </div>
      </div>
    ))}
  </div>
);

const prjMsgBox = (msgList: TProj[]) => (
  <div className={styles.project}>
    {msgList.map(({ name, stack, link, description }) => (
      <div key={`smsg-${name}`} className={styles.projectItem}>
        <header className={styles.header}>
          <div className="title">
            <h4>{name}</h4>
            {link && <a href={link}>{link}</a>}
            <ul className="tag-list">
              {stack.map(tag => (
                <li key={`tag-${name}-${tag}`} className="tag-item">
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>
        <ul className={styles.projectList}>
          {description.map(desc => (
            <li key={`project-desc-${desc}`}>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const MessageBox: React.FC<IProps> = ({ type, data = [] }) => {
  let document;
  switch (type) {
    case 'educations':
      document = eduMsgBox(data);
      break;
    case 'personal':
      document = nmlMsgBox(data);
      break;
    case 'skills':
      document = sklMsgBox(data);
      break;
    case 'experiences':
      document = expMsgBox(data);
      break;
    case 'projects':
      document = prjMsgBox(data);
      break;
    default:
      document = <span />;
      break;
  }
  return <div className={styles.messagebox}>{document}</div>;
};

export default MessageBox;
