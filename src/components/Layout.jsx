import Header from "./Header";

const Layout = ({children}) => {
    return (
        <div className="h-screen">
            <Header/>
            <main className="flex-1 p-2">
                {children}
            </main>
        </div>
    );
};

export default Layout;
