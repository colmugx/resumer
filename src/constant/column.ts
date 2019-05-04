export const profile: {
  name: string;
  component: 'input' | 'phone' | 'tags' | 'github';
  rules?: any[];
}[] = [
  {
    name: 'name',
    component: 'input',
    rules: [
      {
        required: true,
        message: 'Please input your E-mail!',
      },
    ],
  },
  {
    name: 'job',
    component: 'input',
    rules: [
      {
        required: true,
        message: 'Please input your E-mail!',
      },
    ],
  },
  {
    name: 'phone',
    component: 'phone',
    rules: [
      {
        required: true,
        message: 'Please input your E-mail!',
      },
    ],
  },
  {
    name: 'base',
    component: 'input',
  },
  {
    name: 'local',
    component: 'input',
  },
  {
    name: 'email',
    component: 'input',
    rules: [
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
    ],
  },
  {
    name: 'qq',
    component: 'input',
  },
  {
    name: 'homepage',
    component: 'input',
  },
  {
    name: 'github',
    component: 'github',
  },
  {
    name: 'tags',
    component: 'tags',
  },
];
