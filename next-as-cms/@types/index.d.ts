type TabItem = {
  key: string;
  title: string;
  path: string;
  content?: ReactNode;
  closable?: boolean;
};

type QueryFieldType = "input" | "select" | "checkbox"; // TODO 扩展 checkbox

// 查询结果中的分页信息
interface PaginationData {
  page: number;
  pageSize: number;
  total: number;
}

// 查询 form 字段
interface QueryFormFiled {
  label: string;
  name: string;
  type: QueryFieldType;
  selectOption?: { label: string; value: string }[];
  selectDefaultSelected?: string;
}

// 查询结果
interface QueryResult<T> {
  list: T[];
  pagination: PaginationData;
}

// 查询 form 属性， 泛型指的是查询结果返回的数据类型
interface QueryFormProps<T> {
  id: string;
  queryFields: QueryFormFiled[];
  onQuery?: (formData: any) => boolean;
}

// data grid 属性，
interface DataGridProps<T> {
  id: string;
  showTitle?: boolean;
  title: string;
  showToolbar?: boolean;
  showAdd?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  showDel?: boolean;
  showExport?: boolean;
  extendBtns?: ReactElement; // TODO 自行封装 toolbar，可使用json 来配置，与 extendOperate 保持统一。
  showOperateColumn?: boolean;
  showOperateEdit?: boolean;
  showOperateView?: boolean;
  showOperateDel?: boolean;
  extendOperate?: ReactElement;
  extendOperateClick?: (key: string, row: T) => void;
  // antd table 的属性
  rowKey?: string;
  columns: ColumnsType<T>[]; // 表格列
  list: object[]; // 数据list
  pagination?: {}; //分页信息
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void; // 选中项发生变化事件
  onSelect?: (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void; // 选中/取消某一行
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void; // 选择/取消选择所有行
  onAddClick?: () => boolean;
  onEditClick?: (id: React.Key, record: T) => boolean;
  onViewClick?: (id: React.Key, record: T) => boolean;
  onDelClick?: (ids: React.Key[], records: T[]) => boolean;
}

type EditFieldType =
  | "input"
  | "select"
  | "checkbox"
  | "switch"
  | "number"
  | "date"
  | "time"
  | "radio"
  | "upload"
  | "custom";

// 请求结果
interface RequestResult<T> {
  success: boolean;
  code: number;
  msg: string;
  data: T;
}

interface DialogElement {
  setFormData: Function; // 设置表单数据
  getFormData: Function; // 获取编辑表单数据
  getForm: Function; // 获取编辑表单 Form 对象
  open: Function;
  close: Function;
}

interface CrudDataGridElement {
  getEditFormData: Function; // 获取编辑表单数据
  getEditForm: Function; // 获取编辑表单 Form 对象
}

// 编辑 form 字段
interface EditFormFiled {
  label: string;
  name: string;
  type: string;
  formItemOption?: any; // Form.Item 以及 col 相关配置
  // TODO 针对不同的组件，需要支持各自的配置, 配置项参照 antd 的组件配置。
  inputOption?: any;
  inputNumberOption?: any;
  selectOption?: any;
  textareaOption?: any;
  checkboxGroupOption?: any;
  checkboxOption?: any;
  switchOption?: any;
  numberOption?: any;
  dateOption?: any;
  timeOption?: any; // 时分秒
  radioOption?: any;
  radioGroupOption?: any;
  uploadOption?: any; // TODO 待完善
  customOption?: any;
  customElement?: ReactElement;
}

// 编辑框属性
interface EditDialogProps<T> {
  id: string;
  width?: string;
  height?: string;
  title: string;
  initData: T;
  editFields: EditFormFiled[];
  okText?: string;
  cancelText?: string;
  extendBtns?: ReactElement;
  onSubmit?: (data: T) => boolean; // 用于扩展提交之前的操作，return false 终止提交
  onSetFormData?: (form: FormInstance, data: T) => void; // 用于扩展设置参数到表单之后的操作
}

// crud 表格 属性
interface CrudDataGridProps<T> {
  pageQuery: MutationFunction;
  getById: MutationFunction;
  delById: MutationFunction;
  submit: MutationFunction;
  delTips?: Function; // 删除数据的提示文本
  queryFormProps: QueryFormProps<T>;
  dataGridProps: DataGridProps<T>;
  editDialogProps: EditDialogProps;
}
