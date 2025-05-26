import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";

export default function Layout(props) {
    const { header, children } = props

    return (
        <>
            <div className="overlay"></div>
            <div className="content d-flex flex-column" style={{minHeight: '100vh'}}>
                <Nav />
                <Header header={header} />
                <main className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
                    {children}
                </main>
                <Footer/>
            </div>
        </>
    )
}
