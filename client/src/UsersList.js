import Username from './Username';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux'

export const UsersList = (props) => {
    
    const ws = props.ws;
    const users = useSelector(state => state.users)

    return (
    <Container fluid className="w-20" style={{display: 'flex', flexFlow: 'column'}}>
        Users:
        {
            users.map(user => (
                <Username username={user.username}/>
            ))
        }
    </Container>
    );
}

export default UsersList;