import React, { useContext, useState} from "react";
import Protected from "../../Routes/Protected";
import { AuthContext, UserContext } from "../../Context";
import { Layout, Task, Today, Completed, Important } from "../../Components";
const Dashboard = () => {
    const {isLoggedIn, handleLogout } = useContext(AuthContext);
    const {user, tasks } = useContext(UserContext);
    const [tab, setTab] = useState(0);
    const [title, setTitle] = useState('Today');

    const todayTab = () => {
        setTab(0);
        setTitle('Today'); 
    }
    const importantTab = () => {
        setTab(1); 
        setTitle('Important'); 
    }
    const completedTab = () => {
        setTab(2); 
        setTitle('Completed'); 
    }
    const uncompletedTab = () => {
        setTab(3); 
        setTitle('Uncompleted'); 
    }
    const allTab = () => {
        setTab(4); 
        setTitle('All'); 
    }
    const categoriesTab = () => {
        setTab(5); 
        setTitle('Categories'); 
    }

    return(
        <Protected isLoggedIn={isLoggedIn}>
            <Layout 
            activeTab={tab}
            title={title}
            today={todayTab}
            important={importantTab}
            completed={completedTab}
            uncompleted={uncompletedTab}
            all={allTab}
            categories={categoriesTab}>
                {tab === 0 ?
                <Today>
                    <Task.List>
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                    </Task.List>
                </Today>
                : null}
                {tab === 1 ?
                <Important>
                    <Task.List>
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                    </Task.List>
                </Important>
                : null}
                {tab === 2 ?
                <Completed>
                    <Task.List>
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                        <Task.Item />
                    </Task.List>
                </Completed>
                : null}
            </Layout>
        </Protected>
    )
}

export default Dashboard;