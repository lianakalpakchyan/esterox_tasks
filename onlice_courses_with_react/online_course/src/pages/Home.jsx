import Layout from "../components/Layout.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

export default function Home() {
    const header = (
        <>
            <h1>Level Up Your Skills!</h1>
            <p className="lead">Choose from a variety of courses designed for the next generation.</p>
        </>
    )
    return (
        <Layout header={header}>
            <RegisterForm />
        </Layout>
    )
}
