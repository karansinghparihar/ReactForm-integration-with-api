import { useEffect, useRef } from 'react'
function UserTable(props) {
    //console.warn('props ',props.data)
    return (
        <div>
            <h1>Table</h1>
            <table border='1'>
                <tr>
                    <td>User ID</td>
                    <td>ID</td>
                    <td>Title</td>
                    <td>Completed</td>
                    <td>Delete User</td>
                    <td>Update User</td>
                </tr>
                { 
                props.data.length>0?
                    props.data.map((item,key) =>
                        <tr key={key}>
                            <td>{item.userId}</td>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{String(item.completed)}</td>
                            <td><button onClick={()=>props.delete(item.id)}>Delete</button></td>
                            <td><button onClick={()=>props.update(item.id)}>Update</button></td>
                        </tr>
                    ):null
                }
            </table>
        </div>
    )
}
export default UserTable;