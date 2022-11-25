import {FaTrash} from 'react-icons/fa';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ClientRow({client}) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id },
        // refetchQueries: [{ query: GET_CLIENTS}],
        update(cache, { data: { deleteClient}}){
            const { clients } = cache.readQuery({ query: GET_CLIENTS});
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter(client => client.id
                    !== deleteClient.id) },
            });
        }
    });//Gets query from the cache instead of creating a whole new request.
    
    return (
        <tr>
          <td>{client.name}</td>
          <td>{client.email}</td>
          <td>{client.phone}</td>
          <td>
            <button className='btn btn-danger btn-sm' onClick={deleteClient}>
              <FaTrash />
            </button>
          </td>
        </tr>
      );
    }
    