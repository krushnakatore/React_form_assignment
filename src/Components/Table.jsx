export const Table = ({
  name,
  age,
  address,
  salary,
  status,
  department,
  handleDelete,
  id,
  
}) => {
  // console.log("id", profile_pic);
  status = status ? "Yes" : "No";
  return (
    <>
      <td>{name}</td>
      <td>{age}</td>
      <td>{address}</td>
      <td>{salary}</td>
      <td>{status}</td>
      <td>{department}</td> 
      <button style ={{
        width:`70px`,
        height:`30px`,
        // backgroundColor:`black`
      }}onClick={() => handleDelete(id)}>Delete</button>
    </>
  );
};
