export default function Header(props) {
    const { header } = props;
    return (
        <header className="text-center py-5">
            { header }
        </header>
    )
}