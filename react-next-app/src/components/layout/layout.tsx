import Layout from "./index";

const isLayout = (path: String, hideLayoutPath: String[], component: any) => {
    if (hideLayoutPath.indexOf(path) == -1) {
        return (
            <Layout>
                {component}
            </Layout>
        )
    }

    return component;
}

export default isLayout