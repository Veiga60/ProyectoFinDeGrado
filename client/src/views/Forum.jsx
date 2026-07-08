import Header from '../components/Header.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import '../style/Forum.css'

export default function Forum() {

    const location = useLocation();
    const navigate = useNavigate();

    const categories = ['LIGA PLATA', 'ENTRENAMIENTOS', 'TRASLADO A PARTIDOS', 'CAMPEONATO DE ESPAÑA', 'TEMAS COMUNES'];

    return (
        <>
            <Header />
            <div id='forumMainDiv'>
                {
                    categories.map((category, index) => (
                        <div key={index} className='categoryDiv' onClick={() => navigate(`/forum/categories/${category.replace(' ', '_').toLowerCase()}`)}>
                            <p className='categoryText'>{category}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}