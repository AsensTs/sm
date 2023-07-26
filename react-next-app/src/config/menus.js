import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const menus = [
    {
        key: "/navigation1",
        label: "导航1",
        icon: <MailOutlined />,
        children: [
            { key: "/option1", label: "option1", children: [{key: "/sub1", label: "sub1"}] },
            { key: "/option2", label: "option2" },
            { key: "/option3", label: "option3" },
        ]
    },
    {
        key: "/navigation2",
        label: "导航2",
        icon: <AppstoreOutlined />,
        children: [
            { key: "/option4", label: "option4" },
            { key: "/option5", label: "option5" },
            { key: "/option6", label: "option6" },
        ]
    },
    {
        key: "/navigation3",
        label: "导航3",
        icon: <SettingOutlined />,
        children: [
            { key: "/option7", label: "option7" },
            { key: "/option8", label: "option8" },
            { key: "/option9", label: "option9" },
        ]
    }
]

export default menus;