import Layout from "../components/Layout.jsx";

export default function NoPage() {
    const header = <h1>Oops the page is not found!</h1>
    return (
        <Layout header={header}>
            <img src="/images/404.gif" alt="404" style={{    maxWidth: '500px', width: '70%'}}/>
        </Layout>
    )
}
