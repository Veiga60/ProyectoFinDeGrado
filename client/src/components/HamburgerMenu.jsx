import '../style/HamburgerMenu.css'

export default function HamburgerMenu({ id }) {
    return (
        <>
            <div id='hamburgerMenuDiv'>
                <div id='menuHomeDiv' className='menuDiv'>
                    <p id='menuHomeText' className='menuText'>INICIO</p>
                </div>
                <div id='menuMatchesDiv' className='menuDiv'>
                    <p id='menuMatchesText' className='menuText'>PARTIDOS</p>
                </div>
                <div id='menuStatsDiv' className='menuDiv'>
                    <p id='menuStatsText' className='menuText'>ESTADÍSTICAS</p>
                </div>
                <div id='menuCallsDiv' className='menuDiv'>
                    <p id='menuCallsText' className='menuText'>CONVOCATORIAS</p>
                </div>
                <div id='menuForumDiv' className='menuDiv'>
                    <p id='menuForumText' className='menuText'>FORO</p>
                </div>
                <div id='menuOrdersDiv' className='menuDiv'>
                    <p id='menuOrdersText' className='menuText'>PEDIDOS</p>
                </div>
                <div id='menuLogoutDiv' className='menuDiv'>
                    <p id='menuLogoutText' className='menuText'>CERRAR SESIÓN</p>
                </div>
            </div>
        </>
    )
}