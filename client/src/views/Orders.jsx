import Header from '../components/Header.jsx'
import { useLocation } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import '../style/Orders.css'

export default function Orders() {

    const SERVER_URL = 'http://localhost:8081';
    const location = useLocation();

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='ordersMainDiv'>
                <Tabs id='ordersTab' default='0'>
                    <TabList>
                        <Tab>Sticks</Tab>
                        <Tab>Ruedas</Tab>
                    </TabList>
                    <TabPanel className='playerOrdersTab' id='stickOrdersTab'>

                    </TabPanel>
                    <TabPanel className='playerOrdersTab' id='wheelOrdersTab'>
                        <input type="text" placeholder='Nº tfno.' />
                        <select name='wheelModels' id='wheelModels'>
                            <option value=""></option>
                        </select>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}