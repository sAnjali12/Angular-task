export interface User {
  isSelected: boolean;
  id: number;
  name: string;
  job: string;
  isEdit: boolean;
}

export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'name',
    type: 'text',
    label: 'First Name',
    required: false,
  },
 
  {
    key: 'job',
    type: 'text',
    label: 'JOb',
    required: false,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
