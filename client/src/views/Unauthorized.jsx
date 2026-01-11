import Header from '../components/Header.jsx'
import '../style/Unauthorized.css'

export default function Unauthorized() {
    return (
        <>
            <Header />
            <div id="unauthorizedDiv">
                <p id="unauthorizedText">USUARIO NO AUTORIZADO</p>
            </div>
        </>
    )
}