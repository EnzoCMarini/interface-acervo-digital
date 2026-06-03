import { useState, useEffect, useRef, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import appIcon from "../../assets/app-icon.png";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const avatarImage = "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

    // Fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
            }
        }
        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen]);

    // Fecha o menu ao redimensionar para desktop
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            url: "/"
        },
        ...(isAuthenticated ? [
            {
                label: 'Alunos',
                icon: 'pi pi-star',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/lista/alunos"
            },
            {
                label: 'Livros',
                icon: 'pi pi-star',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/lista/livros"
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-star',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                url: "/lista/emprestimos"
            }
        ] : [])
    ];

    const mobileNavItems = [
        { label: 'Home', icon: 'pi pi-home', url: '/' },
        ...(isAuthenticated ? [
            { label: 'Alunos', icon: 'pi pi-users', url: '/lista/alunos' },
            { label: 'Livros', icon: 'pi pi-book', url: '/lista/livros' },
            { label: 'Empréstimos', icon: 'pi pi-sync', url: '/lista/emprestimos' },
        ] : []),
    ];

    const start = (
        <img
            alt="logo"
            src={appIcon}
            className="h-10 md:h-12 lg:h-14 w-auto ml-2 md:ml-4 lg:ml-6"
        />
    );

    // Ações do usuário — apenas desktop
    const userActions = isAuthenticated ? (
        <div className="hidden md:flex items-center justify-end mr-4 md:mr-6 lg:mr-10 gap-2 md:gap-4">
            <div className="flex flex-col pr-2 md:pr-3">
                <p className="text-white font-semibold m-0 text-sm md:text-base">{nome}</p>
                <p className="text-white text-xs md:text-sm m-0">{email}</p>
            </div>
            <Avatar
                image={avatarImage}
                shape="circle"
                className="!w-8 !h-8 md:!w-10 md:!h-10"
            />
            <button
                className="bg-white ml-2 md:ml-4 text-slate-700 px-3 py-1.5 md:px-5 md:py-2 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
                onClick={AuthRequests.removeToken}
            >
                <i className="pi pi-sign-out"></i>
                <span>Sair</span>
            </button>
        </div>
    ) : (
        <button
            className="hidden md:flex bg-white font-bold text-slate-700 px-3 py-1.5 md:px-5 md:py-2 mr-4 md:mr-6 lg:mr-10 rounded border-none cursor-pointer items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
            onClick={() => navigate('/login')}
        >
            <i className="pi pi-sign-in"></i>
            <span>Login</span>
        </button>
    );

    return (
        <>
            <header className="card bg-slate-700 flex items-center px-2 md:px-4 py-3 min-h-[64px]">

                {/* === DESKTOP: Menubar original === */}
                <div className="hidden md:flex flex-1">
                    <Menubar model={items} start={start} />
                </div>

                {/* === MOBILE: logo + avatar + hambúrguer === */}
                <div className="flex md:hidden flex-1 items-center justify-between px-2">
                    {/* Logo */}
                    <img alt="logo" src={appIcon} className="h-10 w-auto" />

                    {/* Avatar (só se autenticado) + Hambúrguer */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated && (
                            <Avatar
                                image={avatarImage}
                                shape="circle"
                                className="!w-9 !h-9"
                            />
                        )}
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 bg-white hover:bg-gray-100 transition-colors border-none cursor-pointer shadow-sm"
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label="Abrir menu"
                        >
                            <i className={`pi ${mobileMenuOpen ? 'pi-times' : 'pi-bars'} text-lg`}></i>
                        </button>
                    </div>
                </div>

                {/* Ações do usuário — desktop */}
                {userActions}
            </header>

            {/* === DRAWER MOBILE (abre pela direita) === */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 md:hidden"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                >
                    <div
                        ref={mobileMenuRef}
                        className="absolute top-0 right-0 h-full w-64 bg-slate-800 shadow-2xl flex flex-col"
                        style={{ animation: 'slideInRight 0.22s cubic-bezier(0.4,0,0.2,1)' }}
                    >
                        {/* Cabeçalho do drawer */}
                        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-600">
                            <img alt="logo" src={appIcon} className="h-10 w-auto" />
                            <button
                                className="text-white hover:text-slate-300 transition-colors bg-transparent border-none cursor-pointer"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Fechar menu"
                            >
                                <i className="pi pi-times text-lg"></i>
                            </button>
                        </div>

                        {/* Info do usuário */}
                        {isAuthenticated && (
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-600">
                                <Avatar
                                    image={avatarImage}
                                    shape="circle"
                                    className="!w-9 !h-9"
                                />
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold text-sm">{nome}</span>
                                    <span className="text-slate-400 text-xs">{email}</span>
                                </div>
                            </div>
                        )}

                        {/* Links de navegação */}
                        <nav className="flex flex-col flex-1 px-2 py-3 gap-1">
                            {mobileNavItems.map((item) => (
                                <a
                                    key={item.url}
                                    href={item.url}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-slate-600 transition-colors text-base no-underline"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <i className={`${item.icon} text-slate-300`}></i>
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </nav>

                        {/* Sair / Login no rodapé */}
                        <div className="px-4 py-4 border-t border-slate-600">
                            {isAuthenticated ? (
                                <button
                                    className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer text-base px-2 py-2 rounded transition-colors hover:bg-slate-700"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        AuthRequests.removeToken();
                                    }}
                                >
                                    <i className="pi pi-sign-out"></i>
                                    <span>Sair</span>
                                </button>
                            ) : (
                                <button
                                    className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 font-bold px-4 py-2 rounded border-none cursor-pointer hover:bg-gray-100 transition-colors text-sm"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate('/login');
                                    }}
                                >
                                    <i className="pi pi-sign-in"></i>
                                    <span>Login</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to   { transform: translateX(0);    opacity: 1; }
                }
            `}</style>
        </>
    );
}

export default Navegacao;   